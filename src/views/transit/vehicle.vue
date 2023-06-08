<!-- 车辆列表 -->
<template>
  <div class="dashboard-container vehicle customer-list-box">
    <div class="first-div">
      <!-- 车辆类型表单 -->
      <el-form
        :inline="true"
        :model="obj"
        class="demo-form-inline"
        style="width: 100%;"
      >
        <el-form-item
          label="车辆类型"
          style="width: 30%;"
        >
          <el-select
            v-model="obj.truckTypeId"
            placeholder="请选择"
            style="width: 400px;"
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
          label="车牌号码"
          style="width: 30%;"
        >
          <el-input
            v-model="obj.licensePlate"
            style="width: 400px;"
            placeholder="请输入车牌号码"
          ></el-input>

        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 90px;"
            type="primary"
            @click="search"
          >查询</el-button>
          <el-button
            style="width: 90px;"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 车辆数量 -->
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
        <el-button type="primary">新增车辆</el-button>
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
            width="50"
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
            <el-button type="text">查看详情</el-button>
            <el-button type="text">启用</el-button>
            <el-button type="text">配置司机</el-button>
          </el-table-column>
        </el-table>
      </div>
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
  </div>
</template>
<script>
import { truckList, getCarTypeList } from '@/api/transit'
import { getBadorGoodcarList } from '@/api/vehicleManagement.js'
export default {
  name: 'Vehicle',
  filters: {
    filterStatus(v) {
      return v === 1 ? '启用' : '停用'
    }
  },
  data () {
    return {
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
      activetype: 'all'
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
    // console.log(resTr)
    this.carTypeList = resTr.data
  },
  methods: {
    // 渲染数据一
    async init () {
      const { data } = await truckList(this.obj)
      this.totalnumber = +data.counts
      this.carList = data.items
      this.activetotal = +data.counts
    },
    // 渲染数据二
    async initTwo () {
      const res = await getBadorGoodcarList(this.obj)
      this.activetotal = +res.data.counts
      this.carList = res.data.items
      if (this.activetype === 'can-use') {
        this.usenumber = res.data.counts
      } else {
        this.stopnumber = res.data.counts
      }
    },
    async handleisActive(type) {
      this.activetype = type
      this.obj.page = 1
      this.obj.pageSize = 10
      this.obj.workStatus = null
      this.obj.licensePlate = null
      this.obj.truckTypeId = ''
      if (type === 'all') {
        this.init()
      } else if (type === 'can-use') {
        this.obj.workStatus = 1
        this.initTwo()
      } else {
        this.obj.workStatus = 0
        this.initTwo()
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleSizeChange(newpageSize) {
      this.obj.pageSize = newpageSize
      if (this.activetype === 'all') {
        this.init()
      } else {
        this.initTwo()
      }
    },
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
      this.obj.workStatus = null
      const { data } = await truckList(this.obj)
      this.carList = data.items
      this.activetotal = +data.counts
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
    .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table__cell {
    height: 35px;
  }

</style>
