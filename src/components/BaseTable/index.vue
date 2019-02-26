<template>
  <div class="table-component">
    <!-- 下拉筛选 -->
    <div :class="['mask', {'visible': visible && isBotton}]">
      <div
        :class="['drop-down-filter', {'visible': visible && isBotton}, {'column': filterType === 'block'}]"
        :style="{height: filterHeight + 'px'}"
        ref="filter">
        <div class="drop-down-filter-left">
          <slot name="filter-left"></slot>
        </div>
        <div class="drop-down-filter-center" ref="center" style="flex: 1">
          <slot name="filter-center" :data="filterData"></slot>
        </div>
        <div class="drop-down-filter-right">
          <el-button type="primary" ref="search" @click="search()">搜索</el-button>
          <el-button type="primary" @click="handlerToggle" v-show="isBotton">
            <svg-icon iconClass="down" :class="['icon', {'visible': visible}]"></svg-icon>
          </el-button>
        </div>
      </div>
    </div>
    <!-- 表格 , {'visible': visible && isBotton} -->
    <div :class="['base-table']" :style="{marginTop: visible && isBotton ? filterHeight + 'px' : 'auto'}">
      <el-table
        :data="tableData"
        :style="{'height': tableHeight}"
        :height="tableHeight"
        tooltip-effect="dark"
        border
        style="width: 100%"
        ref="baseTable">
        <slot></slot>
      </el-table>

      <el-pagination
        ref="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="propCurrentPage"
        :page-sizes="pageSizes"
        :page-size="propPageSize"
        :layout="layout"
        :total="propTotal">
      </el-pagination>

      <div v-if="tree" :class="['tree', {'visible': isTree}]">
        <div class="tree-demo">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>

          <el-tree
            :show-checkbox="treeCheck"
            highlight-current
            class="filter-tree"
            :data="treeDate"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="nodeClick"
            ref="tree">
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 第几页
    currentPage: {
      type: Number,
      default: 1
    },
    // 显示几条数据
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 50, 100]
      }
    },
    // 默认展示几条数据
    pageSize: {
      type: Number,
      default: 10
    },
    // 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 总页
    total: {
      type: Number,
      default: 0
    },
    // 筛选的数据
    filterData: {
      type: Array,
      default () {
        return []
      }
    },
    // tree 的数据
    treeDate: {
      type: Array,
      default () {
        return [{
          id: 1,
          label: '一级 1'
        }, {
          id: 2,
          label: '一级 2'
        }, {
          id: 3,
          label: '一级 3'
        }]
      }
    },
    // defaultProps tree默认的数据类型
    defaultProps: {
      type: Object,
      default () {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    // 是否有tree
    tree: {
      type: Boolean,
      default: false
    },
    // treecheck tree是否有checked
    treeCheck: {
      type: Boolean,
      default: false
    },
    // filter 的类型 inline / block
    filterType: {
      type: String,
      default: 'inline'
    },
    // 请求地址
    url: {
      require: true,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tableHeight: 0,
      filterHeight: this.filterType === 'block' ? 120 : 60,
      visible: false,
      isBotton: false,
      tableData: [],
      propPageSize: this.pageSize,
      propCurrentPage: this.currentPage,
      propTotal: this.total,
      filterText: null,
      isTree: false
    }
  },
  methods: {
    // 计算table的高度
    countTableHeight () {
      // 筛选框的高度
      let filter = this.filterHeight
      // 页码高度
      let pagination = this.$refs.pagination.$el.clientHeight
      // 总的高度
      let totalHeight = document.querySelector('.app-main').clientHeight - 40
      // 计算table的高度
      this.tableHeight = totalHeight - (filter + pagination) + 'px'
    },
    // 搜索的公共方法
    searchInit (tree = false) {
      let dataObj = {}
      // 是否展示树
      // 不展示 或者 树是可多选状态
      if (!tree || this.treeCheck) {
        this.filterData.forEach(item => {
          dataObj[item.key] = item.value
        })
        // 多选状态，添加treeNode
        if (this.treeCheck) {
          dataObj.treeNode = this.$refs.tree.getCheckedNodes().map(item => item.id).join(',')
          this.isTree = false
        }
      // 展示
      } else {
        dataObj.treeNode = tree.data.id
        this.isTree = false
      }
      this.visible = false
      window.vm.$emit('search', {
        url: this.url,
        data: Object.assign(dataObj, { pageSize: this.propPageSize, currentPage: this.propCurrentPage }),
        callback: (result) => {
          this.propTotal = result.total
          this.tableData = result.data
        }
      })
    },
    // 改变pageSizes触发事件
    handleSizeChange (val) {
      this.propPageSize = val
      this.searchInit()
    },
    // 改变currentPage触发事件
    handleCurrentChange (val) {
      this.propCurrentPage = val
      this.searchInit()
    },
    // filter下来的切换方法
    handlerToggle () {
      this.visible = !this.visible
    },
    // 是否有下拉按钮的方法
    isBottonFun () {
      let total = this.$refs.center.clientWidth
      let childList = 0
      if (this.$refs.center.childNodes.length > 0) {
        this.$refs.center.childNodes[0].childNodes.forEach(item => {
          childList += (item.clientWidth + parseInt(window.getComputedStyle(item).marginRight))
        })
      }
      this.isBotton = total < childList
    },
    // 点击搜索按钮方法
    search () {
      this.searchInit()
    },
    // 筛选节点
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    nodeClick (object, node, body) {
      if (this.treeCheck) {
        return
      }
      this.searchInit(node)
    }
  },
  mounted () {
    this.$nextTick(this.countTableHeight)
    this.$nextTick(this.isBottonFun)
    window.onresize = () => {
      this.countTableHeight()
      this.isBottonFun()
    }
    window.vm.$on('toggleTree', () => {
      this.isTree = !this.isTree
    })
  },
  watch: {
    // 监听搜索tree的input值
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    // 监听visible 解决切换tree冲突
    visible (val) {
      if (val) {
        this.isTree = false
      }
    },
    // 监听isTree 解决切换filter冲突
    isTree (val) {
      if (val) {
        this.visible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-table {
  position: relative;
  z-index: 9;
  &.visible {
    margin-top: 62px;
  }
  .el-pagination {
    position: relative;
    z-index: 8;
  }
}

.mask {
  transition: all .5s;
  z-index: -1;
  &.visible {
    background: rgba(0,0,0, .5);
    position: absolute;
    top: 17px;
    left: 17px;
    right: 0;
    bottom: 0;
    z-index: 99;
  }
}

.drop-down-filter {
  border-bottom: 1px solid #dddddd;
  padding: 0px;
  display: flex;
  transition: all .3s;
  background: #ffffff;
  transition: all .3s;
  &.visible {
    height: auto !important;
    .drop-down-filter-center {
      .item-group {
        margin-bottom: 20px;
      }
    }
  }
  &.column {
    // flex-direction: column;
    flex-wrap: wrap;
    .drop-down-filter-left {
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
  .drop-down-filter-left {
    white-space: nowrap;
    margin-right: 10px;
  }
  .drop-down-filter-center {
    flex: 1;
    .item-group {
      margin-bottom: 40px;
    }
  }
  .drop-down-filter-right {
    white-space: nowrap;
    .icon {
      transition: all .3s;
      &.visible {
        transform: rotate(180deg);
      }
    }
  }
  .filter-group {
    line-height: inherit;
    display: flex;
    flex: 1;
    .drop-down-filter-center {
      flex: 1;
    }
    .drop-down-filter-right {
      white-space: nowrap;
      .icon {
        transition: all .3s;
        &.visible {
          transform: rotate(180deg);
        }
      }
    }
  }
}

.tree {
  position:absolute;
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: all .5s;
  &.visible {
    width: auto;
    height: auto;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0, .5);
    z-index: 99;
  }
  .tree-demo {
    display: inline-block;
    padding: 10px;
    background: #fff;
    height: 100%;
    overflow: auto;
  }
}
</style>
