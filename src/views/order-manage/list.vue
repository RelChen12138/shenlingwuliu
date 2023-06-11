<!-- 订单管理 -->
<template>
  <div class="dashboard-container order-list customer-list-box">
    <div class="app-container">
      <!-- class="search-card-box"自定义属性 -->
      <!--shadow="never" 不展示阴影效果 -->
      <el-card
        class="search-card-box my-card"
        shadow="never"
      >
        <!-- 搜索表单 -->
        <!--  获取表单的引用 -->
        <!-- 表单绑定的数据对象 -->
        <!-- 表单项的名称宽度 -->
        <el-form
          ref="orderSearchFormData"
          :model="orderSearchFormData"
          label-width="80px"
        >
          <el-row :gutter="40">
            <!-- 订单编号 -->
            <el-col :span="8">
              <!-- label 表单项的名称 -->
              <!-- style="margin-buttom" 表单项名称的宽度 -->
              <el-form-item
                label="订单编号:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <!--订单输入框 -->
                <!-- v-model="orderSearchFormData.id"双向绑定订单编号数据 -->
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
                <!-- 订单状态选择 -->
                <!--  clearable // 是否显示清空按钮 -->
                <el-select
                  v-model="orderSearchFormData.orderStatus"
                  clearable
                  placeholder="请选择"
                >
                  <!-- v-for="item in selectList" // 循环渲染下拉选项数据 -->
                  <!-- :key="item.id" // 选项的唯一key  -->
                  <!-- :label="item.name" // 选项显示的文本
                       :value="item.id" // 选项的值 -->
                  <el-option
                    v-for="item in selectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <!-- 付费 -->
            <!-- 付费状态 -->
            <el-col :span="8">
              <el-form-item
                label="付费状态:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <!-- 付费状态选择框 -->
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

            <!-- 发件人 -->
            <!-- 发件人姓名 -->
            <el-col :span="8">
              <el-form-item
                label="发件人姓名:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <!-- 发件人姓名输入框 -->
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
                <!-- 发件人电话输入框 -->
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
                <!-- 发件人地址选择框（省市区三级联动） -->
                <!-- :gutter="24" // 列的间距
                     style="margin: 0" // 样式 -->
                <el-row
                  :gutter="24"
                  style="margin: 0"
                >
                  <el-col
                    :span="8"
                    style="padding: 0"
                  >
                    <!-- 省级 -->
                    <!-- @select="selectProvince" // 选中省时调用的函数
                         @change="isSelCity" // 选中省时调用的函数 -->
                    <el-select
                      v-model="orderSearchFormData.provinceId"
                      placeholder="请选择省"
                      clearable
                      @select="selectProvince"
                      @change="isSelCity"
                    >
                      <!-- v-for="item in ProvinceList" // 循环省选项数据
                         :key="item.id"
                         :label="item.name" // 选项文本
                         :value="item.id" // 选项值 -->
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
                    <!-- 市级 -->
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
                    <!-- 区级 -->
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

            <!-- 收件人 -->
            <!-- 收件人姓名 -->
            <el-col :span="8">
              <el-form-item
                label="收件人姓名:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <!-- 收件人姓名输入框 -->
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
                <!-- 收件人电话输入框 -->
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
                <!-- 收件人地址选择框(省市级三级联动) -->
                <el-row
                  :gutter="24"
                  style="margin: 0"
                >
                  <el-col
                    :span="8"
                    style="padding: 0"
                  >
                    <!-- 省级 -->
                    <!--
                        v-model="orderSearchFormData.receiverProvinceId" // 选择器绑定的值
                        placeholder="请选择省" // 默认显示的提示文字
                        clearable // 是否可清空选项
                        @change="isreceiveSelCity" // 绑定 change 事件触发的函数
                      -->
                    <el-select
                      v-model="orderSearchFormData.receiverProvinceId"
                      placeholder="请选择省"
                      clearable
                      @change="isreceiveSelCity"
                    >
                      <!-- <
                         v-for="item in ProvinceList" // 对 ProvinceList 数组进行循环渲染，每个 item 代表数组中的元素
                         :key="item.id" // 为每个选项添加唯一 key 值，用于提高渲染效率
                         :label="item.name" // 设置选项的显示文字，此处显示省份名称
                         :value="item.id" // 设置选项的值，此处为省份 id
                        -->
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
                    <!-- 市级 -->
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
                    <!-- 区级 -->
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

      <!-- 订单列表 -->
      <div
        style="margin-top: 20px"
      >
        <!-- shadow always表示一直有阴影效果，hover表示只有在鼠标悬浮时才有阴影效果，never表示没有阴影效果 -->
        <el-card
          class="my-card"
          shadow="never"
        >
          <el-table
            :data="dataList"
            fit
            style="width: 100%"
            stripe
          >
            <!-- 数据为空时的处理 -->
            <el-card
              slot="empty"
              shadow="never"
            >
              <empty></empty>
            </el-card>
            <!-- 序号 -->
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
            <!-- 订单编号 -->
            <el-table-column
              prop="id"
              label="订单编号"
              width="170"
            >
            </el-table-column>
            <!-- 运单编号 -->
            <el-table-column
              prop="transportOrder.id"
              label="运单编号"
              width="120"
            >
            </el-table-column>
            <!-- 下单时间 -->
            <el-table-column
              prop="createTime"
              label="下单时间"
              width="180"
            >
            </el-table-column>
            <!-- 订单状体 -->
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
            <!-- 发件人姓名 -->
            <el-table-column
              prop="senderName"
              label="发件人姓名"
              width="90"
            >
            </el-table-column>
            <!-- 发件人电话 -->
            <el-table-column
              prop="senderPhone"
              label="发件人电话"
              width="120"
            >
            </el-table-column>
            <!-- 发件人地址 -->
            <el-table-column
              prop="senderAddress"
              label="发件人地址"
              width="200"
            >
              <template slot-scope="scope">
                <!-- 使用插槽作用域变量获取当前行的收件人地址信息 -->
                <span>
                  <!-- 显示省级名称 -->
                  {{ scope.row.senderProvince.name }}
                  <!-- 显示市级名称，并与前面的省级名称用空格隔开 -->
                  &nbsp;{{ scope.row.senderCity.name }}
                  <!-- 显示区级名称，并与前面的省级、市级名称用空格隔开 -->
                  &nbsp;{{ scope.row.senderCounty.name }}
                  <!-- 显示详细地址信息，并与前面的省级、市级、区级名称用空格隔开 -->
                  &nbsp;{{ scope.row.senderAddress }}
                </span>
              </template>
            </el-table-column>
            <!-- 收件人姓名 -->
            <el-table-column
              prop="receiverName"
              label="收件人姓名"
              width="100"
            >

            </el-table-column>

            <!-- 收件人电话 -->
            <el-table-column
              prop="receiverPhone"
              label="收件人电话"
              width="120"
            >
            </el-table-column>

            <!-- 收件人地址 -->
            <el-table-column
              prop="receiverAddress"
              label="收件人地址"
              width="200"
            >
              <template slot-scope="scope">
                <!-- 使用插槽作用域变量获取当前行的收件人地址信息 -->
                <span>
                  <!-- 显示省级名称 -->
                  {{ scope.row.receiverProvince.name }}
                  <!-- 显示市级名称，并与前面的省级名称用空格隔开 -->
                  &nbsp;{{ scope.row.receiverCity.name }}
                  <!-- 显示区级名称，并与前面的省级、市级名称用空格隔开 -->
                  &nbsp;{{ scope.row.receiverCounty.name }}
                  <!-- 显示详细地址信息，并与前面的省级、市级、区级名称用空格隔开 -->
                  &nbsp;{{ scope.row.receiverAddress }}</span>
              </template>
            </el-table-column>

            <!-- 取件类型 -->
            <el-table-column
              prop="pickupType"
              label="取件类型"
              width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.pickupType === 0 ? '上门取件' : '到店已付' }}</span>
              </template>
            </el-table-column>

            <!-- 付费类型 -->
            <el-table-column
              prop="paymentMethod"
              label="付费类型"
              width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.paymentMethod === 2 ? '到付' : '预结' }}</span>
              </template>
            </el-table-column>

            <!-- 付费状态 -->
            <el-table-column
              prop="paymentStatus"
              label="付费状态"
              width="120"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.paymentStatus === 0 ? '已付' : '未付' }}</span>
              </template>
            </el-table-column>

            <!-- 操作 -->
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

          <!-- 分页组件 -->
          <template>
            <div class="pagination">
              <el-pagination
                :page-sizes="[10, 20, 30, 40,50,60,70,80,90,100]"
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
import city from '@/api/city.json'// 导入城市数据
import list from '@/api/orderstatus.json'// 导入订单状态数据
import { orderList } from '@/api/order'// 导入获取订单列表接口方法
import { areaList } from '@/api/common'// 导入获取所有行政区域简要信息列表接口方式
export default {
  name: 'ListPage',
  data() {
    return {
      // 付费状态
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
      // 订单搜索表单数据
      orderSearchFormData: {
        receiverPhone: '', // 收货人电话
        receiverName: '', // 收货人姓名
        sendPhone: '', // 发件人的电话
        sendName: '', // 收件人的姓名
        PaidStatus: this.PaidStatus, // 付费状态
        orderStatus: '', // 订单状态
        page: 1, // 当前页码
        pageSize: 5, // 分页条数
        id: '', // 订单编号id
        orderId: '', // 订单id
        province: '', // 省份
        senderCountyId: '', // 发件人所在区id
        receiverProvinceId: '', // 收件人省份id
        receiverCityId: '', // 收件人城市id
        receiverCountyId: '' // 收件人区id

      },
      ProvinceList: [], // 所有省份列表信息
      CityList: [], // 所有城市列表信息
      DistrictList: [], // 所有区列表信息
      receiverProvinceList: [], // 收货人所有省份列表信息
      receiverCityList: [], // 收货人所有城市列表信息
      receiverDistrictList: [] // 搜获人所有区列表信息
    }
  },
  created() {
    this.getList()// 页面创建时获取订单列表数据
    this.getareaList()// 页面创建时获取行政区域简要信息列表
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
      // 重置表单
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
    // 获取区域列表信息  异步
    async isSelDistrict() {
      // 用 areaList 函数，传入当前市级id，获取对应区域列表
      const res = await areaList({ parentId: this.orderSearchFormData.city })
      //  将获取到的区域列表赋值给 DistrictList 数据，用于后续操作
      this.DistrictList = res.data
    },
    // 获取收货方所在市级列表  异步
    async isreceiveSelCity() {
      //  调用 areaList 函数，传入收货方所在省级id，获取对应市级列表
      const res = await areaList({ parentId: this.orderSearchFormData.receiverProvinceId })
      // 将获取到的市级列表赋值给receiverCityList数据，用于后续
      this.receiverCityList = res.data
    },
    // 获取收货方发区级列表  异步
    async isreceiveSelCounty() {
      // 调用areaList函数，传入收货方所在的市级id，获取对应区级列表
      const res = await areaList({ parentId: this.orderSearchFormData.receiverCityId })
      // 将获取到区级列表赋值给receiverDistrictList数据，用于后续
      this.receiverDistrictList = res.data
    },
    // 搜索  异步函数
    async onSearch() {
      // 调用 orderList 函数，传入搜索条件
      const res = await orderList({
        amount: '', // 金额
        createTime: '', // 创建时间
        estimatedArrivalTime: '', // 预计到达时间
        id: this.orderSearchFormData.id, // 运单id
        memberId: '', // 会员id
        orderType: '', // 订单类型
        page: 1, // 初始页数
        pageSize: 10, // 页面显示的数据数量
        paymentMethod: '', // 支付方式
        paymentStatus: this.orderSearchFormData.PaidStatus, // 支付状态
        pickupType: '', // 取件类型
        receiverAddress: '', // 收货人地址
        receiverCityId: this.orderSearchFormData.receiverCityId, // 收货人的市级编号
        receiverCountyId: this.orderSearchFormData.receiverCountyId, // 收货人的区级编号
        receiverName: this.orderSearchFormData.receiverName, // 发货人的姓名
        receiverPhone: this.orderSearchFormData.receiverPhone, // 发货人的电话
        receiverProvinceId: this.orderSearchFormData.receiverProvinceId, // 发货人的省级编号
        senderAddress: '', // 发货人的地址
        senderCityId: this.orderSearchFormData.city, // 发货人的市级编号
        senderCountyId: this.orderSearchFormData.senderCountyId, // 发货人的区级编号
        senderName: this.orderSearchFormData.sendName, // 发货人的姓名
        senderPhone: this.orderSearchFormData.sendPhone, // 发货人的电话
        senderProvinceId: this.orderSearchFormData.provinceId, // 发货人的省级编号
        status: this.orderSearchFormData.orderStatus// 运单状态
      })
      this.dataList = res.data.items//
    },
    // 分页条数
    handleSizeChange(pageSize) {
      this.orderSearchFormData.pageSize = pageSize// 将页面条数记录下来
      this.getList()// 调用getList函数，重新获取相应数据
    },
    // 页码
    handleCurrentChange(page) {
      this.orderSearchFormData.page = page// 记录页面改变后的页码
      this.getList()// 调用getList函数，重新获取相应数据
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// 警告框的样式
.alert {
  margin: 10px 0px;
}
// 分页条的样式
.pagination {
  margin-top: 40px;
  justify-content: center;
  display: -webkit-box;
  -webkit-box-pack: center;
      margin-top: 40px;
}
// 阴影
.my-card{
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

// 下拉框的样式
/deep/ .el-select {
  width: 100%;
}
</style>

<style lang="scss" scoped>
// 订单列表样式
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
// 激活状体的分页按钮的样式
::v-deep .el-pager li.active {
  color: #f33409;
}
</style>
