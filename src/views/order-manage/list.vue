<!-- 订单管理 -->
<template>
  <div class="dashboard-container order-list customer-list-box big_box">
    <!-- 表单 -->
    <el-card class="box_card">
      <el-form
        label-width="100px"
        :model="form"
      >
        <el-row :gutter="40">
          <!-- 第一行 -->
          <el-col :span="8">
            <el-form-item
              label="订单编号："
            >
              <el-input
                v-model.trim="form.id"
                placeholder="请输入订单编号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态：">
              <el-select
                v-model="form.status"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in orderstatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付费状态：">
              <el-select
                v-model="form.paymentStatus"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in payment"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 第二行 -->
          <el-col :span="8">
            <el-form-item label="发件人姓名：">
              <el-input
                v-model.trim="form.senderName"
                placeholder="请输入发件人姓名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发件人电话：">
              <el-input
                v-model.trim="form.senderPhone"
                placeholder="请输入发件人电话"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发件人地址：">
              <el-select
                ref="sendProvince"
                v-model="form.senderProvinceId"
                placeholder="请选择"
                style="width:90px"
                clearable
                @change="sendProvinceChange()"
              >
                <el-option
                  v-for="item in list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-select
                ref="sendcity"
                v-model="form.senderCityId"
                placeholder="请选择"
                style="width:90px;margin:0 5px"
                clearable
                @change="sendCityChange()"
              >
                <el-option
                  v-for="item in sendCityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-select
                ref="sendcounty"
                v-model="form.senderCountyId"
                placeholder="请选择"
                style="width:90px"
                clearable
              >
                <el-option
                  v-for="item in sendCountyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item></el-col>

          <!-- 第三行 -->
          <el-col :span="8">
            <el-form-item label="收件人姓名：">
              <el-input
                v-model.trim="form.receiverName"
                placeholder="请输入收件人姓名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件人电话：">
              <el-input
                v-model.trim="form.receiverPhone"
                placeholder="请输入收件人电话"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件人地址：">
              <el-select
                v-model="form.receiverProvinceId"
                placeholder="请选择"
                style="width:90px"
                clearable
                @change="receiveProvinceChange()"
              >
                <el-option
                  v-for="item in list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="form.receiverCityId"
                placeholder="请选择"
                style="width:90px;margin:0 5px"
                clearable
                @change="receiveCityChange()"
              >
                <el-option
                  v-for="item in sendCityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="form.receiverCountyId"
                placeholder="请选择"
                style="width:90px"
                clearable
              >
                <el-option
                  v-for="item in sendCountyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button
              type="warning"
              @click="orderSearch"
            >搜索</el-button>
            <el-button
              plain
              @click="resetForm"
            >重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <div v-loading="loading">
      <el-card style="margin-top: 10px;margin-bottom:50px;padding:20px 0">
        <el-table
          :data="tableData"
          border
          style="width: 100%;overflow:hidden"
        >
          <!--  <div
            v-show="(!tableData || tableData.length <= 0) && !loading "
            slot="empty"
          >
            <img
              src="@/icons/pic-kong@2x.png"
              alt="img"
              style="margin-top: 20px;width: 25%;height: 25%;"
            >
            <p
              style="margin-top: -20px;padding-bottom: 0px"
            >这里空空如也</p>
          </div> -->
          <el-card
            v-show="(!tableData || tableData.length <= 0) && !loading"
            slot="empty"
            class="table-empty-box"
            shadow="never"
          >
            <empty></empty>
          </el-card>
          <el-table-column
            fixed
            label="序号"
            width="60"
            type="index"
            :index="indexMethod"
          >
          </el-table-column>
          <el-table-column
            label="订单编号"
            width="180"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            label="运单编号"
            width="150"
            prop="transportOrder.id"
          >
          </el-table-column>
          <el-table-column
            label="下单时间"
            width="150"
            prop="estimatedStartTime"
          >
          </el-table-column>
          <el-table-column
            label="订单状态"
            width="80"
            prop="status"
          >
            <template #default="{row}">
              {{ status(row.status) }}
            </template>
          </el-table-column>
          <el-table-column
            label="发件人姓名"
            width="120"
            prop="senderName"
          >
          </el-table-column>
          <el-table-column
            label="发件人电话"
            width="120"
            prop="senderPhone"
          >
          </el-table-column>
          <el-table-column
            label="发件人地址"
            width="160"
            prop="senderProvince.name,senderCity.name,senderCounty.name,senderAddress"
          >
            <template #default="{row}">
              {{ row.senderProvince.name }} {{ row.senderCity.name }} {{ row.senderCounty.name }} {{ row.senderAddress }}
            </template>
          </el-table-column>
          <el-table-column
            label="收件人姓名"
            width="120"
            prop="receiverName"
          >
          </el-table-column>
          <el-table-column
            label="收件人电话"
            width="120"
            prop="receiverPhone"
          >
          </el-table-column>
          <el-table-column
            label="收件人地址"
            width="160"
            prop="receiverProvince.name,receiverCity.name,receiverCounty.name,receiverAddress"
          >
            <template #default="{row}">
              {{ row.receiverProvince.name }} {{ row.receiverCity.name }} {{ row.receiverCounty.name }} {{ row.receiverAddress }}
            </template>
          </el-table-column>
          <el-table-column
            label="取件类型"
            width="100"
            prop="pickupType"
          >
            <template #default="{row}">
              {{ row.pickupType===1?"网点自寄":"上门取件" }}
            </template>
          </el-table-column>
          <el-table-column
            label="付费类型"
            width="80"
            prop="paymentMethod"
          >
            <template #default="{row}">
              {{ row.paymentMethod===1?"预结":"到付" }}
            </template>
          </el-table-column>
          <el-table-column
            label="付费状态"
            width="80"
            prop="paymentStatus"
          >
            <template #default="{row}">
              {{ row.pickupType===1?"未付":"已付" }}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{row}">
              <el-button
                type="text"
                size="small"
                @click="handleClick(row)"
              >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page="Number(form.page)"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="Number(form.current)"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="margin-left:300px;margin-top:15px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>
<script>
import orderstatus from '@/api/orderstatus.json' // 订单状态
import payment from '@/api/paymentstatus.json' // 付费状态
// import pickupstatus from '@/api/pickupstatus.json' // 取件类型
// import list from '@/api/city.json'
import { orderList, orderDetail } from '@/api/order'
import { areaList } from '@/api/common'
export default {
  data() {
    return {
      // 枚举
      orderstatus, // 订单状态
      payment, // 付费状态
      list: [], // 总省城区数据/*
      sendCityList: [], // 市数组
      sendCountyList: [], // 县数组
      // form表单
      form: {
        id: '',
        page: 1,
        pageSize: 10,
        status: null, // 订单状态内容
        pickUpType: '',
        paymentStatus: null, // 付费状态内容
        senderName: '',
        senderPhone: '',
        senderProvinceId: '', // 发件人省id
        senderCityId: '', // 发件人城市ID
        senderCountyId: '', // 发件人区域id
        receiverName: '',
        receiverPhone: '',
        receiverProvinceId: '', // 收件人省id
        receiverCityId: '', // 收件人城市ID
        receiverCountyId: ''// 收件人起区域id
      },
      tableData: [],
      total: 0, // 总数据,
      loading: false
    }
  },
  created() {
    this.orderListData()
    this.areaListApi()
  },
  methods: {
    // 订单状态
    status(id) {
      return orderstatus.find(item => item.id === id).name
    },
    // 获取所有省
    async areaListApi() {
      const { data } = await areaList({ parentId: 0 })
      this.list = data
    },
    // 自定义下表
    indexMethod(index) {
      return (this.form.page - 1) * this.form.pageSize + index + 1
    },
    // 页容量变化后
    handleSizeChange(val) {
      this.form.pageSize = val
      this.orderListData()
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.form.page = val
      this.orderListData()
    },
    // 表单数据
    async orderListData() {
      this.loading = true
      const { data } = await orderList(this.form)
      console.log(data)
      this.tableData = data.items
      this.total = +data.counts
      this.loading = false
    },
    // ?************************************************发送省市县数据
    // 省数据变化(参数省市县value)
    async sendProvinceChange() {
      // 清空市数据
      this.sendCityList = []
      this.form.senderCityId = ''
      this.form.senderCountyId = ''
      const { data } = await areaList({ parentId: this.form.senderProvinceId })
      this.sendCityList = data
    },
    // 市数据变化
    async sendCityChange() {
      // 清空区县数据和表单内value
      this.sendCountyList = []
      this.form.senderCountyId = ''
      const { data } = await areaList({ parentId: this.form.senderCityId })
      this.sendCountyList = data
    },
    // ?************************************************接收省市县数据
    // 省数据变化(参数省市县value)
    async receiveProvinceChange() {
      // 清空市数据
      this.sendCityList = []
      this.form.receiverCityId = ''
      this.form.receiverCountyId = ''
      // this.sendcity = ''
      const { data } = await areaList({ parentId: this.form.receiverProvinceId })
      this.sendCityList = data
    },
    // 市数据变化
    async receiveCityChange() {
      // 清空区县数据和表单内value
      this.sendCountyList = []
      this.form.receiverCountyId = ''
      const { data } = await areaList({ parentId: this.form.receiverCityId })
      this.sendCountyList = data
    },
    // 重置数据
    resetForm() {
      this.form = {
        page: 1,
        pageSize: 10,
        status: '', // 订单状态内容
        paymentStatus: '', // 付费状态内容
        senderName: '',
        senderPhone: '',
        senderProvinceId: '', // 发件人省id
        senderCityId: '', // 发件人城市ID
        senderCountyId: '', // 发件人起区域id
        receiverName: '',
        receiverPhone: '',
        receiverProvinceId: '', // 收件人省id
        receiverCityId: '', // 收件人城市ID
        receiverCountyId: ''// 收件人起区域id
      }
      this.orderSearch()
    },
    // 搜索表格数据
    async orderSearch() {
      this.form.page = 1
      this.orderListData()
    },
    // 查看详情
    async handleClick(row) {
      // console.log(row)
      const { data } = await orderDetail(row.id)
      console.log(data)
      // 复杂类型传值，需要JSON.stringify（），否则子组件刷新会丢失
      const list = JSON.stringify(data)
      this.$router.push({
        path: '/business/edit-order',
        query: {
          orderId: row.id,
          status: row.status,
          pickUpType: row.pickUpType,
          list
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 40px;
}

// 下拉框
/deep/ .el-select {
  width: 100%;
}
</style>

<style lang="scss" scoped>
.order-list /deep/ .el-table td,
.el-table th {
  padding: 12px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  overflow: hidden;
}
.box_card{
  padding: 12px 0;
}
.big_box{
  padding: 0 20px;
}
// input框前文字设置
/deep/ .el-form-item__label{
  color: #333;
  font-weight: 400;
  font-size: 14px;
  padding: 0;
}
</style>
