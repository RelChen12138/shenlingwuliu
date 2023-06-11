<!-- 排班管理 -->
<template>
  <div class="dashboard-container transport-task customer-list-box box1">
    <el-card class="box-card">
      <el-form
        :model="formInline"
        class="demo-form-inline"
        size="medium"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label-width="100px"
              label="员工账号"
            >
              <el-input
                v-model="formInline.employeeNumber"
                placeholder="请输入员工账号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label-width="100px"
              label="员工姓名"
            >
              <el-input
                v-model="formInline.name"
                placeholder="请输入员工姓名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label-width="100px"
              label="工作模式"
            >
              <el-select
                v-model="formInline.workPatternId"
                placeholder="请选择工作模式"
                clearable
              >
                <el-option
                  v-for="option in dropDownList"
                  :key="option.id"
                  :label="option.name"
                  :value="option.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label-width="100px"
              label="月份"
            >
              <el-date-picker
                v-model="formInline.month"
                type="month"
                placeholder="选择月"
                clearable
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label-width="100px"
              label="所属机构"
            >
              <treeselect
                v-model="formInline.agencyId"
                placeholder="请选择所属机构"
                no-options-text="暂无数据"
                no-results-text="暂无数据"
                :multiple="false"
                :options="treeData"
                :show-count="true"
                :normalizer="normalizer"
              >
              </treeselect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button
                type="danger"
                @click="initData"
              >提交</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- //排班管理 -->
    <el-card class="box-card1">
      <el-button
        type="danger"
        @click="$router.push('workArrange-setting')"
      >排班设定</el-button>
      <el-button @click="dialogVisible = true">绑定排班</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        class="table1"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          width="55"
        >

        </el-table-column>
        <el-table-column
          fixed
          prop="employeeNumber"
          label="员工账号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="员工姓名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="phone"
          label="员工电话"
          width="120"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="userType"
          label="员工角色"
          width="120"
        >
          <template v-slot="{ row }">
            <span
              v-if="row.userType == '1'"
            >员工</span>
            <span v-else-if="row.userType == '2'">快递员</span>
            <span v-else>司机</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="workPatternName"
          label="当前工作模式"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          v-for="(schedule, index) in 30"
          :key="index"
          :label="(index + 1).toString()"
          width="60"
        >
          <template v-slot="{ row }">
            <span
              v-if="row.workSchedules[index]"
              class="textStyle"
            >上</span>
            <span v-else>休</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- //分页 -->
      <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
      <div class="block">
        <el-pagination
          :page-sizes="[10,20,30,50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="+data.counts"
          :current-page="data.page"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- //绑定排班 -->
    <el-dialog
      title="人工调整"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      class="tanchu"
    >
      <el-form
        :model="workSchedulingsForm"
        class="demo-form-inline"
        size="medium"
      >
        <el-row>
          <el-radio
            v-model="workSchedulingsForm.workPatternType"
            label="1"
            @input="changeWorkPatternType"
          >礼拜制</el-radio>
          <el-radio
            v-model="workSchedulingsForm.workPatternType"
            label="2"
          >连续制</el-radio>
        </el-row>
        <el-form-item
          label-width="100px"
          label="工作模式"
          class="inputbox"
        >
          <el-select
            v-model="workSchedulingsForm.workPatternId"
            placeholder="请选择工作模式"
            clearable
          >
            <el-option
              v-for="option in dropDownList1"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="btnPeopleSetConfirm">确认</el-button>
        <el-button
          type="primary"
          @click="handleClose"
        >取消</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
// import the component

import { workManage, selectWorkHistoryList, peopleSet } from '@/api/transit'
import { agencyList } from '@/api/institutions'

// import { transListToTreeData } from '@/utils'
// import { transListToTreeData } from '@/utils'
export default {
  // register the component
  components: { Treeselect },
  data() {
    return {

      dialogVisible: false, // 弹框显示隐藏
      dropDownList: [], // 下拉工作列表
      dropDownList1: [], // 下拉工作列表 第二个下拉框
      formInline: {
        employeeNumber: '', // 员工账号
        name: '', // 员工姓名
        month: '', // 月份
        agencyId: '', // 所属机构
        workPatternId: '' // 工作模式id 默认0：无工作
      },
      tableData: [], // 排班信息

      data: {
        counts: 0, // 总条目数
        pages: 0, // 总页数
        page: 1, // 页码 // 当前页码数
        pageSize: 10 // 当前页面需要的数据条数
      },
      treeData: [], // 所属机构树
      length: '',
      workSchedulingsForm: { // 批量管理员工
        userIdList: [], // 选择的员工id数组
        userType: '',
        workPatternId: '', // 工作模式ID
        workPatternType: '1' // 工作模式类型1:礼拜制，2：连续制
      }

    }
  },
  created() {
    this.reset()
    this.initData()
    this.agencyList()
    this.selectWorkHistoryList()
    this.length = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    async initData() {
      // 添加搜索
      const res = await workManage({ // 获取排班信息
        ...this.data,
        ...this.formInline

      })
      console.log(res.data.items)
      this.tableData = res.data.items
      this.data.counts = res.data.counts // 总条目数
      this.data.pages = res.data.pages // 总页数 （每页显示的条目数）
      this.data.page = res.data.page
      this.data.pageSize = res.data.pageSize // 当前页面需要的数据条数
      this.length = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    },
    // 分页跳转
    handleCurrentChange(current) {
      this.data.page = current
      this.initData()
    },
    // 添加重置方法
    //  {
    //   this.formInline.employeeNumber = '' // 员工账号
    //   this.formInline.name = '' // 员工姓名
    //   this.formInline.agencyId = '' // 所属机构
    //   this.formInline.month = '' // 月份
    //   this.formInline.workPatternId = '' // 工作模式
    //   this.initData()
    // },
    // 重置表单
    reset() {
      this.formInline = {
        // page: 0, // 页码
        pageSize: 10, // 页面大小
        name: '', // 员工姓名
        employeeNumber: '', // 员工账号
        agencyId: '', // 所属机构
        month: '', // 月份
        workPatternId: '', // 工作模式ID 默认 0 ：无工作模式
        userType: '' // 用户类型：1：员工，2：快递员，3:司机
      }
    },
    // 选择框
    handleSelectionChange(arr) {
      const newArr = []
      arr.forEach(item => {
        newArr.push(item.id)
      })
      this.workSchedulingsForm.userIdList = newArr
    },
    // 获取工作模式列表
    async selectWorkHistoryList() {
      try {
        const res = await selectWorkHistoryList()

        this.dropDownList = [...res.data['1'], ...res.data['2']]

        if (this.workSchedulingsForm.workPatternType === '1') {
          this.dropDownList1 = [...res.data['1']]
        } else {
          this.dropDownList1 = [...res.data['2']]
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 判断当前工作模式
    judgmentWorkPatternById(id) {
      const findWork = []
      this.dropDownList.forEach(item => {
        if (item.id === id) {
          findWork.push(item)
        }
      })
      if (findWork.length === 0) {
        return '暂无安排'
      } else {
        const res = findWork[0]
        const name = res.name
        return name
      }
    },
    // 绑定排班单选按钮切换
    changeWorkPatternType() {
      this.selectWorkHistoryList()
    },
    // 绑定排班确认按钮
    async btnPeopleSetConfirm() {
      try {
        await peopleSet(this.workSchedulingsForm)// 人工调整
        this.initData() // 获取排班信息
        this.handleClose()
        this.$message.success('绑定成功')
      } catch (error) {
        console.log(error)
      }
    },
    handleOpen() {
      if (this.workSchedulingsForm.userIdList.length === 0) {
        this.$message.error('请选择排班员工')
        return 0
      } else {
        this.dialogVisible = true
      }
    },

    // 获取树状机构信息
    async agencyList() {
      const res = await agencyList()
      console.log(res)
      this.treeData = JSON.parse(res.data)
    },
    // 声明一个“标准化器”，将你的数据标准化
    normalizer(node) {
      const label = node.name || '请选择所属机构'
      return {
        id: node.id,
        label, // 将 name 属性作为标签显示
        children: node.children
      }
    },
    handleClose() {
      this.dialogVisible = false
      this.workSchedulingsForm = {
        userIdList: [], // 选择的员工id数组
        userType: '',
        workPatternId: '', // 工作模式ID
        workPatternType: '1' // 工作模式类型1:礼拜制，2：连续制
      }
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ th.date{
  .cell{
    padding-left: 17px!important;

  }
}

.work {
  width: 24px;
  height: 24px;
  background: #ffeeeb;
  border: 1px solid #e15536;
  border-radius: 50%;
  text-align: center;
  color: #e15536;
  font-size: 13px;
}
.history-name {
  width: auto !important;
  /deep/ .el-input__inner {
    width: 293px;
  }
}
.box1{
  padding: 20px;
}
.box-card{
  width: 100%;
  height: 175px;
}
/deep/ .el-button--medium {
    padding: 10px px 21px;
    font-size: 14px;
    border-radius: 4px;
    margin-left: 33px;
}

.workArrange-manage-people-setting {
  /deep/ .el-dialog__body {
    padding: 30px 50px 10px 50px !important;
  }
  /deep/ .el-dialog__footer {
    padding-bottom: 40px;
  }
}

.work-type {
  /deep/ .el-form-item__content {
    margin-left: 40px !important;
  }
  /deep/ .el-radio:first-child {
    margin-right: 80px !important;
  }
  /deep/.el-radio__label {
    font-weight: bold;
    color: #333333;
  }
}

.dialog-footer {
  .el-button {
    width: 89px;
    height: 36px;
    padding: 10px 20px;
  }
}

.rest {
  width: 24px;
  height: 24px;
  background: #eff3f8;
  border: 1px solid #d8dde3;
  border-radius: 50%;
  text-align: center;
  color: #20232a;
  font-size: 13px;
}

.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 40px;
}
.transport-task /deep/ .el-table td,
.el-table th {
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  overflow: hidden;
}

// 下拉框
/deep/ .el-select {
  width: 100%;
}

/*定义滚动条轨道 内阴影+圆角*/
/deep/ .el-table--scrollable-x .el-table__body-wrapper {
  padding-bottom: 5px;
  margin-bottom: 5px;
  &::-webkit-scrollbar {
    height: 10px;
  }

  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(144, 147, 153, 0.3);
  }

  &::-webkit-scrollbar-track-piece {
    margin-right: 3px;
    margin-left: 3px;
  }
}
/deep/ .el-card{
  overflow: initial;
}
.box-card1{
  width: 100%;
  height: 750px;
  margin-top: 20px;
}
.table1{
  margin-top: 20px;
}
.textStyle{
  border: 1px solid #de5410;
  border-radius: 50%;
  padding: 3px;
  background-color: #ffeeeb;
}
.block{
  text-align: center;
}
/deep/ .el-dialog__footer {
  margin-top: 136px;
}
.inputbox{
  margin-top: 40px;
}

</style>

<style></style>
