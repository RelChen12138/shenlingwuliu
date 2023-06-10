<!-- 车型管理 -->
<template>
  <div class="dashboard-container operational-range customer-list-box">
    <div class="app-container">
      <el-card
        class="search-card-box"
        shadow="never"
      >
        <el-form
          ref="PageNumSizeRef"
          label-width="95px"
          :model="PageNumSize"
        >
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                label="车型编号:"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model="PageNumSize.id"
                  clearable
                  placeholder="请输入车型编号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="应载重量:"
                style="margin-bottom: 0px"
              >
                <el-select
                  v-model="PageNumSize.allowableLoad"
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
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="应载体积:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-select
                  v-model="PageNumSize.allowableVolume"
                  placeholder="请选择应载体积"
                >
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="车辆类型:"
                style="margin-top: 20px; margin-bottom: 0px"
              >
                <el-input
                  v-model="PageNumSize.name"
                  clearable
                  placeholder="请输入车辆类型"
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              style="margin-top: 20px"
            >
              <el-button
                type="warning"
                @click="searchForm"
              >搜索</el-button>
              <el-button
                plain
                class="reset-btn"
                @click="resetForm"
              >重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <div
        v-loading="listLoading"
        style="margin-top: 20px"
        :class="{ 'loading-box': listLoading }"
        element-loading-text="加载中"
      >
        <el-card
          class="table-card-box"
          shadow="never"
        >
          <el-button
            class="customer-add-btn"
            style="margin-bottom: 20px"
            @click="addCarType"
          >新增车型</el-button>
          <template>
            <el-table
              :data="CarTypeList"
              stripe
              style="width: 100%"
            >
              <div
                v-show="
                  (!CarTypeList || CarTypeList.length <= 0) &&
                    !listLoading &&
                    !searchkey
                "
                slot="empty"
              >
                <img
                  src="@/icons/pic-kong@2x.png"
                  alt="img"
                  style="margin-top: 20px; width: 25%; height: 25%"
                />
                <p style="margin-top: -20px; padding-bottom: 0px">这里空空如也</p>
              </div>
              <el-card
                v-show="
                  (!CarTypeList || CarTypeList.length <= 0) && !listLoading && searchkey
                "
                slot="empty"
                class="table-empty-box"
                shadow="never"
              >
                <empty></empty>
              </el-card>
              <el-table-column
                align="left"
                type="index"
                label="序号"
                width="70px"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.$index +
                      (PageNumSize.page - 1) * PageNumSize.pageSize +
                      1
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="id"
                label="车型编号"
                min-width="180px"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="车辆类型"
                min-width="120px"
              >
              </el-table-column>
              <el-table-column
                prop="num"
                label="车型数量"
                min-width="120px"
              >
              </el-table-column>
              <el-table-column
                prop="allowableLoad"
                label="应载重量（吨）"
                min-width="120px"
              >
              </el-table-column>
              <el-table-column
                prop="allowableVolume"
                label="应载体积（立方米）"
                min-width="150px"
              >
              </el-table-column>
              <el-table-column
                prop="measureLong"
                label="长（米）"
                min-width="120px"
              >
              </el-table-column>
              <el-table-column
                prop="measureWidth"
                label="宽（米）"
                min-width="120px"
              >
              </el-table-column>
              <el-table-column
                prop="measureHigh"
                label="高（米）"
                min-width="120px"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                fixed="right"
                min-width="120px"
              >
                <template slot-scope="{ row }">
                  <el-button
                    type="text"
                    size="mini"
                    @click="editCarType(row.id)"
                  >编辑</el-button>
                  <span
                    style="border-right: 1.5px solid #ccc; margin: 8px"
                  ></span>
                  <el-button
                    type="text"
                    size="mini"
                    class="delColor"
                    @click="delCarType(row.id,row.name)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>

          <!-- end -->
          <!-- 分页 -->
          <div class="pagination">
            <div
              v-show="CarTypeList && CarTypeList.length > 0"
              class="pages"
            >
              <el-pagination
                :current-page="PageNumSize.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="PageNumSize.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="Number(total)"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <CarModels
      ref="carModelsRef"
      :show-dialog.sync="showDialog"
      @update-list="list"
    ></CarModels>
  </div>
</template>
<script>
import CarModels from './components/car-models-add.vue'
import { list1, del } from '@/api/transit'
export default {
  name: 'CarType',
  components: {
    CarModels
  },
  data() {
    return {
      PageNumSize: {
        page: 1, // 页码
        pageSize: 5, // 页尺寸
        id: '', // 车型编号
        allowableLoad: '', // 应载重量
        allowableVolume: '', // 应载体积
        name: ''// 车辆类型
      },
      // 数据总数
      total: null,
      CarTypeList: [],
      showDialog: false,
      // 应载重量数据
      options: [
        {
          value: 'RANGE_LEVEL_1',
          label: '<1.8（吨）'
        },
        {
          value: 'RANGE_LEVEL_2',
          label: '1.8-6（吨）'
        },
        {
          value: 'RANGE_LEVEL_3',
          label: '6-14（吨）'
        },
        {
          value: 'RANGE_LEVEL_4',
          label: '14-30（吨）'
        },
        {
          value: 'RANGE_LEVEL_5',
          label: '30-50（吨）'
        },
        {
          value: 'RANGE_LEVEL_6',
          label: '50-100（吨）'
        },
        {
          value: 'RANGE_LEVEL_7',
          label: '100>（吨）'
        }
      ],
      options2: [
        {
          value: 'RANGE_LEVEL_1',
          label: '<3（m³）'
        },
        {
          value: 'RANGE_LEVEL_2',
          label: '3-5（m³）'
        },
        {
          value: 'RANGE_LEVEL_3',
          label: '5-10（m³）'
        },
        {
          value: 'RANGE_LEVEL_4',
          label: '10-15（m³）'
        },
        {
          value: 'RANGE_LEVEL_5',
          label: '15-30（m³）'
        },
        {
          value: 'RANGE_LEVEL_6',
          label: '30-50（m³）'
        },
        {
          value: 'RANGE_LEVEL_7',
          label: '50-80（m³）'
        },
        {
          value: 'RANGE_LEVEL_8',
          label: '80-150（m³）'
        },
        {
          value: 'RANGE_LEVEL_9',
          label: '150>（m³）'
        }
      ],
      value: '',
      searchkey: false,
      listLoading: true
    }
  },
  created() {
    this.list()
  },
  methods: {
    // 获取车辆类型分页数据
    async list() {
      try {
        this.listLoading = true
        const res = await list1(this.PageNumSize)
        this.listLoading = false
        this.CarTypeList = res.data.items
        this.total = res.data.counts
      } catch (error) {
        console.log(error)
      }
    },
    // 每页显示数据条数改变
    handleSizeChange(val) {
      this.PageNumSize.pageSize = val
      this.list(this.PageNumSize)
    },
    // 当前页页数发生改变
    handleCurrentChange(val) {
      this.PageNumSize.page = val
      this.list(this.PageNumSize)
    },
    // 删除
    async delCarType(id, name) {
      this.$confirm(`此操作将永久删除${name}车型, 是否继续?`, '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await del(id)
          if (res.code === 1) {
            this.$message({
              type: 'error',
              message: '绑定车辆的车型无法删除'
            })
          } else {
            if (this.CarTypeList.length === 1 && this.PageNumSize.page !== 1) {
              this.PageNumSize.page--
            }
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.list()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑车辆类型
    editCarType(id) {
      this.showDialog = true
      this.$refs.carModelsRef.gatCarDetails(id)
    },
    // 新增车辆类型
    addCarType() {
      this.showDialog = true
    },
    // 按需搜索显示页面
    async searchForm() {
      try {
        const res = await this.list(this.PageNumSize)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 重置按钮功能
    resetForm() {
      this.$refs.PageNumSizeRef.resetFields()
      this.PageNumSize = {
        page: 1,
        pageSize: 5,
        id: '', // 车型编号
        allowableLoad: '', // 应载重量
        allowableVolume: '', // 应载体积
        name: ''// 车辆类型
      }
      this.list()
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
.delColor {
  color: #f56c6c;
}
</style>

<style lang="scss" scoped>
.operational-range {
  .el-card {
    overflow: initial;
  }
}
</style>
