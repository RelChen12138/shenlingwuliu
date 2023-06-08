<!-- 订单详情 -->
<template>
  <div class="dashboard-container edit-order">
    <div class="app-container">
      <el-card
        shadow="never"
        class="order-box"
      >
        <el-row
          :gutter="20"
          justify="center"
        >
          <el-col :span="6">
            <div class="ddbh">
              订单编号：
              <label>{{ orderDetailShow.id }}</label>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="ydbh">
              运单编号：
              <label>{{ orderDetailShow.transportOrder?orderDetailShow.transportOrder.id:'--' }}</label>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="xdsj">
              下单时间：
              <label>{{ orderDetailShow.createTime }}</label>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="ddzt">
              订单状态：
              <label v-if="orderDetailShow.status == ' 23000'">待取件</label>
              <label
                v-else-if="orderDetailShow.status == '23001'"
              >已取件</label>
              <label
                v-else-if="orderDetailShow.status == '23003'"
              >网点入库</label>
              <label
                v-else-if="orderDetailShow.status == '23004'"
              >待装车</label>
              <label
                v-else-if="orderDetailShow.status == '23005'"
              >运输中</label>
              <label
                v-else-if="orderDetailShow.status == '23006'"
              >网点出库</label>
              <label
                v-else-if="orderDetailShow.status == '23007'"
              >待派送</label>
              <label
                v-else-if="orderDetailShow.status == '23008'"
              >派送中</label>
              <label
                v-else-if="orderDetailShow.status == '23009'"
              >已签收</label>
              <label
                v-else-if="orderDetailShow.status == '23010'"
              >拒收</label>
              <label v-else>已取消</label>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="yjddrq">
              预计到达日期：
              <label>{{ orderDetailShow.estimatedArrivalTime }}</label>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <!-- 基本信息 -->
      <el-collapse
        v-model="activeNames"
        style="margin-top: 20px; border: none"
      >
        <el-collapse-item name="1">
          <template slot="title">
            <div class="collapse-detail">基本信息</div>
          </template>
          <div class="block">
            <el-timeline>
              <div class="line"></div>
              <div
                class="pake-info"
                style="margin-top: 10px"
              >
                <img
                  class="img-info1"
                  src="../../assets/fahuo.png"
                  alt=""
                />
                <span>发货方</span>
              </div>
              <div style="margin-top: 0px; margin-left: 40px; display: flex">
                <div style="">
                  <div class="demo-input-suffix base-info">
                    发货方姓名：
                    <span>{{ orderDetailShow.senderName }}</span>
                  </div>

                  <div class="demo-input-suffix base-info">
                    发货方地址：
                    <span>{{
                      orderDetailShow.senderProvince.name +
                        orderDetailShow.senderCity.name +
                        orderDetailShow.senderCounty.name
                    }}</span>
                  </div>
                </div>
                <div style="margin-left: 174px">
                  <div class="demo-input-suffix base-info">
                    发货方电话：

                    <span>{{ orderDetailShow.senderPhone }}</span>
                  </div>
                  <div class="demo-input-suffix base-info">
                    &nbsp;&nbsp;&nbsp;详细地址：

                    <span>{{ orderDetailShow.senderAddress }}</span>
                  </div>
                </div>
              </div>
              <div
                class="pake-info"
                style="margin-top: 20px"
              >
                <img
                  class="img-info2"
                  src="../../assets/shouhuo.png"
                  alt=""
                />
                <span
                  style="display: inline-block; margin-top: 6px"
                >收货方</span>
              </div>
              <div style="margin-top: 0px; margin-left: 40px; display: flex">
                <div style="">
                  <div class="demo-input-suffix base-info">
                    收货方姓名：
                    <span>{{ orderDetailShow.receiverName }}</span>
                  </div>

                  <div class="demo-input-suffix base-info">
                    收货方地址：
                    <span>{{
                      orderDetailShow.receiverProvince.name +
                        orderDetailShow.receiverCity.name +
                        orderDetailShow.receiverCounty.name
                    }}</span>
                  </div>
                </div>
                <div style="margin-left: 174px">
                  <div class="demo-input-suffix base-info">
                    收货方电话：
                    <span>{{ orderDetailShow.receiverPhone }}</span>
                  </div>
                  <div class="demo-input-suffix base-info">
                    &nbsp;&nbsp;&nbsp;详细地址：
                    <span>{{ orderDetailShow.receiverAddress }}</span>
                  </div>
                </div>
              </div>
              <div
                class="pake-info"
                style="margin-top: 20px"
              >
                <img
                  class="img-info2"
                  src="../../assets/juli.png"
                  alt=""
                />
                <span
                  style="display: inline-block; margin-top: 6px"
                >距离:<span style="font-size: 12px"> {{ orderDetailShow.distance }}</span></span>
              </div>
              <div
                class="pake-info"
                style="margin-top: 20px"
              >
                <!-- <img
                  class="img-info2"
                  src="../../assets/juli.png"
                  alt=""
                /> -->
                <span
                  style="display: inline-block; margin-top: 6px;margin-left:30px"
                >备注：暂无</span>
              </div>
            </el-timeline>
          </div>

        </el-collapse-item>
      </el-collapse>
      <!-- 订单跟踪 -->
      <el-collapse
        v-if="orderDetailShow.transportOrder"
        v-model="activeNames"
        class="customer-table-box"
        style="margin-top: 20px; margin-bottom: 40px"
      >
        <el-collapse-item name="4">
          <template slot="title">
            <div class="collapse-detail">订单跟踪</div>
          </template>
        </el-collapse-item>
      </el-collapse>
      <!-- 订单轨迹 -->
      <el-collapse
        v-if="orderDetailShow.transportOrder"
        v-model="activeNames"
        class="customer-table-box"
        style="margin-top: 20px; margin-bottom: 40px"
      >
        <el-collapse-item name="4">
          <template slot="title">
            <div class="collapse-detail">订单轨迹</div>
          </template>
          <div style="box-sizing: border-box">
            <showOrderMapsDialog
              :title-info="titleInfo"
              :form-base="formData"
            />
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 取件信息 -->
      <el-collapse
        v-model="activeNames"
      >
        <el-collapse-item
          title="取件信息"
          name="2"
        >
          <el-row
            type="flex"
            justify="center"
            style="margin-bottom: 10px;font-size: 14px;"
          >
            <el-col style="padding-right: 12px;">
              所在网点：
              <!-- {{ orderDetailShow.taskPickup.agency.name }} -->
              {{ agencyName }}
            </el-col>
            <el-col
              v-if=" orderDetailShow.pickupType === 1"
              style="padding-left: 12px;padding-right: 12px;"
            >取件类型：
              网点自取
            </el-col>
            <el-col
              v-else-if=" orderDetailShow.pickupType === 2"
              style="padding-left: 12px;padding-right: 12px;"
            >取件类型：
              上门取件
            </el-col>
            <el-col
              v-else
              style="padding-left: 12px;padding-right: 12px;"
            >取件类型：
              上门取件
            </el-col>
            <!-- <el-col
              v-if=" orderDetailShow.taskPickup.status === 1"
              style="padding-left: 12px;padding-right: 12px;"
            >作业状态：新任务
            </el-col>
            <el-col
              v-else-if=" orderDetailShow.taskPickup.status === 2"
              style="padding-left: 12px;padding-right: 12px;"
            >作业状态：新任务
            </el-col>
            <el-col
              v-else
              style="padding-left: 12px;padding-right: 12px;"
            >作业状态：已取消
            </el-col> -->
            <el-col style="padding-left: 12px;padding-right: 12px;">取件快递员：
              <!-- {{ orderDetailShow.taskPickup.courier.name }} -->
              {{ name }}
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="center"
            style="font-size: 14px;"
          >
            <el-col style="">快递员电话：{{ mobile }}</el-col>
            <el-col style="margin-left: 8px;">预计取件时间：
              {{ taskPickupEstimatedEndTime }}
            </el-col>
            <el-col style="margin-left: 8px;">取件完成时间：
              {{ taskPickupestimatedStartTime }}
            </el-col>
            <el-col />
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <!-- 派送信息 -->
      <el-collapse
        v-if="orderDetailShow.transportOrder"
        v-model="activeNames"
      >
        <el-collapse-item
          title="派送信息"
          name="7"
        >
          <el-row
            type="flex"
            justify="center"
            style="margin-bottom: 10px;font-size: 14px;"
          >
            <el-col style="padding-right: 12px;">
              所在网点：
              <!-- {{ orderDetailShow.taskDispatch.agency.name }} -->
              {{ disName }}
            </el-col>
            <el-col
              v-if=" orderDetailShow.taskDispatch.status === 1"
              style="padding-left: 12px;padding-right: 12px;"
            >作业状态：新任务
            </el-col>
            <el-col
              v-else-if=" orderDetailShow.taskDispatch.status === 2"
              style="padding-left: 12px;padding-right: 12px;"
            >作业状态：已完成
            </el-col>
            <el-col
              v-else
              style="padding-left: 12px;padding-right: 12px;"
            >作业状态：已取消
            </el-col>
            <el-col style="padding-left: 12px;padding-right: 12px;">取件快递员：
              <!-- {{ orderDetailShow.taskPickup.courier.name }} -->
              {{ disPathName }}
            </el-col>
            <el-col style="">快递员电话：{{ disMobile }}</el-col>
          </el-row>
          <el-row
            type="flex"
            justify="center"
            style="font-size: 14px;"
          >
            <el-col style="margin-left: 0px;">预计取件时间：
              {{ taskDispatchEstimatedEndTime }}
            </el-col>
            <el-col style="margin-left: -155px;">取件完成时间：
              {{ taskDispatchEstimatedStartTime }}
            </el-col>
            <el-col />
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <!-- 费用信息 -->
      <el-collapse
        v-model="activeNames"
        style="margin-top: 20px; border: none"
      >
        <el-collapse-item name="1">
          <template slot="title">
            <div class="collapse-detail">费用信息</div>
          </template>
          <div style="margin-top: 0px;margin-bottom: 30px; margin-left: 40px; display: flex">
            <div style="">
              <div class="demo-input-suffix base-info">
                运费：
                <span
                  style="font-size: 18px;
                  color: #ffb302;
                  margin-right: 10px;"
                >{{ orderDetailShow.amount }}</span>
              </div>
            </div>
            <div style="margin-left: 174px">
              <div class="demo-input-suffix base-info">
                支付方式：
                <template>
                  <span v-if="orderDetailShow.paymentMethod == 1">预结</span>
                  <span v-else-if="orderDetailShow.paymentMethod==2">到付</span>
                </template>
                <!-- <span>{{ orderDetailShow.paymentStatus }}</span> -->
              </div>
            </div>
            <div style="margin-left: 174px ">
              <div class="demo-input-suffix base-info">
                付款状态：
                <template>
                  <span v-if="orderDetailShow.paymentStatus == 1">未付</span>
                  <span v-else-if="orderDetailShow.paymentStatus == 2">已付</span>
                </template>
                <!-- <span>{{ orderDetailShow.paymentMethod }}</span> -->
              </div>
            </div>
          </div></el-collapse-item>
      </el-collapse>
      <!-- 货品信息 -->
      <el-collapse
        v-model="activeNames"
        class="customer-table-box"
        style="margin-top: 20px; margin-bottom: 40px"
      >
        <el-collapse-item name="3">
          <template slot="title">
            <div class="collapse-detail">货品信息</div>
          </template>
          <div style="box-sizing: border-box">
            <el-table
              :data="propTableData.col"
              style="width: 100%"
              stripe
              :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
            >
              <div
                v-show="
                  (!propTableData.col || propTableData.col.length <= 0)
                "
                slot="empty"
              >
                <img
                  src="@/icons/pic-kong.png"
                  alt="img"
                  style="margin-top: 20px; width: 25%; height: 25%"
                />
                <p style="margin-top: -10px; padding-bottom: 10px">
                  这里空空如也
                </p>
              </div>
              <el-table-column
                label="序号"
                type="index"
                align="left"
                width="60"
              />
              <el-table-column label="货品名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.name || '--' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="货品类型">
                <template slot-scope="scope">
                  <span>{{
                    scope.row.goodsType === null
                      ? '--'
                      : scope.row.goodsType.name
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="重量（千克）">
                <template slot-scope="scope">
                  <span>{{ scope.row.totalWeight || '--' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="体积（立方）">
                <template slot-scope="scope">
                  <span>{{ scope.row.totalVolume || '--' }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import showOrderMapsDialog from './components/show-order-maps.vue'
import { orderDetail } from '@/api/order'
export default {
  components: {
    showOrderMapsDialog
  },
  data() {
    return {
      taskDispatchEstimatedEndTime: '',
      taskDispatchestimatedStartTime: '',
      taskPickupEstimatedEndTime: '',
      taskPickupestimatedStartTime: '',
      disMobile: '',
      disName: '',
      mobile: '',
      name: '',
      disPathName: '', // 取件员
      agencyName: '',
      // 地图相关
      formData: {
        startLat: '',
        startLng: '',
        endLat: '',
        endLng: ''
      },
      // 地图相关
      titleInfo: {
        pageTitle: '',
        text: ''
      },
      orderDetailShow: {
        receiverCounty: '',
        receiverCity: '',
        receiverProvince: '',
        senderProvince: '',
        senderCity: '',
        senderCounty: ''
      },
      activeNames: ['1', '2', '3', '4', '5', '6', '7'],
      propTableData: {
        col: []
      },
      wayId: ''

    }
  },
  created() {
    this.wayId = this.$route.query.id
    this.getList(this.wayId)
  },
  methods: {
    // 获取运单详情
    async getList(wayId) {
      const { data } = await orderDetail(wayId)
      this.orderDetailShow = data
      console.log(data)

      this.taskPickupEstimatedEndTime = this.orderDetailShow.taskPickup.estimatedEndTime
      this.taskPickupestimatedStartTime = this.orderDetailShow.taskPickup.estimatedStartTime
      console.log('------------', this.orderDetailShow.taskPickup.estimatedEndTime)
      this.agencyName = this.orderDetailShow.taskPickup.agency.name
      this.name = this.orderDetailShow.taskPickup.courier.name
      this.mobile = this.orderDetailShow.taskPickup.courier.mobile

      if (this.orderDetailShow.taskDispatch) {
        this.disName = this.orderDetailShow.taskDispatch.agency.name
        this.disPathName = this.orderDetailShow.taskDispatch.courier.name
        this.disMobile = this.orderDetailShow.taskDispatch.courier.mobile
        this.taskDispatchEstimatedEndTime = this.orderDetailShow.taskDispatch.estimatedEndTime
        this.taskDispatchestimatedStartTime = this.orderDetailShow.taskDispatch.estimatedStartTime
      }

      // this.receiverProvince = this.orderDetailShow.receiverProvince.name
      // this.receiverCity = this.orderDetailShow.receiverCity.name
      // this.receiverCounty = this.orderDetailShow.receiverCounty.name
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './index.scss'
</style>

