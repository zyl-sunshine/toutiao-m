<template>
  <div id="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="userFromRules.mobile"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFromRules.code"
        type="number"
        maxlength="6"
        ><i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-button
            v-if="isCountDownShow"
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
          >
            <van-count-down
              :time="1000 * 10"
              format="ss s"
              @finish="isCountDownShow = false"
          /></van-button>

          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
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
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 表单验证
      userFromRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          {
            pattern: /^1[3|4|5|7|8][0-9]{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          }
        ]
      },
      // 控制倒计时的显示与隐藏
      isCountDownShow: false
    }
  },
  methods: {
    onSubmit(values) {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 2000
      })
      // 3.发请求提交
      // try {
      //   const res = await login(user)
      //   this.$toast.success('登录成功')
      //   // console.log('登录成功', res)
      // } catch (err) {
      //   if (err.response.status === 400) {
      //     this.$toast.fail('登录失败,手机号或验证码错误')
      //   } else {
      //     this.$toast.fail('登录失败,请稍后重试')
      //   }
      // }
      login(user)
        .then(({ data: res }) => {
          this.$toast.success('登录成功')
          // console.log(res.data)
          // 登录成功将token存储到浏览器
          this.$store.commit('setUser', res.data)
          this.$router.push('/my')
        })
        .catch(err => {
          if (err.response.status === 400) {
            this.$toast.fail('登录失败,手机号或验证码错误')
          } else {
            this.$toast.fail('登录失败,请稍后重试')
          }
        })
      // 4.根据请求结果做下一步处理
    },
    // 点击验证码
    onSendSms() {
      // 点击获取验证码按钮进行手机号的表单验证
      this.$refs.loginForm
        .validate('mobile')
        .then(() => {
          this.$toast.success('验证成功')
          // 验证通过显示倒计时
          this.isCountDownShow = true
        })
        .catch(() => {
          this.$toast.fail('请输入手机号')
        })
      // 调用接口发送验证码
      sendSms(this.user.mobile)
        .then(() => {
          this.$toast('发送验证码成功')
        })
        .catch(err => {
          // console.log(err)
          this.isCountDownShow = false
          if (err.response.status === 429) {
            this.$toast('发送太频繁了,请稍后再试')
          } else {
            this.$toast.fail('发送验证码失败')
          }
        })
      // 校验手机号
      // try {
      //   await this.$refs.loginForm.validate('mobile')
      // } catch (err) {
      //   return console.log('校验失败')
      // }
      // 校验成功 显示
      // this.isCountDownShow = true
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
