<!-- 运费管理 -->
<template>
  <div class="dashboard-container waybill-list customer-list-box">
    <div class="el-card__body">
      <el-button
        type="primary"
        @click="handleAdd()"
      >新增模板</el-button>
      <el-table
        class="el-table"
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="templateType"
          label="模板类型"
          width="180"
        >
        </el-table-column>``
        <el-table-column
          prop="transportType"
          label="运送类型"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="associatedCityList"
          label="关联城市"
        >
        </el-table-column>
        <el-table-column
          prop="firstWeight"
          label="首重"
        > </el-table-column>
        <el-table-column
          prop="continuousWeight"
          label="续重"
        >
        </el-table-column>
        <el-table-column
          prop="lightThrowingCoefficient"
          label="轻抛系数"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              size="mini"
              type="text"
              @click="handleAdd(row)"
            >编辑</el-button>
            <span>|</span>
            <el-button
              size="mini"
              type="text"
              @click="handleDeletePerms(row.id)"
            >删除</el-button>
            <el-popover
              v-model="visible"
              placement="top"
              width="160"
            >
              <p>这是一段内容这是一段内容确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="visible = false"
                >取消</el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="visible = false"
                >确定</el-button>
              </div>
              <el-button slot="reference">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑/新增页面 -->
      <el-dialog
        title="新增模板"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          :model="data"
          :rules="rules"
        >
          <el-form-item
            label="模板类型"
            :label-width="formLabelWidth"
            prop="templateType"
          >
            <el-select
              v-model="data.templateType"
              placeholder="请选择模板类型"
            >
              <el-option
                label="同城寄"
                value="1"
              ></el-option>
              <el-option
                label="省内寄"
                value="2"
              ></el-option>
              <el-option
                label="经济区互寄"
                value="3"
              ></el-option>
              <el-option
                label="跨省"
                value="4"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="运送类型"
            :label-width="formLabelWidth"
            prop="transportType"
          >
            <el-select
              v-model="data.transportType"
              placeholder="请选择运送类型"
            >
              <el-option
                label="普快"
                value="1"
              ></el-option>
              <el-option
                label="特快"
                value="2"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="关联城市"
            :label-width="formLabelWidth"
            prop="associatedCityList"
          >
            <el-checkbox-group v-model="data.associatedCityList">
              <el-checkbox
                value="2"
                label="京津冀"
              ></el-checkbox>
              <el-checkbox
                value="3"
                label="江浙沪"
              ></el-checkbox>
              <el-checkbox
                value="4"
                label="川渝"
              ></el-checkbox>
              <el-checkbox
                value="5"
                label="黑吉辽"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item
            label="首重价格"
            :label-width="formLabelWidth"
            prop="firstWeight"
          >
            <el-input
              v-model="data.firstWeight"
              placeholder="请输入首重价格"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="续重价格"
            :label-width="formLabelWidth"
            prop="continuousWeight"
          >
            <el-input
              v-model="data.continuousWeight"
              placeholder="请输入续重价格"
            ><span slot="suffix">元</span></el-input>
          </el-form-item>

          <el-form-item
            label="轻抛系数"
            :label-width="formLabelWidth"
            prop="lightThrowingCoefficient"
          >
            <el-input
              v-model="data.lightThrowingCoefficient"
              placeholder="请输入轻抛系数"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogFormVisible = false"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!-- 删除页面 -->
    </div>
  </div>
</template>

<script>
import { freightList, changefright, delfreight } from '@/api/freight'
export default {
  data() {
    return {
      list: [],
      data: {
        associatedCityList: [],
        continuousWeight: '',
        firstWeight: '',
        lightThrowingCoefficient: '',
        templateType: '',
        transportType: ''
      },
      dialogFormVisible: false,
      dialogVisible: false,
      checked: true,
      formLabelWidth: '120px',
      rules: {
        templateType: [
          { required: true, message: '模板类型不能为空', trigger: 'blur' }
        ],
        transportType: [
          { required: true, message: '运送类型不能为空', trigger: 'blur' }
        ],
        associatedCityList: [{ required: true, trigger: 'blur' }],
        firstWeight: [
          { required: true, message: '首重价格不能为空', trigger: 'blur' }
        ],
        continuousWeight: [
          { required: true, message: '续重价格不能为空', trigger: 'blur' }
        ],
        lightThrowingCoefficient: [
          { required: true, message: '轻抛系数不能为空', trigger: 'blur' },
          {
            type: 'number',
            min: 0,
            max: 99999,
            message: '轻抛系数必须小于99999',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.getfreightList()
  },
  methods: {
    // 新增或编辑
    handleAdd(row) {
      if (row) {
        console.log(row)
      }
      this.dialogFormVisible = true
    },
    // 获取列表
    async getfreightList() {
      const res = await freightList()
      this.list = res.data
    },
    // 新增点击确定
    async addfreight() {
      await changefright()
    },
    // 修改点击确认
    handleEditPerms() {
      console.log('修改')
    },
    // 点击删除
    handleDeletePerms(row) {
      console.log(row)
      this.$confirm('确定要删除吗?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((row) => {
          delfreight(row)
          console.log(row)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getfreightList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除点击确定或选中点击删除按钮，如果选中，则执行删除操作。
    async delfreight(row) {
      await delfreight(row)
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.waybill-list {
  .el-dialog__wrapper {
    /deep/ .el-dialog__body {
      padding-left: 0px;
    }
  }
  .el-card__body {
    margin: 20px;

    background-color: #fff;
    border-radius: 5px;
    /deep/ .el-table {
      margin: 20px 0;
    }
  }
}
</style>
