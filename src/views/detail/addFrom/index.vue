<template>
  <div class="detail-container">
    <code>这个框框可以用来写一些注意事项</code>
    <el-form ref="form" :model="form" label-width="100px" label-position="right" size="medium">
      <!-- 响应式限制下input框的宽度-->
      <el-row>
        <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="8">
          <el-form-item label="名称" required>
            <el-input v-model="form.name" clearable placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="下拉框" required>
            <el-select v-model="form.selectVal" placeholder="请选择选项">
              <el-option v-for="option in selectOptions" :label="option.name" :value="option.id" :key="option.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期范围">
            <el-col :span="11">
              <el-date-picker v-model="form.daterange" type="daterange" align="left" unlink-panels start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="form.date" placeholder="日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="时间">
            <el-time-picker v-model="form.time" placeholder="时间">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="开关">
        <el-switch v-model="form.switchVal"></el-switch>
      </el-form-item>
      <el-form-item label="多选组">
        <el-checkbox-group v-model="form.checkboxVal">
          <el-checkbox v-for="option in checkboxOptions" :label="option" :key="option.id">{{option.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="单选组">
        <el-radio-group v-model="form.radioVal">
          <el-radio v-for="option in radioOptions" :label="option.name" :value="option.id" :key="option.id"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="8">
          <el-form-item label="大文本">
            <el-input type="textarea" v-model="form.desc" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="等级">
        <div class="form-item-middle">
          <el-rate v-model="form.rateVal" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" show-text :texts="['辣鸡','我觉得不行','街边货','我觉得ok','惊为天人']"></el-rate>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkboxOptions: [{
        id: 0,
        name: '●'
      }, {
        id: 1,
        name: '◆'
      }, {
        id: 2,
        name: '■'
      }, {
        id: 3,
        name: '★'
      }],
      selectOptions: [
        {
          id: 0,
          name: 'A'
        }, {
          id: 1,
          name: 'B'
        }, {
          id: 2,
          name: 'C'
        }, {
          id: 3,
          name: 'D'
        }
      ],
      radioOptions: [
        {
          id: 0,
          name: '①'
        }, {
          id: 1,
          name: '②'
        }, {
          id: 2,
          name: '③'
        }, {
          id: 3,
          name: '④'
        }
      ],
      form: {
        name: '',
        selectVal: '',
        daterange: ['', ''],
        date: '',
        time: '',
        radioVal: '',
        checkboxVal: [],
        switchVal: false,
        rateVal: 1
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
