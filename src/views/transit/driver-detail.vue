<!-- 司机详情 -->
<template>
  <div
    class="dashboard-container driver-detail"
    :class="currentStyle"
  >
    <!-- 基本信息第一套模板 -->
    <div v-if="isShow">
      <el-card shadow="never">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            id="tab"
            label="基本信息"
            name="first"
          >
            <el-form
              label-position="right"
              :model="userInfo"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="员工编号:">
                    <el-input
                      v-model="userInfo.account"
                      inline="true"
                      disabled
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="司机名称:">
                    <el-input
                      v-model="userInfo.name"
                      inline="true"
                      disabled
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    v-if="userInfo.agency"
                    label="所属机构:"
                  >
                    <el-input
                      v-model="userInfo.agency.name"
                      inline="true"
                      disabled
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="电话:">
                    <el-input
                      v-model="userInfo.mobile"
                      inline="true"
                      disabled
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                  <div id="editAvatar">
                    <span>头像:</span>
                    <el-avatar
                      fit="fill"
                      :src="picture"
                      shape="square"
                      :size="100"
                    ></el-avatar>
                  </div>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄:">
                    <el-input
                      v-model="userInfo.age"
                      inline="true"
                      disabled
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8"></el-col>
              </el-row>
              <el-button
                class="active"
                @click="handleEdit"
              >编辑</el-button>
            </el-form>
          </el-tab-pane>
          <!-- 驾驶证第一套模板 -->
          <el-tab-pane
            label="驾驶证信息"
            name="second"
          >
            <div v-if="isShow">
              <el-form
                label-position="right"
                :model="driverCardInfo"
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="驾驶证号:">
                      <el-input
                        v-model="driverCardInfo.licenseNumber"
                        inline="true"
                        disabled
                        style="width: 203px"
                        type="search"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="准驾车型:">
                      <el-input
                        v-model="driverCardInfo.allowableType"
                        inline="true"
                        disabled
                        style="width: 203px"
                        type="search"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      v-if="driverCardInfo.initialCertificateDate"
                      label="初次领证日期:"
                    >
                      <el-input
                        v-model="driverCardInfo.initialCertificateDate"
                        inline="true"
                        disabled
                        style="width: 203px"
                        type="search"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="驾驶证有效期限:">
                      <el-input
                        v-model="driverCardInfo.validPeriod"
                        inline="true"
                        disabled
                        style="width: 203px"
                        type="search"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="驾龄:">
                      <el-input
                        v-model="driverCardInfo.driverAge"
                        inline="true"
                        disabled
                        style="width: 203px"
                        type="search"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="驾驶证类型:">
                      <el-input
                        v-model="driverCardInfo.age"
                        inline="true"
                        disabled
                        style="width: 203px"
                        type="search"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="从业资格证:">
                      <el-input
                        v-model="driverCardInfo.qualificationCertificate"
                        inline="true"
                        disabled
                        style="width: 203px"
                        type="search"
                      ></el-input> </el-form-item></el-col>
                  <el-col :span="8">
                    <el-form-item label="入场证信息:">
                      <el-input
                        v-model="driverCardInfo.passCertificate"
                        inline="true"
                        disabled
                        style="width: 203px"
                        type="search"
                      ></el-input> </el-form-item></el-col>
                  <el-col :span="8"></el-col>
                </el-row>
                <el-row>
                  <div id="editAvatar">
                    <span>头像:</span>
                    <el-avatar
                      fit="fill"
                      :src="picture"
                      shape="square"
                      :size="100"
                    ></el-avatar>
                  </div>
                </el-row>
                <el-button
                  class="active"
                  @click="handleEdit"
                >编辑</el-button>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <!-- 基本信息第二套模板 -->
    <div v-else>
      <el-card shadow="never">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            id="tab"
            label="基本信息"
            name="first"
          >
            <el-form
              label-position="right"
              :model="userInfo"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="员工编号:">
                    <el-input
                      v-model="userInfo.account"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="司机名称:">
                    <el-input
                      v-model="userInfo.name"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    v-if="userInfo.agency"
                    label="所属机构:"
                  >
                    <el-input
                      v-model="userInfo.agency.name"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="电话:">
                    <el-input
                      v-model="userInfo.mobile"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                  <div id="prevAvatar">
                    <span>头像:</span>
                    <el-avatar
                      :src="picture"
                      shape="square"
                      :size="100"
                      style="cursor: zoom-in"
                    ></el-avatar>
                  </div>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄:">
                    <el-input
                      v-model="userInfo.age"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8"></el-col>
              </el-row>
              <template>
                <el-button
                  class="active"
                  @click="handleSave"
                >保存</el-button>
                <el-button @click="handleCancel">取消</el-button>
              </template>
            </el-form>
          </el-tab-pane>
          <!-- 驾驶证第二套模板 -->
          <el-tab-pane
            label="驾驶证信息"
            name="second"
          >
            <el-form
              label-position="right"
              :model="driverCardInfo"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="驾驶证号:">
                    <el-input
                      v-model="driverCardInfo.licenseNumber"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="准驾车型:">
                    <el-input
                      v-model="driverCardInfo.allowableType"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    v-if="driverCardInfo.initialCertificateDate"
                    label="初次领证日期:"
                  >
                    <el-input
                      v-model="driverCardInfo.initialCertificateDate"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="驾驶证有效期限:">
                    <el-input
                      v-model="driverCardInfo.validPeriod"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾龄:">
                    <el-input
                      v-model="driverCardInfo.driverAge"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="驾驶证类型:">
                    <el-input
                      v-model="driverCardInfo.licenseType"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="从业资格证:">
                    <el-input
                      v-model="driverCardInfo.qualificationCertificate"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input> </el-form-item></el-col>
                <el-col :span="8">
                  <el-form-item label="入场证信息:">
                    <el-input
                      v-model="driverCardInfo.passCertificate"
                      inline="true"
                      style="width: 203px"
                      type="search"
                    ></el-input> </el-form-item></el-col>
                <el-col :span="8"></el-col>
              </el-row>
              <el-row>
                <div id="editAvatar">
                  <span>头像:</span>
                  <el-avatar
                    fit="fill"
                    :src="picture"
                    shape="square"
                    style="cursor: zoom-in"
                    :size="100"
                  ></el-avatar>
                </div>
              </el-row>
              <el-button
                class="active"
                @click="handleSave"
              >保存</el-button>
              <el-button @click="handleCancel">取消</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDriver, saveDriver, getDriverCard } from '@/api/driver'
export default {
  data() {
    return {
      activeName: 'first',
      isShow: true,
      userInfo: {},
      userid: '',
      picture: require('@/assets/avatar/1d22f3e41d284f50b2c8fc32e0788698.jpeg'),
      driverCardInfo: {}
    }
  },
  computed: {
    currentStyle() {
      return this.isShow ? 'style1' : 'style2'
    }
  },
  async created() {
    // 获取司机基本信息
    await this.$nextTick() // 等待页面渲染完成
    this.userid = this.$router.currentRoute.query.id
    console.log(this.userid)
    if (this.userid) {
      await this.iniDate()
      await this.iniDateDriverCard()
    }
  },
  methods: {
    async iniDate() {
      const res = await getDriver(this.userid)
      this.userInfo = res.data
      // console.log(this.userInfo)
    },
    handleEdit() {
      this.isShow = !this.isShow
      // console.log(this.isShow)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleCancel() {
      this.isShow = true
    },
    // 保存司机信息修改
    async handleSave() {
      await saveDriver(this.userid, this.userInfo)
      this.$message.success('保存成功')
      this.isShow = !this.isShow
    },
    async iniDateDriverCard() {
      // 获取司机驾驶证信息
      const res = await getDriverCard(this.userid)
      this.driverCardInfo = res.data
    }
  }
}
</script>
<style lang="scss" scoped>
.style1 {
  padding: 20px;
  form {
    text-align: center;
    /deep/ .el-form-item__label {
      font-weight: normal;
    }
    #editAvatar,
    #prevAvatar {
      text-align: left;
      span {
        vertical-align: top;
      }
    }
  }
}

.style1 /deep/ .el-input.is-disabled .el-input__inner {
  border: none;
  background-color: #ffffff;
  box-shadow: none;
  pointer-events: none;
  cursor: not-allowed;
  color: #000;
}
.style1 .active {
  color: #fff;
  background-color: #ff643d;
}

.style2 {
  padding: 20px;
  form {
    text-align: center;
    /deep/ .el-form-item__label {
      font-weight: normal;
    }
    .el-button:focus,
    .el-button:hover {
      color: #ffffff;
      background-color: #e15536;
    }
    #editAvatar,
    #prevAvatar {
      text-align: left;
      span {
        vertical-align: top;
      }
    }
  }
}
.style2 .active {
  color: #fff;
  background-color: #ff643d;
}
</style>
