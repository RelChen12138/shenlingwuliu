<template>
  <div class="driver">
    <!-- 搜索 -->
    <el-card shadow="never">
      <el-form
        label-position="left"
        :model="driverInfo"
      >
        <el-col :span="8">
          <el-form-item
            label-align="center"
            prop="account"
            label="司机账号:"
          >
            <el-input
              v-model.trim="driverInfo.account"
              style="width: 203px"
              type="search"
              placeholder="请输入司机账号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label-align="center"
            prop="agendId"
            label="所属机构:"
          >
            <treeselect
              v-model="driverInfo.agendId"
              placeholder="请选择所属机构"
              style="width: 203px; display: inline-block"
              :multiple="false"
              :normalizer="shezhilabel"
              :options="selectData"
              :append-to-body="true"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="
            8"
        >
          <el-form-item
            label-align="center"
            prop="name"
            label="司机姓名:"
          >
            <el-input
              v-model.trim="driverInfo.name"
              style="width: 203px"
              type="search"
              placeholder="请输入司机姓名"
            ></el-input>
          </el-form-item>
          <div>
            <el-button
              type="warning"
              size="medium"
              @click="handleSearch"
            >搜索</el-button>
            <el-button
              style="width:100px;height:40px"
              size="medium"
              @click="handleReset"
            >重置</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-align="center"
            prop="mobile"
            label="司机手机号:"
          >
            <el-input
              v-model.trim="driverInfo.mobile"
              style="width: 203px"
              type="search"
              placeholder="请输入司机手机号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>

    <!-- 表格 -->
    <div class="driver-body">
      <el-table
        stripe
        :data="drivers"
        style="width: 100%"
      >
        <el-table-column label="序号">
          <template slot-scope="scope">
            {{ (page - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="司机账号"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="司机姓名"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="司机电话"
        ></el-table-column>
        <el-table-column
          prop="truck.licensePlate"
          label="关联车辆"
        ></el-table-column>
        <el-table-column
          prop="agency.name"
          label="所属机构"
        ></el-table-column>
        <el-table-column label="工作状态">
          <template slot-scope="scope">
            <span
              v-if="scope.row.workStatus === 0"
              id="redPoints"
            >休息</span>
            <span
              v-else-if="scope.row.workStatus === 1"
              id="greenPoints"
            >上班</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="data"
          label="操作"
        >
          <template v-slot="scope">
            <el-button
              type="text"
              @click="handleCheck(scope.row.userId)"
            >查看</el-button>
            <p id="noting"></p>
            <el-button
              type="text"
              @click="open(scope.row.userId)"
            >配置车辆</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        id="pagination"
        background
        :current-page.sync="page"
        :page-sizes="[10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="+counts"
        @current-change="handleCurrentChange"
      >
      </el-pagination>

      <!-- dialog车辆配置 -->
      <el-dialog
        v-model="userinfo.region"
        title="配置车辆"
        :visible.sync="dialogTableVisible"
      >
        <div id="father">
          <div id="son1">
            <span>司机编号: {{ userinfo.userId }}</span>
            <span>司机名称: {{ userinfo.name }}</span>
          </div>
          <div id="son2">
            <span>司机电话: {{ userinfo.mobile }}</span>
            <span
              v-if="userinfo.agency"
            >所属机构: {{ userinfo.agency.name }}</span>
          </div>
        </div>
        <el-form :model="userinfo">
          <el-form-item
            label-align="center"
            label="配置车辆:"
            prop="licensePlate"
          >
            <el-select
              v-model="value"
              placeholder="请选择车辆"
            >
              <el-option
                v-for="item in trucks"
                :key="item.id"
                :label="item.licensePlate"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-table :data="driverTruck">
          <el-table-column
            label-align="center"
            prop="licensePlate"
            label="车牌号"
          >
            <template v-slot="scope">
              <span>{{ scope.row.licensePlate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label-align="center"
            prop="status"
            label="车辆状态"
          >
            <template v-slot="scope">
              <span
                v-if="scope.row.status===1"
                id="greenPoints"
              >{{ '可用' }}</span>
              <span
                v-else-if="scope.row.status===0"
                id="redPoints"
              >{{ '禁用' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            label-align="center"
          >
            <el-button
              type="text"
              size="small"
              @click="handleLook"
            >查看</el-button>
            <p id="noting"></p>
            <el-button
              type="text"
              style="cplor:red"
              size="small"
              @click="handleDel"
            >删除</el-button>
          </el-table-column>
        </el-table>
        <el-row
          type="flex"
          align="center"
          justify="center"
        >
          <el-button type="warning">确认</el-button>
          <el-button
            style="width:100px;height:40px"
            @click="handleQUXIAO"
          >取消</el-button>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getDrivers, getTrucks, getTreeData } from '@/api/driver'

// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { Treeselect },
  data() {
    return {
      // 司机详情
      driverInfo: {
        name: '',
        account: '',
        mobile: '',
        agendId: null
      },
      page: 1, // 第几页
      pageSize: 10, // 每页条数
      drivers: [], // 司机数组
      counts: null, // 总条数
      userid: null, // 点击查看和车辆配置的用户id
      dialogTableVisible: false,
      trucks: [], // 车辆对象
      value: '',
      userinfo: {}, // 车辆管理司机信息
      selectData: [], // 下拉框数据
      props: {
        id: 'id',
        label: 'name',
        children: 'children'
      },
      driverTruck: []
    }
  },
  created() {
    // 初始化司机表格
    this.initDateDriver()
    // 搜索下拉框数据
    this.initTree()
  },
  methods: {
    // 司机列表
    async initDateDriver() {
      const res = await getDrivers({ page: this.page, pageSize: this.pageSize })
      this.drivers = res.data.items
      this.counts = res.data.counts
      // 获取所有车辆信息
      const res1 = await getTrucks()
      this.trucks = res1.data
    },
    async initTree() {
      const res = await getTreeData()
      const re = JSON.parse(res.data)
      this.selectData = re
    },
    // 翻页
    handleCurrentChange() {
      this.initDateDriver()
    },
    // 跳转详情页
    handleCheck(id) {
      this.$router.push({ name: 'driver-detail', query: { id }})
    },
    // 配置车辆按钮
    open(id) {
      this.userid = id // 获取当前司机id
      this.$confirm(
        ` 
        <p>此操作将永久删除该文件, 是否继续?</p>
        <p>条件:</p>
          <ul style="list-style:none;">
            <li>1 司机信息已经完善</li>
            <li>2 司机已设置排班</li>
            <li>3 司机绑定车辆未在启用状态</li>
          </ul>`,
        '车辆配置',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.dialogTableVisible = true
          this.findTargetUser()
        })
        // .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消'
        //   })
        // })
    },
    // 通过userid筛选获取单个司机详情
    findTargetUser() {
      const targetUser = this.drivers.find(
        (item) => item.userId === this.userid
      )
      // 点击的司机的信息
      this.userinfo = targetUser
      // 有的司机this.userinfo.truck=null不知道怎么解决
      this.value = this.userinfo.truck.licensePlate

      // dialog表格司机车辆信息
      console.log('所有车辆', this.trucks)
      this.driverTruck = this.trucks.filter(truck => {
        return truck.licensePlate === this.value
      })
    },
    // 搜索按钮
    async handleSearch() {
      const parmas = {
        page: this.page,
        pageSize: this.pageSize,
        name: this.driverInfo.name,
        phone: this.driverInfo.mobile,
        agentId: this.driverInfo.agendId,
        account: this.driverInfo.account
      }
      console.log('请求参数', parmas)
      const res = await getDrivers(parmas)
      this.drivers = res.data.items
    },
    // 取消搜索，重置表单
    handleReset() {
      this.driverInfo = {
        name: '',
        account: '',
        mobile: '',
        agendId: null
      }
      this.initDateDriver()
    },
    shezhilabel(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children
      }
    },
    handleLook() {
      this.$router.push({ name: 'vehicle-detail' })
    },
    handleDel() {
      this.driverTruck = []
    },
    handleQUXIAO() {
      this.driverTruck = []
      this.value = ''
      this.dialogTableVisible = false
    }
  }
}
</script>

<style lang="scss" scoped >
.driver {
  padding: 20px;
   /deep/ .el-form-item__label {
      font-weight: normal;
    }
  #pagination {
    padding: 20px;
    text-align: center;
  }
  .driver-body {
    margin-top: 20px;
    padding: 28px;
    background-color: #fff;
    #redPoints::before {
      width: 6px;
      height: 6px;
      background: #e15536;
      border-radius: 50%;
      content: '';
      display: inline-block;
      margin-right: 6px;
    }
    #greenPoints::before {
      width: 6px;
      height: 6px;
      background: #1dc779;
      border-radius: 50%;
      content: '';
      display: inline-block;
      margin-right: 6px;
    }
    #noting {
      display: inline-block;
      width: 1px;
      line-height: 1em;
      height: 1em;
      margin: 0 8px;
      background-color: #66b7ff;
    }
    #father {
      background-color: #fbfafa;
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      #son1,
      #son2 {
        display: flex;
        flex-direction: column;
        span {
          line-height: 40px;
        }
      }
    }
   /deep/ .el-table tr td:last-child .cell {
      text-align: left;
    }
  }
}
</style>
