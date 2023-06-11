<!-- 车型添加 -->
<template>
  <el-dialog
    :title="id !== null ? '编辑车型' : '新增车型'"
    :visible="showDialog"
    width="40%"
    @close="onClose"
  >
    <el-form
      ref="ruleForm"
      label-width="150px"
      :model="CarDetailsData"
      :rules="Carrules"
    >
      <el-form-item
        label="车辆类型"
        prop="name"
      >
        <el-input
          v-model="CarDetailsData.name"
          placeholder="请输入车辆类型"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="应载重量"
        prop="allowableLoad"
      >
        <el-input
          v-model="CarDetailsData.allowableLoad"
          maxlength="10"
          placeholder="请输入车型载重"
        >
          <template slot="suffix"><span class="righttext">吨</span></template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="应载体积"
        prop="allowableVolume"
      >
        <el-input
          v-model="CarDetailsData.allowableVolume"
          maxlength="10"
          placeholder="请输入车型体积"
        >
          <template slot="suffix"><span class="righttext">立方</span></template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="长"
        prop="measureLong"
      >
        <el-input
          v-model="CarDetailsData.measureLong"
          placeholder="请输入长"
          maxlength="10"
        >
          <!-- <template slot="prefix">0.0</template> -->
          <template slot="suffix"><span class="righttext">米</span></template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="宽"
        prop="measureWidth"
      >
        <el-input
          v-model="CarDetailsData.measureWidth"
          placeholder="请输入宽"
          maxlength="10"
        >
          <template slot="suffix"><span class="righttext">米</span></template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="高"
        prop="measureHigh"
      >
        <el-input
          v-model="CarDetailsData.measureHigh"
          placeholder="请输入高"
          maxlength="10"
        >
          <template
            slot="suffix"
          ><span class="righttext">米</span></template></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row
        type="flex"
        justify="center"
      >
        <el-button
          style="background: #e15536; width: 80px; color: #fff"
          @click="submit"
        >确定</el-button>
        <el-button
          style="width: 80px; color: #000"
          @click="onClose"
        >取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>
<script>
import { add, detail, update } from '@/api/transit'

export default {
  name: 'CarModelsAdd',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 应载重量 应载体积的自定义校验
    const Numonehundred = (rule, value, callback) => {
      if (Number.isInteger(Number(value)) && Number(value) < 101 && Number(value) > 0) {
        callback()
      } else {
        callback(new Error('只能输入1-100之间的正整数，请重新输入'))
      }
    }

    const perseFloatNum = (rule, value, callback) => {
      const reg = /^\d+.?\d{0,2}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('只能输入数字类型，最多保留两位小数，请重新输入'))
      }
    }

    // 表单长度的自定义校验
    const LongMax = (rule, value, callback) => {
      if (Number(value) < 100) {
        callback()
      } else {
        callback(new Error('长最多只能输入100，请重新输入'))
      }
    }

    // 表单宽度的自定义校验
    const WidthMax = (rule, value, callback) => {
      if (Number(value) < 101) {
        callback()
      } else {
        callback(new Error('宽最多只能输入100，请重新输入'))
      }
    }

    // 表单高度的自定义校验
    const HightMax = (rule, value, callback) => {
      if (Number(value) < 101) {
        callback()
      } else {
        callback(new Error('高最多只能输入100，请重新输入'))
      }
    }

    return {
      CarDetailsData: {
        name: '',
        allowableLoad: '',
        allowableVolume: '',
        measureLong: '0.0',
        measureWidth: '0.0',
        measureHigh: '0.0'
      },
      id: null,
      // 表单校验规则
      Carrules: {
        name: [
          { required: true, message: '车型名称不能为空', trigger: 'blur' }
        ],
        allowableLoad: [
          { required: true, message: '应载重量不能为空', trigger: 'blur' },
          { validator: Numonehundred, trigger: 'blur' }

        ],
        allowableVolume: [
          { required: true, message: '应载体积不能为空', trigger: 'blur' },
          { validator: Numonehundred, trigger: 'blur' }
        ],
        measureLong: [
          { validator: LongMax, trigger: 'blur' },
          { validator: perseFloatNum, trigger: 'blur' }
        ],
        measureWidth: [
          { validator: WidthMax, trigger: 'blur' },
          { validator: perseFloatNum, trigger: 'blur' }
        ],
        measureHigh: [
          { validator: HightMax, trigger: 'blur' },
          { validator: perseFloatNum, trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    // 弹窗关闭
    onClose() {
      this.$emit('update:showDialog', false)
      this.$refs.ruleForm.resetFields()
      this.id = null
      this.CarDetailsData = {
        name: '',
        allowableLoad: '',
        allowableVolume: '',
        measureLong: '0.0',
        measureWidth: '0.0',
        measureHigh: '0.0'
      }
    },
    // 获取车辆详情
    async gatCarDetails(id) {
      this.id = id
      const res = await detail(id)
      this.CarDetailsData = res.data
      // console.log(res.data)
    },
    async submit() {
      await this.$refs.ruleForm.validate()
      // 编辑
      if (this.id !== null) {
        await update(this.id, this.CarDetailsData)
        this.$emit('update-list')
        this.$message.success('编辑成功')
      } else {
        // 新增
        const res = await add(this.CarDetailsData)
        if (res.code === 1) {
          this.$message.success('新增失败')
        } else {
          this.$message.success('新增成功')
          this.$emit('update-list')
        }
      }
      this.onClose()
    }
  }
}
</script>
<style scoped>
.righttext{
margin-right: 14px;
color: black;
}
</style>
