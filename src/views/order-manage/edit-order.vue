<!-- 订单详情 -->
<template>
  <div class="dashboard-container edit-order">
    <el-card style="margin:20px 20px 0">
      <el-form label-width="120px">
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item
              label="订单编号："
              label-width="100px"
            >
              <el-input
                v-model="$route.query.orderId"
                style="width:200px;"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="运单编号："
            >
              <!-- list.transportOrder.id -->
              <el-input
                v-model="transportOrder"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="下单时间："
            >
              <el-input
                v-model="list.createTime"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="订单状态："
            >
              <el-input
                v-model="status"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="预计到达日期："
            >
              <el-input
                v-model="list.estimatedArrivalTime"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-collapse
      v-model="activeNames"
      style="padding:0 20px;margin-bottom:60px"
      @change="handleChange"
    >
      <!-- 基本信息 -->
      <el-collapse-item
        title="基本信息"
        name="1"
      >
        <el-form
          style="padding:20px 50px"
          label-width="100px"
        >
          <el-row
            :gutter="15"
          >
            <div class="send">
              <img
                class="img"
                src="../../assets/fahuo.png"
                alt=""
              />
              <span>发货方</span>
            </div>
            <div class="sendLeft">
              <el-col
                :span="8"
              >
                <el-form-item
                  label="发货方姓名："
                >
                  <el-input
                    v-model="list.senderName"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label="发货方电话："
                >
                  <el-input
                    v-model="list.senderPhone"
                    disabled
                    class="borderNone"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="发货方地址："
                >
                  <el-input
                    v-model="sendAddress"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label-width="85px"
                  label="详细地址："
                >
                  <el-input
                    v-model="list.senderAddress"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </div>
            <div class="send">
              <img
                class="img1"
                src="../../assets/shouhuo.png"
                alt=""
              />
              <span>收货方</span>
            </div>
            <div class="sendLeft">
              <el-col :span="8">
                <el-form-item
                  label="收货方姓名："
                >
                  <el-input
                    v-model="list.receiverName"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label="收货方电话："
                >
                  <el-input
                    v-model="list.receiverPhone"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="收货方地址："
                >
                  <el-input
                    v-model="receiveAddress"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label-width="85px"
                  label="详细地址："
                >
                  <el-input
                    v-model="list.senderAddress"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </div>
            <div class="send">
              <img
                class="img1"
                src="../../assets/juli.png"
                alt=""
              />
              <span>距离：{{ list.distance }}km</span>
            </div>
            <span
              class="send"
              style="margin-left:34px;margin-top:15px"
            > 备注：暂无</span>
            <!-- <el-input
              v-model="notes"
              style="width:100px"
              disabled
            ></el-input> -->
          </el-row>
        </el-form>
      </el-collapse-item>
      <!--订单跟踪  -->
      <div v-if="bool">
        <el-collapse-item
          v-if="bool"
          title="订单跟踪"
          name="2"
          style="margin-top:20px"
        >
        </el-collapse-item>
      </div>
      <!-- 订单轨迹 -->
      <div v-if="bool">
        <el-collapse-item
          v-if="bool"
          title="订单轨迹"
          name="3"
          style="margin-top:20px;"
        >
          <!-- <showOrderMaps
            :title-info="titleInfo"
            :form-base="formBase"
          ></showOrderMaps> -->
        </el-collapse-item>
      </div>
      <!-- 取件信息 -->
      <el-collapse-item
        title="取件信息"
        name="4"
        style="margin:20px 0;"
      >
        <el-form
          style="padding:20px 50px"
          label-width="110px"
        >
          <el-row
            :gutter="15"
          >
            <el-col :span="6">
              <el-form-item
                label-width="95px"
                label="所在网点："
              >
                <el-input
                  v-model="list.taskPickup.agency.name"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label-width="83px"
                label="取件类型："
              >
                <el-input
                  v-model="pickupType"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label-width="83px"
                label="作业状态："
              >
                <el-input
                  v-model="work"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="取件快递员："
              >
                <el-input
                  v-model="list.taskPickup.courier.name"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="快递员电话："
              >
                <el-input
                  v-model="list.taskPickup.courier.mobile"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="预约取件时间："
              >
                <el-input
                  v-model="list.taskPickup.estimatedStartTime"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="取件完成时间："
              >
                <el-input disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <!-- 派件信息 -->
      <div v-if="bool">
        <el-collapse-item
          v-if="bool"
          title="派件信息"
          name="5"
          style="margin-bottom:20px;"
        >
          <el-form
            style="padding:20px 50px;"
            label-width="110px"
          >
            <el-row
              :gutter="15"
            >
              <el-col :span="6">
                <el-form-item
                  label-width="85px"
                  label="所在网点："
                >
                  <el-input
                    v-model="list.taskDispatch.agency.name"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label-width="85px"
                  label="作业状态："
                >
                  <el-input
                    v-model="work"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="派送快递员："
                >
                  <el-input
                    v-model="list.taskDispatch.courier.name"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="快递员电话："
                >
                  <el-input
                    v-model="list.taskDispatch.courier.mobile"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="预约派送时间："
                >
                  <el-input
                    v-model="list.taskDispatch.estimatedStartTime"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="派送完成时间："
                >
                  <el-input
                    v-model="list.taskDispatch.actualEndTime"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </div>

      <!-- 费用信息 -->
      <el-collapse-item
        title="费用信息"
        name="6"
        style="margin-bottom:20px"
      >
        <el-form
          style="padding:20px 50px;"
        >
          <el-row
            :gutter="15"
          >
            <el-col :span="8">
              <el-form-item
                label="运费："
                label-width="60px"
              >
                <el-input
                  id="price"
                  v-model="amount"
                  style="width:25px;"
                  disabled
                ></el-input>元
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="支付方式："
                label-width="100px"
              >
                <el-input
                  v-model="paymentMethod"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="付款状态："
                label-width="100px"
              >
                <el-input
                  v-model="paymentStatus"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <!-- 货品信息 -->
      <el-collapse-item
        title="货品信息"
        name="7"
      >
        <el-card style="height:200px">
          <el-table
            :data="data"
          >
            <el-table-column
              label="序号"
              width="80"
            >
            </el-table-column>
            <el-table-column
              label="货品名称"
              width="180"
            >
            </el-table-column>
            <el-table-column
              label="货品类型"
            >
            </el-table-column>
            <el-table-column
              label="重量（千克）"
            >
            </el-table-column>
            <el-table-column
              label="体积（立方）"
            >
            </el-table-column>
            <el-table-column
              label="操作"
            >
            </el-table-column>
          </el-table></el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import orderstatus from '@/api/orderstatus.json'
// import showOrderMaps from './components/show-order-maps.vue'
export default {
/*   components: {
    showOrderMaps
  }, */
  /*   props: {
    titleInfo: {
      type: Object,
      required: true
    },
    formBase: {
      type: Object,
      required: true
    }
  }, */
  data() {
    return {
      status: '',
      list: {},
      transportOrderId: {},
      activeNames: ['1', '2', '3', '4', '5', '6', '7'],
      // activeNames: ['6', '1'],
      notes: '暂时', // 距离
      sendAddress: '',
      receiveAddress: '',
      pickupType: '',
      work: '新任务',
      amount: '', // 金额
      paymentMethod: '', // 支付方式
      paymentStatus: '', // 付款方式
      data: [],
      transportOrder: '',
      bool: false
    }
  },
  async created() {
    // 订单状态修改
    const id = this.$route.query.status
    const statusData = orderstatus.filter(item => item.id === +id)
    this.status = statusData[0].name
    // 获取订单详情
    this.list = JSON.parse(this.$route.query.list)
    // 拼接收获，发送地址
    this.sendAddress = `${this.list.senderProvince.name}${this.list.senderCity.name}${this.list.senderCounty.name}`
    this.receiveAddress = `${this.list.receiverProvince.name}${this.list.receiverCity.name}${this.list.receiverCounty.name}`
    // 取件类型
    const pickup = this.list.pickupType
    this.pickupType = pickup === 1 ? '网点自寄' : '上门取件'
    // console.log(this.pickupType)
    // 金额
    this.amount = this.list.amount
    // 支付方式
    const paymentMethod = this.list.paymentMethod
    // console.log(paymentMethod)
    this.paymentMethod = paymentMethod === 1 ? '预结' : '到付'
    // console.log(this.paymentMethod)
    // 付款方式
    const paymentStatus = this.list.paymentStatus
    this.paymentStatus = paymentStatus === 1 ? '未付' : '已付'
    // 运单编号
    const transportOrder = this.list.transportOrder
    if (transportOrder !== null) {
      this.bool = true
    }
    this.transportOrder = transportOrder === null ? '--' : transportOrder.id
  },
  methods: {
    handleChange(val) {
      // console.log(val)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './index.scss';
.send{
  font-size: 18px;
    color: #20232a;
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 10px;
}
.el-form-item__label{
  ::deep{
    .distance{
      width:0px
    }
  }
}
.el-input__inner{
   ::deep{
    .borderNone{
      border: 10px;
    }
   }
}
/deep/ .el-input.is-disabled .el-input__inner{
    background-color: transparent;
    border: none;
    color: #818693;
    cursor: text;
    padding-left: 0;
    padding-right: 0;
}
/deep/ .el-input.is-disabled .el-input__inner#price{
  font-size: 18px;
    color: #ffb302;
}
/deep/ .el-form-item__label{
  color: #333;
  font-weight: 400;
  font-size: 14px;
  padding: 0;
}
.img{
  height: 20px;
    margin-right: 10px;
    width: 16px;
}
.img1{
  height: 20px;
    margin-right: 10px;
  width: 20px;
}
.el-form-item {
  margin-bottom:8px
}
.sendLeft{
  margin-left:10px
}
</style>
