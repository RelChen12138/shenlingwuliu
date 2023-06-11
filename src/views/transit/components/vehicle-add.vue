<!-- 新增编辑车辆 -->
<template>
  <div>
    <el-dialog
      title="新增车辆"
      :visible.sync="isOpen"
      width="32%"
      @close="handleClose"
    >
      <el-form
        ref="formData"
        label-position="right"
        label-width="100px"
        :model="formData"
        :rules="rules"
      >
        <!-- 车辆类型 -->
        <el-form-item
          label="车辆类型"
          style="width: 500px;"
          prop="truckTypeId"
        >
          <el-select
            v-model="formData.truckTypeId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in carTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 车牌号码 -->
        <el-form-item
          prop="licensePlate"
          label="车牌号码"
          style="width: 500px;"
        >
          <el-input
            v-model="formData.licensePlate"
            label="车牌号码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- GPS设备ID -->
        <el-form-item
          prop="deviceGpsId"
          label="GPS设备ID"
          style="width: 500px;"
        >
          <el-input
            v-model="formData.deviceGpsId"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row
        type="flex"
        justify="center"
        style="padding:20px"
      >
        <el-button
          style="width: 90px;"
          type="primary"
          @click="handleSubmit"
        >确 定</el-button>
        <el-button
          style="width: 90px;"
          @click="handleClose"
        >取 消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { truckTypeAdd } from '@/api/transit.js'
export default {
  name: 'VehicleAdd',
  props: {
    carTypeList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    const validateCarNum = (rule, value, callback) => {
      const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('格式不正确'))
      }
    }
    return {
      formData: {
        truckTypeId: null,
        licensePlate: '',
        deviceGpsId: ''
      },
      rules: {
        truckTypeId: [{ required: true, message: '车牌号不能为空' }],
        licensePlate: [{ required: true, message: '车牌号不能为空', trigger: 'blur' }, { validator: validateCarNum, trigger: 'blur' }],
        deviceGpsId: [{ required: true, message: 'GPS设备ID不能为空', trigger: 'blur' }]
      },
      isOpen: false
    }
  },
  methods: {
    // 关闭弹框  (把开关设置在子组件 父组件调用 避免子组件修改父组件的值)
    handleClose() {
      this.isOpen = false
      this.$refs.formData.resetFields()
    },
    handleSubmit() {
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
        // 表单验证通过，执行提交操作
          await truckTypeAdd(this.formData)
          this.$message.success('添加成功')
          this.$emit('update')
          this.handleClose()
        } else {
        // 表单验证失败，提示用户
          return false
        }
      })
    },
    getOpen() {
      this.isOpen = true
    }
  }
}
</script>
<style scoped lang="scss">
/deep/ .el-dialog__body {
  padding: 40px 50px 0 20px !important;
}

</style>
