<template>
  <div class="app-container">
    <!-- 系统权限 -->
    <base-table
      :filterData="filterData"
      :tree="true"
      :treeDate="treeDate"
      :treeCheck="true"
      filterType="block">
      <!-- 筛选下拉左边按钮 -->
      <FilterLeft slot="filter-left"></FilterLeft>
      <!--
        筛选下拉中间选项
        需要使用标签包裹筛选
        example:
          <div>
            ...
          </div>
      -->
      <template slot="filter-center" slot-scope="user">
        <div>
          <filter-item
            v-for="(item, index) in user.data" :key="index"
            :index="index"
            :title="item.title"
            :type="item.type"
            :value="item.value"
            @propValue="propValue"
          ></filter-item>
        </div>
      </template>

      <!-- 表头 -->
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        prop="date"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="name"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="address"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="address"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </base-table>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import FilterItem from '@/components/FilterItem'
import FilterLeft from './filterLeft'

export default {
  components: {
    FilterItem,
    FilterLeft,
    BaseTable
  },
  data () {
    return {
      filterData: [
        {
          title: '下拉选择可清除',
          key: 'select',
          type: 'select',
          value: null
        },
        {
          title: 'DatePicker 日期选择器',
          key: 'DatePicker',
          type: 'date',
          value: null
        },
        {
          title: '基础多选',
          key: 'multipleSelect',
          type: 'multipleSelect',
          value: []
        },
        {
          title: '日期和时间范围',
          key: 'datetimerange',
          type: 'datetimerange',
          value: null
        }
      ],
      treeDate: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }]
    }
  },
  methods: {
    propValue (val, index) {
      this.filterData[index].value = val
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding-right: 0;
  padding-bottom: 0;
}
</style>
