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
import { add, update } from '@/api/transit'
import { getcarlist } from '@/api/carID'
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
      rules: {
        name: [{ required: true, message: '车辆类型不能为空', trigger: ['blur', 'change'] }],
        allowableVolume: [{ required: true, message: '车辆体积不能为空', trigger: ['blur', 'change'] }],
        allowableLoad: [{ required: true, message: '车辆载重不能为空', trigger: ['blur', 'change'] }]
      },
      isEdit: false
    }
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
<style scoped>
.righttext{
margin-right: 14px;
color: black;
}
</style>
