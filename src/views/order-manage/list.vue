<!-- 订单管理 -->
<template>
  <div class="dashboard-container order-list customer-list-box">
    <div class="app-container">
      <el-card
        class="search-card-box"
        shadow="never"
      >
        <el-form
          ref="orderSearchFormData"
          :model="orderSearchFormData"
          label-width="80px"
        >
          <el-row :gutter="40">
            <!-- 订单编号 -->
            <el-col :span="8">
              <el-form-item
                label="订单编号:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="orderSearchFormData.id"
                  placeholder="请输入订单编号"
                />
              </el-form-item>
            </el-col>
            <!-- 订单状态 -->
            <el-col :span="8">
              <el-form-item
                label="订单状态:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-select
                  v-model="orderSearchFormData.orderStatus"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in selectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 付费状态 -->
            <el-col :span="8">
              <el-form-item
                label="付费状态:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-select
                  v-model="orderSearchFormData.PaidStatus"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in PaidStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 发件人姓名 -->
            <el-col :span="8">
              <el-form-item
                label="发件人姓名:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="orderSearchFormData.sendName"
                  placeholder="请输入发件人姓名"
                />
              </el-form-item>
            </el-col>
            <!-- 发件人电话 -->
            <el-col :span="8">
              <el-form-item
                label="发件人电话:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="orderSearchFormData.sendPhone"
                  placeholder="请输入发件人电话"
                />
              </el-form-item>
            </el-col>
            <!-- 发件人地址 -->
            <el-col :span="8">
              <el-form-item
                label="发件人地址:"
                label-width="110px"
              >
                <el-row
                  :gutter="24"
                  style="margin: 0"
                >
                  <el-col
                    :span="8"
                    style="padding: 0"
                  >
                    <el-select
                      v-model="orderSearchFormData.provinceId"
                      placeholder="请选择省"
                      clearable
                      @select="selectProvince"
                      @change="isSelCity"
                    >
                      <el-option
                        v-for="item in ProvinceList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                  <el-col
                    :span="8"
                    style="padding: 0 4px"
                  >
                    <el-select
                      v-model="orderSearchFormData.city"
                      clearable
                      placeholder="请选择市"
                      @select="selectCity"
                      @change="isSelDistrict"
                    >
                      <el-option
                        v-for="item in CityList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                  <el-col
                    :span="8"
                    style="padding: 0"
                  >
                    <el-select
                      v-model="orderSearchFormData.senderCountyId"
                      clearable
                      placeholder="请选择区"
                      @select="selectDistrict"
                    >
                      <el-option
                        v-for="item in DistrictList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <!-- 收件人姓名 -->
            <el-col :span="8">
              <el-form-item
                label="收件人姓名:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="orderSearchFormData.receiverName"
                  placeholder="请输入收件人姓名"
                />
              </el-form-item>
            </el-col>
            <!-- 收件人电话 -->
            <el-col :span="8">
              <el-form-item
                label="收件人电话:"
                label-width="110px"
              >
                <el-input
                  v-model="orderSearchFormData.receiverPhone"
                  placeholder="请输入收件人电话"
                />
              </el-form-item>
            </el-col>
            <!-- 收件人地址 -->
            <el-col :span="8">
              <el-form-item
                label="收件人地址:"
                label-width="110px"
              >
                <el-row
                  :gutter="24"
                  style="margin: 0"
                >
                  <el-col
                    :span="8"
                    style="padding: 0"
                  >
                    <el-select
                      v-model="orderSearchFormData.receiverProvinceId"
                      placeholder="请选择省"
                      clearable
                      @change="isreceiveSelCity"
                    >
                      <el-option
                        v-for="item in ProvinceList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                  <el-col
                    :span="8"
                    style="padding: 0 4px"
                  >
                    <el-select
                      v-model="orderSearchFormData.receiverCityId"
                      clearable
                      placeholder="请选择市"
                      @change="isreceiveSelCounty"
                    >
                      <el-option
                        v-for="item in receiverCityList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                  <el-col
                    :span="8"
                    style="padding: 0"
                  >
                    <el-select
                      v-model="orderSearchFormData.receiverCountyId"
                      clearable
                      placeholder="请选择区"
                    >
                      <el-option
                        v-for="item in receiverDistrictList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <!-- 按钮 -->
            <el-col
              :span="8"
              style="padding-left:40px"
            >
              <!-- 搜索 -->
              <el-button
                type="warning"
                @click="onSearch"
              >搜索</el-button>
              <!-- 重置 -->
              <el-button
                plain
                class="reset-btn"
                @click="resetForm('orderSearchFormData')"
              >重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <div
        style="margin-top: 20px"
      >
        <el-card
          shadow="never"
        >
          <!-- <div
            v-show="(!dataList || dataList.length <= 0)"
            slot="empty"
          >
            <img
              src="@/icons/pic-kong@2x.png"
              alt="img"
              style="margin-top: 20px;width: 14%;height: 14%;"
            >
            <p
              style="
          margin-top: -20px;
          padding-bottom: 0px;
          "
            >这里空空如也</p>
          </div> -->
          <el-table
            :data="dataList"
            fit
            style="width: 100%"
            stripe
          >
            <el-card
              slot="empty"
              shadow="never"
            >
              <empty></empty>
            </el-card>
            <el-table-column
              prop="taskRejectionDispatch"
              label="序号"
              width="70"
              type="index"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.$index +
                    (orderSearchFormData.page - 1) *
                    orderSearchFormData.pageSize +
                    1
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="订单编号"
              width="170"
            >
            </el-table-column>
            <el-table-column
              prop="transportOrder.id"
              label="运单编号"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="下单时间"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="订单状态"
              width="90"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.status == 23000">待取件</span>
                <span v-if="scope.row.status == 23001">已取件</span>
                <span v-if="scope.row.status == 23005">运输中</span>
                <span v-if="scope.row.status == 23008">派送中</span>
                <span v-if="scope.row.status == 23009">已签收</span>
                <span v-if="scope.row.status == 23010">拒收</span>
                <span v-if="scope.row.status == 23011">已取消</span>
                <span v-if="scope.row.status == 0">全部</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="senderName"
              label="发件人姓名"
              width="90"
            >
            </el-table-column>
            <el-table-column
              prop="senderPhone"
              label="发件人电话"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="senderAddress"
              label="发件人地址"
              width="200"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.senderProvince.name }}&nbsp;{{ scope.row.senderCity.name }} &nbsp;{{ scope.row.senderCounty.name }} &nbsp;{{ scope.row.senderAddress }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="receiverName"
              label="收件人姓名"
              width="100"
            >

            </el-table-column>
            <el-table-column
              prop="receiverPhone"
              label="收件人电话"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="receiverAddress"
              label="收件人地址"
              width="200"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.receiverProvince.name }}&nbsp;{{ scope.row.receiverCity.name }} &nbsp;{{ scope.row.receiverCounty.name }} &nbsp;{{ scope.row.receiverAddress }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="pickupType"
              label="取件类型"
              width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.pickupType === 0 ? '上门取件' : '到店已付' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="paymentMethod"
              label="付费类型"
              width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.paymentMethod === 2 ? '到付' : '预结' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="paymentStatus"
              label="付费状态"
              width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.paymentStatus === 0 ? '已付' : '未付' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="85"
            >
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="handleOrderDetail(scope.row.id)"
                >查看详情</el-link>
              </template>
            </el-table-column>
          </el-table>
          <template>
            <div class="pagination">
              <el-pagination
                :page-sizes="[5, 8, 10, 15]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import city from '@/api/city.json'
import list from '@/api/orderstatus.json'
import { orderList } from '@/api/order'
import { areaList } from '@/api/common'
export default {
  name: 'ListPage',
  data() {
    return {
      PaidStatus: [
        {
          id: 1,
          name: '未付款'
        },
        {
          id: 2,
          name: '已付款'
        }
      ],
      total: 0,
      city: '',
      dataList: [], // 当前表格数据
      selectList: '',
      orderSearchFormData: {
        receiverPhone: '',
        receiverName: '',
        sendPhone: '',
        sendName: '',
        PaidStatus: this.PaidStatus,
        orderStatus: '',
        page: 1,
        pageSize: 5,
        id: '',
        orderId: '', // 订单id
        province: '',
        senderCountyId: '',
        receiverProvinceId: '', // 收件人省份
        receiverCityId: '', // 收件人城市
        receiverCountyId: '' // 收件人区

      },
      ProvinceList: [], // 省份
      CityList: [], // 城市
      DistrictList: [], // 区
      receiverProvinceList: [], // 省份
      receiverCityList: [], // 城市
      receiverDistrictList: [] // 区
    }
  },
  created() {
    this.getList()
    // 获取行政区域简要信息列表
    this.getareaList()
  },
  methods: {
    // 获取订单列表数据
    async getList() {
      console.log(city[0])
      // this.orderSearchFormData.province = city.filter(item => item.)
      // 获取下拉菜单数据
      this.selectList = list
      this.orderSearchFormData.ddztId = list
      const params = { ...this.orderSearchFormData }
      const { data: res } = await orderList(params)
      this.dataList = res.items
      // 获取总条数
      this.total = +res.counts
    },
    // 订单详情
    handleOrderDetail(id) {
      this.$router.push({
        path: '/business/edit-order',
        query: { id: id }
      })
    },
    resetForm(orderSearchFormData) {
      this.orderSearchFormData = {
        page: 1,
        pageSize: 10,
        id: '',
        orderId: '' // 订单id
      }
    },
    // 获取省id
    selectProvince(val) {
      this.orderSearchFormData.provinceId = val.id
    },
    // 获取市id
    selectCity(val) {
      if (this.orderSearchFormData.provinceId !== 0) {
        this.orderSearchFormData.cityId = val.id
      }
    },
    // 获取区id
    selectDistrict(val) {
      this.orderSearchFormData.districtId = val.id
    },
    // 获取行政区域简要信息列表
    async getareaList() {
      const res = await areaList()
      this.ProvinceList = res.data
    },
    // 当选择省份之后显示城市
    async isSelCity() {
      const res = await areaList({ parentId: this.orderSearchFormData.provinceId })
      this.CityList = res.data
    },
    async isSelDistrict() {
      const res = await areaList({ parentId: this.orderSearchFormData.city })
      this.DistrictList = res.data
    },
    async isreceiveSelCity() {
      const res = await areaList({ parentId: this.orderSearchFormData.receiverProvinceId })
      this.receiverCityList = res.data
    },
    async isreceiveSelCounty() {
      const res = await areaList({ parentId: this.orderSearchFormData.receiverCityId })
      this.receiverDistrictList = res.data
    },
    // 搜索
    async onSearch() {
      const res = await orderList({
        amount: '',
        createTime: '',
        estimatedArrivalTime: '',
        id: this.orderSearchFormData.id,
        memberId: '',
        orderType: '',
        page: 1,
        pageSize: 10,
        paymentMethod: '',
        paymentStatus: this.orderSearchFormData.PaidStatus,
        pickupType: '',
        receiverAddress: '',
        receiverCityId: this.orderSearchFormData.receiverCityId,
        receiverCountyId: this.orderSearchFormData.receiverCountyId,
        receiverName: this.orderSearchFormData.receiverName,
        receiverPhone: this.orderSearchFormData.receiverPhone,
        receiverProvinceId: this.orderSearchFormData.receiverProvinceId,
        senderAddress: '',
        senderCityId: this.orderSearchFormData.city,
        senderCountyId: this.orderSearchFormData.senderCountyId,
        senderName: this.orderSearchFormData.sendName,
        senderPhone: this.orderSearchFormData.sendPhone,
        senderProvinceId: this.orderSearchFormData.provinceId,
        status: this.orderSearchFormData.orderStatus
      })
      this.dataList = res.data.items
    },
    handleSizeChange(pageSize) {
      this.orderSearchFormData.pageSize = pageSize
      this.getList()
    },
    handleCurrentChange(page) {
      this.orderSearchFormData.page = page
      this.getList()
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
  justify-content: center;
  display: -webkit-box;
  -webkit-box-pack: center;
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
::v-deep .el-pager li.active {
  color: #e15536;
}
</style>
