<!-- 运费管理 -->
<template>
  <div class="dashboard-container waybill-list customer-list-box">
    <div class="el-card__body">
      <el-button
        type="primary"
        @click="handleAdd()"
      >新增模板</el-button>
      <el-table
        border
        class="el-table"
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="templateType"
          label="模板类型"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{
              templateTypeList.filter(
                (item) => item.value === scope.row.templateType
              )[0].label
            }}</span>
          </template> </el-table-column>``
        <el-table-column
          align="left"
          label="运送类型"
          min-width="140"
        >
          <template slot-scope="scope">
            <span>{{
              transportTypeList.filter(
                (item) => item.value === scope.row.transportType
              )[0].label
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="关联城市"
          min-width="140"
        >
          <template slot-scope="scope">
            <span>{{
              getAssociatedCityList(scope.row.associatedCityList)
            }}</span>
          </template>
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
        <el-table-column
          width="180"
          label="操作"
          align="center"
        >
          <template v-slot="{ row }">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(row)"
            >编辑</el-button>
            <span>|</span>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑/新增页面 -->
      <el-dialog
        :title="type === 'add' ? '新增模板' : '编辑模板'"
        :visible.sync="dialogFormVisible"
        width="600px"
        class="add-form-dialog"
      >
        <el-form
          ref="dataForm"
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
              style="width: 100%"
              clearable
              value-key="templateType"
              placeholder="请选择模板类型"
            >
              <el-option
                v-for="item in templateTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
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
              clearable
              style="width: 100%"
              value-key="transportType"
            >
              <el-option
                v-for="item in transportTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="关联城市"
            :label-width="formLabelWidth"
            prop="associatedCityList"
          >
            <span v-if="data.templateType !== 3">全国</span>
            <el-checkbox-group
              v-else
              v-model="data.associatedCityList"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="city in associatedCityList.filter(
                  (item) => item.value !== 1
                )"
                :key="city.value"
                :label="city.value"
              >{{ city.label }}</el-checkbox>
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
            ><span slot="suffix">元</span></el-input>
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
          <el-button
            type="primary"
            @click="createData"
          >确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 删除弹框 -->
      <el-dialog
        title="确认删除"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <span>确定要删除吗？</span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="delfreight()"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div></div>
  </div>
</template>

<script>
import { freightList, changefright, delfreight } from '@/api/freight'
export default {
  data() {
    return {
      visible: true,
      type: '',
      list: [],
      handleID: '',
      data: {
        associatedCityList: [],
        continuousWeight: '',
        firstWeight: '',
        lightThrowingCoefficient: '',
        templateType: '',
        transportType: ''
      },
      // 关联城市
      associatedCityList: [
        { value: 1, label: '全国' },
        { value: 2, label: '京津冀' },
        { value: 3, label: '江浙沪' },
        { value: 4, label: '川渝' },
        { value: 5, label: '黑吉辽' }
      ],
      // 模板类型
      templateTypeList: [
        { value: 1, label: '同城寄' },
        { value: 2, label: '省内寄' },
        { value: 3, label: '经济区互寄' },
        { value: 4, label: '跨省' }
      ],
      // 运送类型
      transportTypeList: [
        { value: 1, label: '普快' },
        { value: 2, label: '特快' }
      ],
      dialogVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        templateType: [
          { required: true, message: '模板类型不能为空', trigger: 'blur' }
        ],
        transportType: [
          { required: true, message: '运送类型不能为空', trigger: 'blur' }
        ],
        associatedCityList: [
          { required: true, message: '关联城市不能为空', trigger: 'blur' }
        ],
        firstWeight: [
          { required: true, message: '首重价格不能为空', trigger: 'blur' }
        ],
        continuousWeight: [
          { required: true, message: '续重价格不能为空', trigger: 'blur' }
        ],
        lightThrowingCoefficient: [
          { required: true, message: '轻抛系数不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getfreightList()
  },
  methods: {
    // 新增运费
    handleAdd() {
      this.dialogFormVisible = true
      this.data = {
        templateType: '',
        transportType: '',
        associatedCityList: [1],
        firstWeight: '',
        continuousWeight: '',
        lightThrowingCoefficient: ''
      }
      this.type = 'add'
    },
    // 编辑运费模板
    handleEdit(row) {
      this.dialogFormVisible = true
      this.type = 'edit'
      const arr = row.associatedCityList.map((item) => {
        return Number(item)
      })
      this.date = Object.assign({}, row, { associatedCityList: arr })
    },
    // 更改关联城市
    handleCheckedCitiesChange(value) {
      this.data.associatedCityList = value.filter((item) => item !== 1)
    },
    // 获取列表
    async getfreightList() {
      const res = await freightList()
      this.list = res.data
    },
    // 新增点击确定
    createData() {
      this.$refs['dataForm'].validate(async (valid) => {
        console.log(valid)
        if (
          // 经济区互寄必须要选择关联城市
          this.data.templateType === 3 &&
          this.data.associatedCityList.length === 1 &&
          this.data.associatedCityList[0] === 1
        ) {
          return this.$message({
            message: '请选择关联城市',
            type: 'error'
          })
        }
        if (valid) {
          const data = {
            templateType: this.data.templateType,
            transportType: this.data.transportType,
            associatedCityList: this.data.associatedCityList,
            firstWeight: this.data.firstWeight,
            continuousWeight: this.data.continuousWeight,
            lightThrowingCoefficient: this.data.lightThrowingCoefficient
          }
          await changefright(data).then((res) => {
            if (String(res.code) === '200') {
              this.$message({
                message: '操作成功！',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.getfreightList()
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
        } else {
          this.$message.error('*号为必填项!')
        }
      })
    },
    // 修改点击确认
    handleEditPerms() {
      console.log('修改')
    },
    // 点击删除
    handleDelete(row) {
      this.dialogVisible = true
      console.log(row)
      this.handleID = row
    },
    // 删除点击确定或选中点击删除按钮，如果选中，则执行删除操作。
    async delfreight(row) {
      this.dialogVisible = false
      await delfreight(this.handleID)
      this.getfreightList()
      this.handleID = null
    },
    // 处理返回的关联城市的value数组转化为城市名称
    getAssociatedCityList(list) {
      return this.associatedCityList
        .filter((item) => {
          return list.findIndex((item1) => item1 === String(item.value)) !== -1
        })
        .map((item) => item.label)
        .join(',')
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
