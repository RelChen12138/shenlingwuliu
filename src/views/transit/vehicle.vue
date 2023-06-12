<!-- 车辆列表 -->
<template>
  <div class="dashboard-container vehicle customer-list-box">
    <div class="first-div">
      <!-- 车辆类型表单 -->
      <el-form
        ref="resetform"
        :inline="true"
        :model="obj"
        :rules="rules"
        class="demo-form-inline"
        style="width:100%;"
      >
        <el-form-item
          prop="truckTypeId"
          label="车辆类型"
          style="width:35%;"
        >
          <el-select
            v-model="obj.truckTypeId"
            clearable
            placeholder="请选择"
            style="width:380px;"
          >
            <el-option
              v-for="item in carTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="licensePlate"
          label="车牌号码"
          style="width:35%;"
        >
          <el-input
            v-model="obj.licensePlate"
            style="width:380px;"
            placeholder="请输入车牌号码"
          ></el-input>

        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 90px;"
            type="warning"
            @click="search"
          >查询</el-button>
          <el-button
            style="width: 90px;"
            @click="clearform"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 车辆列表 -->
    <div class="car-number">
      <span
        :class="{active:activetype==='all'}"
        @click="handleisActive('all')"
      >全部{{ totalnumber }}</span>
      <span
        :class="{active:activetype==='can-use'}"
        @click="handleisActive('can-use')"
      >可用{{ usenumber }}</span>
      <span
        :class="{active:activetype==='stop-use'}"
        @click="handleisActive('stop-use')"
      >停用{{ stopnumber }}</span>
    </div>
    <!-- 主体表格 -->
    <div class="main">
      <div class="add-car">
        <el-button
          type="warning"
          @click="addCar"
        >新增车辆</el-button>
      </div>
      <div class="table">
        <el-table
          :row-style="{height: '20px'}"
          :data="carList"
          style="width: 100%"
          :stripe="true"
        >
          <el-table-column
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>

          <el-table-column
            prop="licensePlate"
            label="车牌号码"
            width="180"
          >
          </el-table-column>

          <el-table-column
            prop="truckTypeName"
            label="车辆类型"
          >
          </el-table-column>

          <el-table-column
            prop="driverNum"
            label="司机数量"
          >
          </el-table-column>

          <el-table-column
            prop="workStatus"
            label="车辆状态"
          >
            <template v-slot="{row}">
              <span
                class="yuandian"
                :class="{activeColor:row.workStatus === 1}"
              ></span>
              <span>{{ row.workStatus| filterStatus }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="deviceGpsId"
            label="GPS设备ID"
          >
          </el-table-column>

          <el-table-column
            prop="allowableLoad"
            label="实载重量(T)"
          >
          </el-table-column>

          <el-table-column
            prop="allowableVolume"
            label="实载体积(方)"
          >
          </el-table-column>

          <el-table-column
            prop="address"
            label="操作"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                @click="openDetail(row)"
              >查看详情</el-button>
              <el-button
                type="text"
                :class="{activeColorfont:row.workStatus === 1}"
                @click="openQy(row.id)"
              >{{ row.workStatus| filterStatusT }}</el-button>
              <el-button
                type="text"
                @click="openDriver(row)"
              >配置司机</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 配置司机确认弹框 -->
      <el-dialog
        title="车辆配置"
        :visible.sync="isShowone"
        width="25%"
      >
        <div class="messagetitle">配置司机需要满足以下条件:</div>
        <div class="messagediv">
          <span>1 车辆信息已完善</span>
          <span>2 车辆无未完成运输任务</span>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="mini"
            @click="isShowone = false"
          >取 消</el-button>
          <el-button
            size="mini"
            style="width:60px;height:30px"
            type="warning"
            @click="handleMessageClose"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 配置司机弹框 -->
      <el-dialog
        title="配置司机"
        :visible.sync="isShowTwo"
        width="35%"
        @close="closeDriverpage"
      >
        <div class="driverdiv">
          <div class="header">
            <el-form
              label-position="left"
              label-width="75px"
            >
              <div class="firstcolumn">
                <el-form-item
                  label="车牌号:"
                  style="height:30px"
                >
                  <span>{{ rowObj.licensePlate }}</span>
                </el-form-item>
                <el-form-item
                  label="车型:"
                  style="height:30px;width:160px"
                >
                  <span>{{ rowObj.truckTypeName }}</span>
                </el-form-item>
              </div>
              <div class="secondcolumn">
                <el-form-item
                  label="车辆状态:"
                  style="height:30px;width:150px"
                >
                  <span class="greenBG">可用</span>
                </el-form-item>
                <el-form-item
                  label="实载重量:"
                  style="height:30px;width:150px"
                >
                  <span>{{ rowObj.allowableLoad }}</span>
                </el-form-item>
              </div>
              <el-form-item
                label="实载体积:"
                style="height:30px;width:150px"
              >
                <span>{{ rowObj.allowableVolume }}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="drivermain">
            <span>配置司机：</span>
            <el-select
              v-model="driverListTwo"
              multiple
              style="width: 300px;"
            >
              <el-option
                v-for="item in driverList"
                :key="item.id"
                :value="item.name"
                :label="item.name"
              ></el-option>
            </el-select>
          </div>
          <div class="driverfooter">
            <el-table
              :data="driverList"
              stripe
              style="width: 100%;height:200px"
            >
              <el-table-column
                prop="date"
                type="index"
                label="序号"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="司机名称"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop=""
                label="操作"
              >
                <template v-slot="{row}">
                  <el-button
                    type="text"
                    @click="chakanDriver(row)"
                  >查看</el-button><span class="lineBetween">|</span>
                  <el-button
                    type="text"
                    style="color:red"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <el-row
          slot="footer"
          type="flex"
          justify="center"
          class="dialog-footer"
        >
          <el-button
            style="width:70px"
            size="small"
            type="warning"
            @click="closeDriverpage"
          >确 定</el-button>
          <el-button
            size="small"
            @click="closeDriverpage"
          >取 消</el-button>
        </el-row>
      </el-dialog>
      <!-- 启用确认弹框 -->
      <el-dialog
        title="车辆启用"
        :visible.sync="isShowThree"
        width="25%"
      >
        <div class="messagetitle">确定要启用吗?车辆启用需满足以下条件:</div>
        <div class="messagediv">
          <span>1 车辆信息已完善</span>
          <span>2 绑定司机>=2,且有排班</span>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="mini"
            @click="isShowThree = false"
          >取 消</el-button>
          <el-button
            size="mini"
            style="width:60px;height:30px"
            type="warning"
            @click="handleQyClose"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页器 -->
      <div class="hanggao">
        <el-row
          class="fenyeqi"
          type="flex"
          justify="center"
        >
          <el-pagination
            :current-page="obj.page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="obj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="activetotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-row>
      </div>
    </div>
    <VehicleAdd
      ref="addDialog"
      :car-type-list="carTypeList"
      @update="init"
    ></VehicleAdd>
  </div>
</template>
<script>
import VehicleAdd from '@/views/transit/components/vehicle-add.vue'
import { truckList, getCarTypeList, getDriverListByCar } from '@/api/transit'
import { getBadorGoodcarList } from '@/api/vehicleManagement.js'
export default {
  name: 'Vehicle',
  components: {
    VehicleAdd
  },
  filters: {
    filterStatus(v) {
      return v === 1 ? '启用' : '停用'
    },
    filterStatusT(v) {
      return v === 1 ? '停用' : '启用'
    }
  },
  data () {
    return {
      rowObj: {},
      driverListTwo: [],
      driverList: [],
      isShowone: false,
      isShowTwo: false,
      isShowThree: false,
      carTypeList: [],
      usenumber: 0,
      stopnumber: 0,
      totalnumber: 0,
      activetotal: 0,
      carList: [],
      obj: {
        licensePlate: null,
        page: 1,
        pageSize: 10,
        truckTypeId: '',
        workStatus: null
      },
      activetype: 'all',
      rules: {
        licensePlate: [{ }],
        truckTypeId: [{ }]
      },
      isOpen: false,
      id: ''
    }
  },
  async created() {
    // 获取车辆总数
    const { data } = await truckList(this.obj)
    this.totalnumber = +data.counts
    this.activetotal = +data.counts
    this.carList = data.items
    // 停用车辆数量
    const res = await getBadorGoodcarList(
      {
        page: 1,
        pageSize: 10,
        workStatus: 0
      })
    this.stopnumber = res.data.counts
    // 启用车辆数量
    const rest = await getBadorGoodcarList(
      {
        page: 1,
        pageSize: 10,
        workStatus: 1
      }
    )
    this.usenumber = rest.data.counts
    // 获取车辆类型下拉
    const resTr = await getCarTypeList()
    this.carTypeList = resTr.data
  },
  methods: {
    // 渲染数据一
    async init () {
      const { data } = await truckList(this.obj)
      this.carList = data.items
      this.activetotal = +data.counts
    },
    // 渲染数据二
    async initTwo () {
      const res = await getBadorGoodcarList(this.obj)
      this.activetotal = +res.data.counts
      this.carList = res.data.items
    },
    // 全部 可用 停用
    async handleisActive(type) {
      this.activetype = type // 状态管理 记录目前点击的是哪一个
      this.obj.page = 1
      this.obj.pageSize = 10
      if (type === 'all') {
        this.obj.workStatus = null
        this.init()
      } else if (type === 'can-use') {
        this.obj.workStatus = 1
        this.initTwo()
      } else {
        this.obj.workStatus = 0
        this.initTwo()
      }
    },
    // 分页器每一页显示的数量
    handleSizeChange(newpageSize) {
      this.obj.pageSize = newpageSize
      if (this.activetype === 'all') {
        this.init()
      } else {
        this.initTwo()
      }
    },
    // 分页器 页数变化渲染
    handleCurrentChange(newpage) {
      this.obj.page = newpage
      if (this.activetype === 'all') {
        this.init()
      } else {
        this.initTwo()
      }
    },
    // 查询功能
    async search () {
      this.obj.page = 1
      this.obj.pageSize = 10
      this.init()
    },
    // 重置表单
    clearform () {
      this.$refs.resetform.resetFields()
      this.obj.page = 1
      this.obj.pageSize = 10
      this.init()
    },
    // 新增车辆
    addCar () {
      this.$refs.addDialog.getOpen()
    },
    // 查看详情
    openDetail(row) {
      console.log(row)
      this.$router.push(`vehicle-detail/?id=${row.id}`)
    },
    // 配置司机 用一个变量保存点击对象
    openDriver(row) {
      this.rowObj = row
      this.isShowone = true
    },
    // 配置司机弹框 拿绑定司机列表
    async handleMessageClose () {
      this.isShowone = false
      const res = await getDriverListByCar(this.rowObj.id)
      this.driverList = res.data
      this.driverListTwo = res.data.map(item => item.name)
      this.isShowTwo = true
    },
    // 关闭弹框 初始化对象
    closeDriverpage() {
      this.rowObj = {}
      this.isShowTwo = false
    },
    // 点击跳转司机详情页
    chakanDriver(row) {
      this.$router.push(`driver-detail?id=${row.userId}`)
    },
    // 启用确认弹框
    openQy() {
      this.isShowThree = true
    },
    // 启用关闭弹框
    handleQyClose() {
      this.isShowThree = false
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 10px;
}
.vehicle /deep/ .el-table td,
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

.vehicle {
  /deep/ .el-dialog__title {
    width: 73px;
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #20232a;
    line-height: 25px;
    letter-spacing: 0px;
  }
  /deep/ .el-dialog__body {
    text-align: center;
    padding: 20px 20px 0px 20px;
  }
  .warn-img {
    width: 40px;
  }
  p {
    height: 24px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #818693;
    line-height: 24px;
  }
}

// 下拉框
/deep/ .el-select {
  width: 100%;
}
</style>

<style lang='scss' scoped>
  .startconfirm{
    width: 481px;

    }
    .startconfirm .el-message-box__header{
      padding-bottom: 4px;
    }
    .startconfirm .el-message-box__container{
      margin-bottom: 15px;
    }
    .confirm .el-message-box__status.el-icon-warning{
      left: 70px;
    }
    .confirm.el-message-box__title{
      font-size: 16px;
    }
    .confirm .el-message-box__message p {
      color: #F92D2D;
      margin-top: 5px;
    }
    .confirm .el-message-box__btns{
      text-align: center;
      margin-top: 10px;
    }
    .dashboard-container{
      width: 100%;
      padding: 20px;
    .first-div {
      width: 100%;
      background-color: #fff;
      height: 80px;
      padding: 20px;
    }
    .car-number {
      width: 100%;
      height: 45px;
      background-color: #fff;
      margin-top: 20px;
      display: flex;
      span {
        height: 45px;
        width: 100px;
        line-height: 45px;
        text-align: center;
        font-size: 14px;
      }
    }
    .main {
      padding: 25px;
      margin-top: 20px;
      width: 100%;
      background-color: #fff;
      .add-car{
        margin-bottom: 20px;
      }
      .yuandian{
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #e15536;
      }
      .fenyeqi{
        height: 60px;
        width: 100%;
        line-height: 100px;
      }
      .hanggao {
        margin-top: 20px;
      }
    }
    }
    .active {
      background-color: #ffeeeb;
      color: #e15536;
    }
    .activeColor{
      background-color: #1dc779 !important;
    }
    .activeColorfont{
      color: #e03a66;
    }
    .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .messagetitle{
    display: flex;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: black;
  }
  .messagediv {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: black;
    margin-bottom: 20px;
  }
  .driverdiv{
    width: 100%;
    padding:10px 20px;
    background-color: #fff;
    .header {
      width: 100%;
      height: 120px;
      background-color: #fbfafa;
      padding:10px 40px;
      margin-bottom: 10px;
      .greenBG{
        display: inline-block;
        width: 40px;
        height: 20px;
        background-color: #37c608;
        border-radius: 10px;
        line-height: 20px;
        color: white;
      }
      .firstcolumn,
      .secondcolumn{
        display: flex;
        justify-content: space-between;
        height: 30px;
      }
    }
    .drivermain {
      width: 100%;
      display: flex;
      align-items: center;
    }
    .driverfooter{
      margin-top: 10px;
      .lineBetween{
        margin: 0 10px;
        color: #ccc;
      }
    }
  }
</style>
