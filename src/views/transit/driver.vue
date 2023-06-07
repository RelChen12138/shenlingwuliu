<template>
  <div class="driver">
    <el-card shadow="never">
      <el-form
        label-position="left"
        :model="form"
      >
        <el-col :span="8">
          <el-form-item
            prop="number"
            label="司机账号:"
          >
            <el-input
              inline="true"
              style="width:203px;"
              type="search"
              placeholder="请输入司机账号"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="jigou"
            label="所属机构:"
          >
            <el-select placeholder="请选择所属机构"></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="name"
            label="司机姓名:"
          >
            <el-input
              inline="true"
              style="width:203px;"
              type="search"
              placeholder="请输入司机姓名"
            ></el-input>
          </el-form-item>
          <div>
            <el-button
              type="primary"
              size="medium"
            >搜索</el-button>
            <el-button size="medium">重置</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="pnumber"
            label="司机手机号:"
          >
            <el-input
              inline="true"
              style="width:203px;"
              type="search"
              placeholder="请输入司机手机号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
