<template>
  <div id="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field v-model="user.mobile" name="手机号" placeholder="请输入手机号">
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field v-model="user.code" name="验证码" placeholder="请输入验证码"
        ><i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-button class="send-sms-btn" round size="small" type="default"
            >发送验证码</van-button
          >
        </template></van-field
      >
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async onSubmit(values) {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      // 3.发请求提交
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true   //禁用背景
      })
      try {
        const res = await login(user)
        console.log(res)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录失败,手机号或验证码错误', err)
        } else {
          console.log('登录失败,请稍后重试')
        }
      }
      // 4.根据请求结果做下一步处理
    }
  }
}
</script>

<style lang="less" scoped>
#login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
