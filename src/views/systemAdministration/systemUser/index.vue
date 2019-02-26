<template>
  <div class="app-container">
    <base-table
      :filterData="filterData"
      url="http://192.168.0.98:3000/system/getUser"
      ref="table"
      filterType="block">
      <div slot="filter-left">
        <el-button type="primary" @click="AddUserDialog">添加用户</el-button>
        <el-button type="default" @click="ImportFile">
          导入用户
          <input hidden type="file" ref="importFile">
        </el-button>
        <el-button @click="ExportFile">导出用户</el-button>
      </div>
      <template slot="filter-center" slot-scope="user">
        <div>
          <filter-item
            v-for="(item, index) in user.data" :key="index"
            :index="index"
            :title="item.title"
            :type="item.type"
            :value="item.value"
            :options="item.options"
            @propValue="propValue"
          >
          <!-- 监听propValue变化，然后把值替换旧的值，实现数据的传递 -->
          </filter-item>
        </div>
      </template>

      <!-- 表头 -->
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="power"
        label="权限">
        <template slot-scope="data">
          <el-tag style="margin-right: 5px" v-for="(item, index) in data.row.power" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间">
        <template slot-scope="data">
          {{data.row.date.slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="data">
          <el-button
            size="mini"
            @click="handleEdit(data.$index, data.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(data.$index, data.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </base-table>

    <!-- 添加用户弹窗 -->
    <el-dialog
      title="添加用户"
      :visible.sync="userDialog"
      width="30%">

      <el-form ref="form" :model="userForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input type="password" v-model="userForm.password" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item label="手机号码">
          <el-input v-model="userForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>

        <el-form-item label="真实姓名">
          <el-input v-model="userForm.name" placeholder="请输入真实姓名"></el-input>
        </el-form-item>

        <el-form-item label="权限">
          <el-select v-model="userForm.power" multiple placeholder="请选择权限">
            <el-option
              v-for="item in powerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传头像">
          <button type="button" @click="upload">
            <input type="file" hidden ref="upload" @change="fileUpLoad">
            上传图片
          </button>
          <br>
          <img v-show="userForm.avatar" class="avatar" :src="'http://192.168.0.98:3000' + userForm.avatar" alt="">
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import FilterItem from '@/components/FilterItem'

import { addUser, editUser, upload, deleteUser, uploadFile, exportFile } from '@/api/table'
export default {
  components: {
    BaseTable,
    FilterItem
  },
  data () {
    return {
      // 显示弹窗
      userDialog: false,
      // from 表单
      userForm: {
        username: null,
        phone: null,
        power: [],
        password: 123456,
        name: null,
        avatar: null
      },
      // 权限options
      powerOptions: [
        {
          value: 'admin',
          label: 'admin'
        }, {
          value: 'editor',
          label: 'editor'
        }
      ],
      // 筛选数据
      filterData: [
        {
          title: '用户名',
          type: 'input',
          key: 'username',
          value: null
        }, {
          title: '手机号码',
          type: 'input',
          key: 'phone',
          value: null
        }, {
          title: '权限',
          type: 'multipleSelect',
          key: 'power',
          value: [],
          options: [
            {
              value: 'admin',
              label: 'admin'
            }, {
              value: 'editor',
              label: 'editor'
            }
          ]
        }, {
          title: '姓名',
          type: 'input',
          key: 'name',
          value: null
        }
      ]
    }
  },
  methods: {
    // 添加用户弹窗
    AddUserDialog () {
      this.userDialog = true
      this.submitType = 'add'
    },
    // 提交用户信息
    submitUser () {
      if (this.submitType === 'add') {
        addUser(this.userForm).then(() => {
          this.close()
        }).catch(err => {
          console.log(err)
        })
      } else if (this.submitType === 'edit') {
        editUser(this.userForm).then(() => {
          this.close()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 继承filter-item返回的值
    propValue (val, index) {
      this.filterData[index].value = val
    },
    // 上传事件
    upload () {
      this.$refs.upload.click()
    },
    // input change
    fileUpLoad (e) {
      let form = new FormData()
      form.append('file', e.target.files[0])
      upload(form).then(req => {
        this.userForm.avatar = req.url
      })
    },
    //  编辑操作按钮回调
    handleEdit (index, row) {
      this.userDialog = true
      this.submitType = 'edit'
      this.userForm = Object.assign(this.userForm, row)
    },
    // 关闭弹窗
    close () {
      this.userDialog = false
      for (const key in this.userForm) {
        if (key === 'password') {
          this.userForm[key] = '123456'
        } else if (key === 'power') {
          this.userForm[key] = []
        } else if (key === '_id') {
          delete this.userForm[key]
        } else {
          this.userForm[key] = null
        }
      }
      this.$refs.table.searchInit(false)
    },
    // 删除按钮回调
    handleDelete (index, row) {
      deleteUser(row).then(() => {
        this.$refs.table.searchInit(false)
      })
    },
    // 导入文件
    ImportFile () {
      this.$refs.importFile.click()
      this.$refs.importFile.onchange = (event) => {
        let form = new FormData()
        form.append('file', event.target.files[0])
        uploadFile(form)
      }
    },
    // 导出用户
    ExportFile () {
      let table = this.$refs.table
      let selections = table.$refs.baseTable.selection.map((element, index) => {
        return element._id
      })
      exportFile(selections).then(res => {
        window.open('http://192.168.0.98:3000' + res.path, '_blank')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 50px;
  height: 50px;
}
</style>
