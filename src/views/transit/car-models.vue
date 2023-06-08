<!-- 车型管理 -->
<template>
  <div>
    <!-- 搜索车辆 -->
    <div class="car-models-top">
      <div class="car-models-top2">
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="车型编号："
            prop="number"
          >
            <el-input
              v-model="form.number"
              style="width:300px"
              placeholder="请输入车辆编号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="应载重量:"
            prop="weight"
          >
            <el-select
              v-model="form.weight"
              style="width:300px"
              placeholder="请选择应载重量"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="应载体积:"
            prop="volume"
          >
            <el-select
              v-model="form.volume"
              style="width:300px"
              placeholder="请选择应载体积"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="车型类型："
            prop="type"
          >
            <el-input
              v-model="form.type"
              style="width:300px"
              placeholder="请输入车辆类型"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('form')"
            >搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 新增车辆信息 -->
    <div class="car-models-below">
      <!-- 新增车辆按钮 -->
      <div class="add-car">
        <el-button
          type="primary"
          @click="addcar"
        >新增车辆</el-button>
      </div>
      <!-- 车辆信息表单 -->
      <div class="car-it">
        <el-table
          :data="tableData"
          height="400"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            label="车辆编号"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="车辆类型"
          >
          </el-table-column>
          <el-table-column
            prop="num"
            label="车辆数量"
          >
          </el-table-column>
          <el-table-column
            prop="allowableLoad"
            label="应载重量(吨)"
          >
          </el-table-column>
          <el-table-column
            prop="allowableVolume"
            label="应载体积(立方米)"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="measureLong"
            label="长(米)"
          >
          </el-table-column>
          <el-table-column
            prop="measureWidth"
            label="宽(米)"
          >
          </el-table-column>
          <el-table-column
            prop="measureHigh"
            label="高(米)"
          >
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="caredit(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="cardel"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-row
          type="flex"
          justify="center"
        >
          <el-pagination
            :current-page="pagesize.page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
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
import { list } from '@/api/transit'
export default {
  data() {
    return {
      form: {
        number: '',
        weigth: '',
        type: '',
        volume: ''
      },
      // 默认页码数据
      pagesize: {
        page: 1, // 第几页
        pageSize: 10 // 每一页显示的个数
      },
      // 页码总条数
      total: null,
      // 表单详情
      tableData: [{
        allowableLoad: null,
        allowableVolume: null,
        id: null,
        measureHigh: null,
        measureLong: null,
        measureWidth: null,
        name: '',
        num: null
      }],
      // 车辆承重下拉框
      options: []
    }
  },
  created() {
    // 获取数据
    this.fetchCar()
  },
  methods: {
    // 获取数据
    async fetchCar() {
      const { data } = await list(this.pagesize)
      console.log(data)
      // 页码渲染
      this.total = +data.counts
      // 表单页面渲染
      this.tableData = data.items
      // 下拉框渲染
      // this.weigth =
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
    },
    // 新增车辆
    addcar() {
      console.log(111)
    },
    // 车辆编辑
    caredit(row) {
      console.log(row)
    },
    // 删除车辆
    cardel() {
      console.log(222)
    },
    // 每页多少条数据
    handleSizeChange(val) {
      this.pagesize.pageSize = val
      this.fetchCar()
    },
    // 当前多少页
    handleCurrentChange(val) {
      this.pagesize.page = val
      this.fetchCar()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.add-btn{
  margin-bottom: 20px;
}
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 40px;
  padding-bottom: 0px;
}

.el-select {
  width: 100%;
}

.car-models /deep/ .el-table td,
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
.car-models {
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
    padding: 40px 60px 0 30px;
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
.car-models-top{
  width: 1250px;
  height: 140px;
  background-color: #ffffff;
  margin-left: 35px;
  margin: 35px;
  padding: 20px;
  .demo-ruleForm{
    display: flex;
    flex-direction:row;
    flex-wrap:wrap;
    align-content:space-between
  }
}
 .car-models-below{
    width: 1250px;
    height: 600px;
    background-color: #ffffff;
    margin-left: 35px;
    padding: 20px;
    .car-it{
      margin-top: 25px;
    }
  }

</style>
