<template>
  <div
    :class="[
      {'active': propValue && propValue != ''},
      {'icon': 'date' || 'datetimerange' === type},
      'item-group'
    ]">
    <label for="">{{title}}</label>
    <!-- select -->
    <el-select v-if="type === 'select'" v-model="propValue" placeholder="" clearable>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <!-- date -->
    <el-date-picker
      v-if="type === 'date'"
      v-model="propValue"
      align="right"
      type="date"
      placeholder=""
      :picker-options="pickerOptions">
    </el-date-picker>
    <!-- multipleSelect -->
    <el-select
      v-if="type === 'multipleSelect'"
      v-model="propValue"
      multiple
      collapse-tags
      placeholder="">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <!-- datetimerange -->
    <el-date-picker
      v-if="type === 'datetimerange'"
      v-model="propValue"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    <!-- input -->
    <el-input v-model="propValue" v-if="type === 'input'"></el-input>
  </div>
</template>

<script>
export default {
  props: {
    // 标题
    title: {
      require: true,
      type: String,
      default: ''
    },
    // 默认值
    value: {
      default: null
    },
    // select(下拉选择框)/date(事件选择框)/multipleSelect(多选下拉选择框)/datetimerange(时间联动框)/input(输入框)
    type: {
      require: true,
      type: String,
      default: null
    },
    // 下拉的选项配置
    options: {
      type: Array,
      default () {
        return [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          },
          {
            value: '选项3',
            label: '蚵仔煎'
          },
          {
            value: '选项4',
            label: '龙须面'
          },
          {
            value: '选项5',
            label: '北京烤鸭'
          }
        ]
      }
    },
    // 日期选择框配置
    pickerOptions: {
      type: Object,
      default () {
        if (this.type === 'datetimerange') {
          return {
            shortcuts: [{
              text: '最近一周',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近一个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近三个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }]
          }
        } else if (this.type === 'date') {
          return {
            shortcuts: [{
              text: '今天',
              onClick (picker) {
                picker.$emit('pick', new Date())
              }
            }, {
              text: '昨天',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            }, {
              text: '一周前',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }]
          }
        }
      }
    },
    // 组件下标
    index: {
      default: null
    }
  },
  data () {
    return {
      // 选择/输入的值
      propValue: this.value
    }
  },
  watch: {
    // 监听value变化
    value (val) {
      // 把赋值给propValue
      this.propValue = val
    },
    // 监听propValue变化
    propValue (val) {
      // 把值回传给组件
      this.$emit('propValue', val, this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
