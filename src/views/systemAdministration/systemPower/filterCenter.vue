<template>
  <div>
    <!-- 下拉选择可清除 -->
    <div :class="[{'active': value1}, 'item-group']">
      <label for="">下拉选择可清除</label>
      <el-select v-model="value1" placeholder="" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <!-- DatePicker 日期选择器 -->
    <div :class="[{'active': value2}, 'item-group', 'icon']">
      <label for="">DatePicker 日期选择器</label>
      <el-date-picker
        v-model="value2"
        align="right"
        type="date"
        placeholder=""
        :picker-options="pickerOptions1">
      </el-date-picker>
    </div>
    <!-- 基础多选 -->
    <div :class="[{'active': value3 != ''}, 'item-group']">
      <label for="">基础多选</label>
      <el-select
        v-model="value3"
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
    </div>
    <!-- 日期和时间范围 -->
    <div :class="[{'active': value4}, 'item-group', 'icon']">
      <label for="">日期和时间范围</label>
      <el-date-picker
        v-model="value4"
        type="datetimerange"
        :picker-options="pickerOptions2"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: null,
      value2: null,
      value3: [],
      value4: null,
      options: [
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
      ],
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
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
      },
      pickerOptions2: {
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
