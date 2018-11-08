<template>
  <div class="detail-container">
    <code>这个框框可以用来写一些注意事项</code>
    <el-form ref="form" :model="form" label-width="100px" label-position="right" size="medium">
      <!-- 响应式限制下input框的宽度-->
      <el-row>
        <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="8">
          <el-form-item label="活动名称" required>
            <el-input v-model="form.name" clearable placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" required>
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker v-model="form.daterange" type="daterange" align="left" unlink-panels start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="收款日期">
            <el-date-picker v-model="form.date" placeholder="收款日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="8">
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc" placeholder="可选填"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
      form: {
        name: '',
        region: '',
        daterange: ['', ''],
        date: '',
        delivery: false
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
