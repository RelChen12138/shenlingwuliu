<!-- 排班设置页 -->
<template>
  <div class="dashboard-container waybill-list customer-list-box">
    <div class="app-container">
      <el-card class="table-card-box">
        <el-button
          type="warning"
          size="mini"
          style="margin-bottom:20px"
          @click="showWorkHistory('add')"
        >添加工作模式</el-button>
        <el-table
          :data="workHistoryList"
          :header-cell-style="{'text-align':'center'}"
          size="mini"
        >
          <el-table-column
            prop="id"
            label="工作模式编号"
            width="250"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="工作模式"
            width="250"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="workPatternTypeDesc"
            label="类型"
            width="250"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="workDate"
            label="工作日期"
            width="250"
            align="left"
          >
          </el-table-column>
          <el-table-column
            label="工作时间"
            width="250"
            align="center"
          >
            <template v-slot="{row}">
              <span>{{ ((row.workEndMinute1-row.workStartMinute1)/60).toFixed(2) }}小时</span>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="操作"
            align="center"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                size="mini"
                @click="showWorkHistory('edit',row.id)"
              >编辑</el-button>
              <span>|</span>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="delWorkHistory(row.id)"
              >
                <el-button
                  slot="reference"
                  type="text"
                  size="mini"
                >删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row
          type="flex"
          justify="center"
        >
          <el-pagination
            :current-page="pageInfo.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            style="margin-top: 10px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-row>
      </el-card>
    </div>
    <el-dialog
      :title="dialogType"
      :visible.sync="showDialog"
      :before-close="handleClose"
      width="600px"
    >
      <el-tabs
        v-model="activeName"
        class="tab-box"
        :before-leave="beforeLeave"
      >
        <el-tab-pane
          v-if="!workPatternsForm.id || activeName==='1'"
          label="礼拜制"
          name="1"
        >
          <el-form
            :model="workPatternsForm"
            label-width="100px"
          >
            <el-form-item label="工作模式名称:">
              <el-input
                v-model="workPatternsForm.name"
                placeholder="请填写工作模式名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="连续工作天数:">
              <el-checkbox
                v-model="workPatternsForm.monday"
                true-label="1"
                false-label="2"
              >周一</el-checkbox>
              <el-checkbox
                v-model="workPatternsForm.tuesday"
                true-label="1"
                false-label="2"
              >周二</el-checkbox>
              <el-checkbox
                v-model="workPatternsForm.wednesday"
                true-label="1"
                false-label="2"
              >周三</el-checkbox>
              <el-checkbox
                v-model="workPatternsForm.thursday"
                true-label="1"
                false-label="2"
              >周四</el-checkbox>
              <el-checkbox
                v-model="workPatternsForm.friday"
                true-label="1"
                false-label="2"
              >周五</el-checkbox>
              <el-checkbox
                v-model="workPatternsForm.saturday"
                true-label="1"
                false-label="2"
              >周六</el-checkbox>
              <el-checkbox
                v-model="workPatternsForm.sunday"
                true-label="1"
                false-label="2"
              >周日</el-checkbox>
            </el-form-item>
            <div class="tips">选中为工作时间，未选中为休息时间</div>
            <el-form-item label="工作日期">
              <el-time-picker
                v-model="value1"
                is-range
                format="HH:mm"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                @change="changeTime"
              >
              </el-time-picker>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          v-if="!workPatternsForm.id || activeName==='2'"
          label="连续制"
          name="2"
        >
          <el-form
            :model="workPatternsForm"
            label-width="100px"
          >
            <el-form-item label="工作模式名称:">
              <el-input
                v-model="workPatternsForm.name"
                placeholder="请填写工作模式名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="连续工作天数"
              style="height:40px"
            >
              <el-row>
                <el-col :span="2">上</el-col>
                <el-col
                  :span="6"
                  style="margin-right:20px"
                >
                  <el-input
                    v-model="workDayNum"
                    placeholder="请输入天数"
                    @input="numChangeWork"
                  ></el-input>
                </el-col>
                <el-col :span="2">休</el-col>
                <el-col :span="6">
                  <el-input
                    v-model="restDayNum"
                    placeholder="请输入天数"
                    @input="numChangeRest"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="工作日期">
              <el-time-picker
                v-model="value1"
                is-range
                format="HH:mm"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                @change="changeTime"
              >
              </el-time-picker>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <el-row
          type="flex"
          justify="center"
        >
          <el-button
            type="warning"
            @click="btnConfirm"
          >确认</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { workHistoryList, addWorkHistory, deleteWorkHistory, workHistoryInfo, updateWorkHistory } from '@/api/transit'
export default {
  data() {
    return {
      value1: [new Date(2016, 9, 10, 9, 0), new Date(2016, 9, 10, 18, 0)],
      workHistoryList: [], // 工作模式列表
      // 请求工作模式分页
      pageInfo: {
        page: 1,
        pageSize: 5,
        total: 0
      },
      activeName: '1',
      showDialog: false, // 控制弹窗显示
      dialogType: '新增工作模式', // 弹窗类型
      // 表单信息
      workDayNum: 0,
      restDayNum: 0,
      workPatternsForm: {
        name: '', // 名称
        operator: 0, //	操作人
        userType: '', // 用户类型,1:员工，2:快递员，3:司机
        workDayNum: 0, //	连续工作天数
        restDayNum: 0,	// 休息天数
        monday: '2',
        tuesday: '2',
        wednesday: '2',
        thursday: '2',
        friday: '2',
        saturday: '2',
        sunday: '2',
        workPatternType: '1',
        workStartMinute1: 540,
        workEndMinute1: 1080
      }
    }
  },
  mounted() {
    this.getWorkHistoryList()
  },
  methods: {
    // 获取工作模式
    async getWorkHistoryList() {
      try {
        const { data } = await workHistoryList(this.pageInfo)
        this.workHistoryList = data.items
        this.pageInfo.total = +data.counts
        // console.log(this.workHistoryList)
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getWorkHistoryList()
    },
    handleCurrentChange(val) {
      this.pageInfo.page = val
      this.getWorkHistoryList()
    },
    // 打开弹窗
    async showWorkHistory(val, id) {
      if (val === 'add') {
        this.dialogType = '新增工作模式'
      } else {
        this.dialogType = '编辑工作模式'
        const { data } = await workHistoryInfo(id)
        let { workPatternType, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = data
        monday = monday + ''
        tuesday = tuesday + ''
        wednesday = wednesday + ''
        thursday = thursday + ''
        friday = friday + ''
        saturday = saturday + ''
        sunday = sunday + ''
        workPatternType = workPatternType + ''
        await (this.activeName = workPatternType)
        await (this.workPatternsForm = { ...data, monday, tuesday, wednesday, thursday, friday, saturday, sunday, workPatternType })
        this.restDayNum = data.restDayNum
        this.workDayNum = data.workDayNum
      }
      this.showDialog = true
    },
    // 关闭弹窗
    handleClose() {
      this.showDialog = false
      this.activeName = '1'
      this.workDayNum = 0
      this.restDayNum = 0
      this.workPatternsForm = {
        name: '', // 名称
        operator: 0, //	操作人
        userType: '', // 用户类型,1:员工，2:快递员，3:司机
        workDayNum: 0, //	连续工作天数
        restDayNum: 0,	// 休息天数
        monday: '2',
        tuesday: '2',
        wednesday: '2',
        thursday: '2',
        friday: '2',
        saturday: '2',
        sunday: '2',
        workPatternType: '1',
        workStartMinute1: 540,
        workEndMinute1: 1080
      }
      this.value1 = [new Date(2016, 9, 10, 9, 0), new Date(2016, 9, 10, 18, 0)]
    },
    // 获取时间
    changeTime(time) {
      this.workPatternsForm.workStartMinute1 = time[0].getHours() * 60 + time[0].getMinutes()
      this.workPatternsForm.workEndMinute1 = time[1].getHours() * 60 + time[1].getMinutes()
    },
    numChangeWork(val) {
      this.workPatternsForm.workDayNum = +val
    },
    numChangeRest(val) {
      this.workPatternsForm.restDayNum = +val
    },
    // 切换tab
    beforeLeave(val) {
      this.workPatternsForm.workPatternType = val
      this.workDayNum = 0
      this.restDayNum = 0
      if (this.workPatternsForm.workPatternType === '2') {
        this.workPatternsForm = {
          name: '', // 名称
          operator: 0, //	操作人
          userType: '', // 用户类型,1:员工，2:快递员，3:司机
          workDayNum: 0, //	连续工作天数
          restDayNum: 0,	// 休息天数
          monday: '0',
          tuesday: '0',
          wednesday: '0',
          thursday: '0',
          friday: '0',
          saturday: '0',
          sunday: '0',
          workPatternType: '2',
          workStartMinute1: 540,
          workEndMinute1: 1080
        }
      }
      this.value1 = [new Date(2016, 9, 10, 9, 0), new Date(2016, 9, 10, 18, 0)]
    },
    // 点击确认
    async btnConfirm() {
      try {
        if (this.workPatternsForm.id) {
          await updateWorkHistory(this.workPatternsForm)
          this.$message.success('修改成功')
        } else {
          await addWorkHistory(this.workPatternsForm)
          this.$message.success('添加成功')
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.getWorkHistoryList()
        this.handleClose()
      }
    },
    // 点击删除按钮
    async delWorkHistory(id) {
      try {
        await deleteWorkHistory(id)
        this.$message.success('删除成功')
        this.getWorkHistoryList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .table-card-box {
  .el-card__body {
    padding-bottom: 0px;
  }
}
/deep/ .pagination{
  padding-bottom: 30px;
}
.tab-box {
  color: #20232a;
  /deep/ .el-form-item__label{
    font-size: 12px;
  }
  /deep/ .el-form-item{
    margin-bottom: 20px;
  }
  /deep/ .el-checkbox__label{
    font-size: 12px;
    padding-left: 3px;
  }
  /deep/ .el-input{
    font-size: 12px;
  }
  /deep/ .el-tabs__item.is-active {
    color: #20232a;
    font-size: 16px;
    font-weight: bold;
  }
  /deep/ .el-form-item__content {
    height: 40px;
  }
  /deep/ .el-tabs__item {
    font-size: 14px;
  }
  /deep/ .el-tabs__item:hover {
    color: #20232a;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  /deep/ .el-tabs__active-bar {
    background-color: #e15536;
  }
  /deep/ .tips {
    position: absolute;
    left: 100px;
    top: 100px;
    height: 10px;
    font-size: 12px;
    color: #bac0cd;
  }
  .el-checkbox {
    margin-right: 12px;
  }
  /deep/ .workDay {
    .el-form-item__error {
      position: relative;
    }
  }
}
/deep/ .el-dialog__header{
  height: 50px;
}
/deep/ .el-dialog__body {
  padding: 20px 50px!important;
  .el-tabs__header {
    padding-bottom: 25px;
  }
}
/deep/ .el-tabs__nav,
.is-top {
  transform: translateX(30px) !important;
}
</style>
