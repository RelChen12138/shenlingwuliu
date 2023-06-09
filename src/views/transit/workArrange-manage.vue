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
                v-model="formInline.agencyName"
                placeholder="请选择工作模式"
                clearable
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
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
              <el-select
                v-model="formInline.region"
                placeholder="请选择所属机构"
                clearable
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
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
    <el-card class="box-card1">
      <el-button
        type="danger"
      >排班设定</el-button>
      <el-button>绑定排班</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        class="table1"
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
  </div>
</template>
<script>
import { workManage } from '@/api/transit'
// import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      formInline: {
        employeeNumber: '',
        name: '',
        region: '',
        month: '',
        agencyName: ''
      },
      tableData: [],
      multipleSelection: [],
      data: {
        counts: 0, // 总条目数
        pages: 0, // 总页数
        page: 0, // 页码 // 当前页码数
        pageSize: 10 // 当前页面需要的数据条数
      }

    }
  },
  created() {
    this.initData()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    async  initData() {
      // 添加搜索
      const res = await workManage({
        ...this.data,
        ...this.formInline
      })
      console.log(res)
      this.tableData = res.data.items
      this.data.counts = res.data.counts // 总条目数
      this.data.pages = res.data.pages // 总页数 （每页显示的条目数）
      this.data.page = res.data.page
      this.data.pageSize = res.data.pageSize // 当前页面需要的数据条数
    },
    // 分页跳转
    handleCurrentChange(current) {
      this.data.page = current
      this.initData()
    },
    // 添加重置方法
    reset() {
      this.formInline.employeeNumber = ''
      this.formInline.name = ''
      this.formInline.region = ''
      this.formInline.month = ''
      this.initData()
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
  width: 1287px;
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
</style>

<style></style>
