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
            prop="id"
          >
            <el-input
              v-model="form.id"
              style="width:300px"
              placeholder="请输入车辆编号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="应载重量:"
            prop="allowableLoad"
          >
            <el-select
              v-model="form.allowableLoad"
              style="width:300px"
              placeholder="请选择应载重量"
            >
              <el-option
                v-for="item in allowableLoad"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="应载体积:"
            prop="allowableVolume"
          >
            <el-select
              v-model="form.allowableVolume"
              style="width:300px"
              placeholder="请选择应载体积"
            >
              <el-option
                v-for="item in allowableVolume"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="车型类型："
            prop="name"
          >
            <el-input
              v-model="form.name"
              style="width:300px"
              placeholder="请输入车辆类型"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="warning"
              @click="submitForm(form)"
            >搜索</el-button>
            <el-button
              type="warning"
              plain
              @click="resetForm"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 新增车辆信息 -->
    <div class="car-models-below">
      <!-- 新增车辆按钮 -->
      <div class="add-car">
        <el-button
          type="warning"
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
            <template v-slot="{row}">
              <el-button
                type="text"
                size="small"
                @click="caredit(row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                style="color:red"
                @click="cardel(row.id)"
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
    <AddCarVue
      ref="addcar"
      :showaddcar="showaddcar"
      :carid="carid"
      @refesg="refcreated"
    ></AddCarVue>
  </div>
</template>
<script>
import { list, del } from '@/api/transit'
import AddCarVue from '@/views/transit/components/car-models-add.vue'
export default {
  components: {
    AddCarVue
  },
  data() {
    return {
      showaddcar: false, // 弹窗
      form: {
        page: 1,
        pageSize: 10,
        allowableLoad: '',
        allowableVolume: '',
        id: '',
        name: ''
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
        allowableLoad: null, // 下拉框承重
        allowableVolume: null, // 下拉框体积
        id: null,
        measureHigh: null, // 高
        measureLong: null, // 长
        measureWidth: null, // 宽
        name: '',
        num: null
      }],
      // 车辆承重下拉框
      allowableLoad: [{
        value: 'RANGE_LEVEL_1',
        name: '<1.8(吨)'
      },
      {
        value: 'RANGE_LEVEL_2',
        name: '1.8-6(吨)'
      },
      {
        value: 'RANGE_LEVEL_3',
        name: '6-14(吨)'
      },
      {
        value: 'RANGE_LEVEL_4',
        name: '14-30(吨)'
      },
      {
        value: 'RANGE_LEVEL_5',
        name: '30-50(吨)'
      },
      {
        value: 'RANGE_LEVEL_6',
        name: '50-100(吨)'
      },
      {
        value: 'RANGE_LEVEL_7',
        name: '100>（吨）'
      }],
      allowableVolume: [{
        value: 'RANGE_LEVEL_1',
        name: '<3(m³)'
      },
      {
        value: 'RANGE_LEVEL_2',
        name: '3-5(m³)'
      },
      {
        value: 'RANGE_LEVEL_3',
        name: '5-10(m³)'
      },
      {
        value: 'RANGE_LEVEL_4',
        name: '10-15(m³)'
      },
      {
        value: 'RANGE_LEVEL_5',
        name: '15-30(m³)'
      },
      {
        value: 'RANGE_LEVEL_6',
        name: '30-50(m³)'
      },
      {
        value: 'RANGE_LEVEL_7',
        name: '50-80(m³)'
      },
      {
        value: 'RANGE_LEVEL_8',
        name: '80-150(m³)'
      },
      {
        value: 'RANGE_LEVEL_9',
        name: '150>(m³)'
      }],
      // 表单当前点击的id
      carid: ''
    }
  },
  created() {
    // 获取数据
    this.fetchCar()
  },
  methods: {
    // 获取表单数据
    async fetchCar() {
      const { data } = await list(this.pagesize)
      // 页码渲染
      this.total = +data.counts
      // 表单页面渲染
      this.tableData = data.items
      // 下拉框渲染
      // this.weigth =
    },
    // 获取最新表单数据
    refcreated() {
      this.fetchCar()
    },
    // 搜索
    async submitForm() {
      const { data } = await list(this.form)
      // 页码渲染
      this.total = +data.counts
      // 分页器渲染
      this.pagesize.page = data.page
      this.pagesize.pageSize = data.page
      // 表单页面渲染
      this.tableData = data.items
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
    },
    // 新增车辆按钮
    addcar() {
      this.$refs.addcar.looksysloading()
    },
    // 车辆编辑
    caredit(row) {
      this.carid = row.id
      this.$refs.addcar.looksysloading(true, row.id)
    },
    // 删除车辆
    // async cardel(id) {
    //   const res = await del(id)
    //   if (res.code === 1) {
    //     this.$message.warning('当前车辆在使用中不能删除')
    //   } else {
    //     this.$message.success('删除成功')
    //     this.fetchCar()
    //   }
    // },
    cardel(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await del(id)
        if (res.code === 1) {
          this.$message.warning('当前车辆在使用中不能删除')
        } else {
          this.$message.success('删除成功')
          this.fetchCar()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
