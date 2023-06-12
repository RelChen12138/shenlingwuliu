<!-- 车型添加 -->
<template>
  <div>
    <el-dialog
      title="新增车型"
      :visible.sync="sysloading"
      width="40%"
      :before-close="handleClose"
      @cloce="handleClose"
    >
      <!-- //表单内容 -->
      <el-form
        v-if="sysloading"
        ref="addfrom"
        :rules="rules"
        :model="cardata"
        label-width="120px"
      >
        <!-- //车辆类型 -->
        <el-form-item
          label="车辆类型"
          prop="name"
        >
          <el-input
            v-model="cardata.name"
            placeholder="请输入车辆类型"
            style="width:400px"
          ></el-input>
        </el-form-item>
        <!-- 车辆载重 -->
        <el-form-item
          label="车辆载重"
          prop="allowableLoad"
        >
          <el-input
            v-model="cardata.allowableLoad"
            placeholder="请输入车辆载重"
            style="width:400px"
          ><span
            slot="suffix"
            style="color:black"
          >吨</span></el-input>
        </el-form-item>
        <!-- 车辆体积 -->
        <el-form-item
          label="车辆体积"
          prop="allowableVolume"
        >
          <el-input
            v-model="cardata.allowableVolume"
            placeholder="请输入车辆体积"
            style="width:400px"
          ><span
            slot="suffix"
            style="color:black"
          >立方</span></el-input>
        </el-form-item>
        <!-- 长 -->
        <el-form-item
          label="长"
          prop="measureLong"
        >
          <el-input
            v-model="cardata.measureLong"
            style="width:400px"
            placeholder="请输入长"
          >
            <span
              slot="suffix"
              style="color:black"
            >米</span>
          </el-input>
        </el-form-item>
        <!-- 宽 -->
        <el-form-item
          label="宽"
          prop="measureWidth"
        >
          <el-input
            v-model="cardata.measureWidth"
            style="width:400px"
            placeholder="请输入长"
          >
            <span
              slot="suffix"
              style="color:black"
            >米</span>
          </el-input>
        </el-form-item>
        <!-- 高 -->
        <el-form-item
          label="高"
          prop="measureHigh"
        >
          <el-input
            v-model="cardata.measureHigh"
            style="width:400px"
            placeholder="请输入高"
          >
            <span
              slot="suffix"
              style="color:black"
            >米</span>
          </el-input>
        </el-form-item>
      </el-form>
      <el-row
        type="flex"
        justify="center"
      >
        <el-button
          type="primary"
          @click="affaddcar"
        >确认</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { add, update } from '@/api/transit'
import { getcarlist } from '@/api/carID'
export default {
  name: 'CarModelsAdd',
  props: {
    showaddcar: {
      type: Boolean,
      default: false
    },
    carid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 表单内容默认隐藏
      sysloading: false,
      cardata: {
        name: '',
        allowableVolume: '',
        allowableLoad: '',
        measureLong: '0.0',
        measureWidth: '0.0',
        measureHigh: '0.0'
      },
      rules: {
        name: [{ required: true, message: '车辆类型不能为空', trigger: ['blur', 'change'] }],
        allowableVolume: [{ required: true, message: '车辆体积不能为空', trigger: ['blur', 'change'] }],
        allowableLoad: [{ required: true, message: '车辆载重不能为空', trigger: ['blur', 'change'] }]
      },
      isEdit: false
    }
  },
  created() {
    // this.getcar()
    // console.log(this.carid)
  },
  methods: {
    // 弹层显示
    looksysloading(isEdit = false, id) {
      this.isEdit = isEdit
      this.sysloading = true
      if (this.isEdit) {
        this.getcar(id)
      }
    },
    // 弹框关闭
    handleClose() {
      this.sysloading = false
      this.$refs.addfrom.resetFields()
    },
    // 获取车辆详情
    async getcar(id) {
      console.log(id)
      const { data } = await getcarlist(id)
      this.cardata = data
    },
    // 新增点击确认按钮
    async affaddcar() {
      if (this.isEdit) {
        // 修改
        await update(this.carid, this.cardata)
        this.$message.success('修改成功')
        this.handleClose()
        this.$emit('refesg')
        return
      }
      await add(this.cardata)
      this.$message.success('添加成功')
      this.handleClose()
      this.$emit('refesg')// 向父组件发送请求刷新数据
    }

  }
}

</script>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  