<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{'on':loginType}" @click="loginType=true">短信登录</a>
          <a href="javascript:;" :class="{'on':!loginType}" @click="loginType=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{'on':loginType}">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
                name="phone"
                v-validate="'required|phone'"
              />
              <!-- 手机号码验证 -->
              <span
                style="color:red"
                v-show="errors.has('phone')"
                class="help is-danger"
              >{{ errors.first('phone')}}</span>

              <!--disabled:为true时,不可点;为false时  -->
              <button
                class="get_verification"
                :disabled="!isRightPhone || computerTime>0"
                :class="{right:isRightPhone}"
                @click.prevent="sendCode"
              >{{computerTime>0?`已发送(${computerTime}s)`:'发送验证码'}}</button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
                name="code"
                v-validate="'required|code'"
              />
              <!-- 验证码的验证 -->
              <span
                style="color:red"
                v-show="errors.has('code')"
                class="help is-danger"
              >{{ errors.first('code')}}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{'on':!loginType}">
            <section>
              <section class="login_message">
                <!-- 使用密码方式登录 : 检测用户名 -->
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                  name="name"
                  v-validate="'required'"
                />
                <span
                  style="color:red"
                  v-show="errors.has('name')"
                  class="help is-danger"
                >{{ errors.first('name')}}</span>
                <span
                  v-show="errors.has('email')"
                  class="help is-danger"
                >{{ errors.first('email') }}</span>
              </section>
              <section class="login_verification">
                <!-- 检测密码 -->
                <input
                  :type="isShowPwd? 'text':'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  name="pwd"
                  v-validate="'required'"
                />
                <span
                  style="color:red"
                  v-show="errors.has('pwd')"
                  class="help is-danger"
                >{{ errors.first('pwd')}}</span>
                <!-- on : 是text -->
                <div
                  class="switch_button"
                  :class="isShowPwd?'on':'off'"
                  @click="isShowPwd=!isShowPwd"
                >
                  <div class="switch_circle" :class="{'rightPwd':isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <!-- 检测图形验证码:  -->
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                  name="captcha"
                  v-validate="'required'"
                />
                <span
                  style="color:red"
                  v-show="errors.has('captcha')"
                  class="help is-danger"
                >{{ errors.first('captcha')}}</span>
                <img
                  class="get_verification"
                  @click="sendPhoto"
                  ref="onePhoto"
                  src="http://localhost:5000/captcha"
                  alt="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
// 引入api
import { reqSendCode, reqLoginSms, reqLoginPwd } from "../../api";
import {RECEIVE_USER} from '../../store/mutation-types'

export default {
  data() {
    return {
      // 默认登录方式为true->是短信登录; false->为密码登录
      loginType: true,
      phone: "", //默认手机号为空
      computerTime: 0, //验证码倒计时
      isShowPwd: false, //为false-->为暗文; true->为明文
      code: "", //短信验证码
      name: "", //用户名
      pwd: "", //密码
      captcha: "" //图形验证码
    };
  },
  computed: {
    isRightPhone() {
      // 获取到phone
      const { phone } = this;
      return /[1]\d{10}/.test(phone); //检测手机号符合规范不
    }
  },
  methods: {
    async sendCode() {
      //修改状态数据computerTime的状态值
      this.computerTime = 10;
      this.timer = setInterval(() => {
        this.computerTime--;
        if (this.computerTime < 0) {
          this.computerTime = 0;
        }
        clearInterval(this.timer);
      }, 1000);

      // 发送短信的请求
      const result = await reqSendCode(this.phone);
      if (result.code === 0) {
        //说明发送验证码请求成功
        alert("验证码发送成功");
      } else {
        //失败
        // 不让倒计时
        this.computerTime = 0;
        // 停止定时器
        clearInterval(this.timer);
        alert("验证码发送失败");
      }
    },
    // 登录-->有两种登录方式:手机验证码登录,用户名密码登录
    async login() {
      let loginMsg;
      const { phone, code, name, pwd, captcha, loginType } = this;
      //判断是哪种方式登录
      if (loginType) {//为true -->说明是短信登录
        loginMsg = ["phone", "code"];
      } else { //为false是-->用户名,密码登录
        loginMsg = ["name", "pwd", "captcha"];
      }
      // 检查表单验证是否完全通过(success返回为true->说明表单验证全部通过;为false-->则验证不通过)
      const success = await this.$validator.validateAll(loginMsg);
      if (success) {
        //表单验证通过
        let result;
        //表单验证成功
        if (loginType) {
          //判断登录方式,为true ->是短信方式登录
          result = await reqLoginSms(phone, code);
        } else {
          // 用户名密码方式登录
          result = await reqLoginPwd({ name, pwd, captcha });
        }
        if (result.code === 0) { //说明请求发送成功
          // 获取到用户信息
          console.log(result);
          this.$store.commit(RECEIVE_USER,result.data)
          // 跳转页面
          this.$router.replace("/profile");
        } else {
          alert("发送请求失败");
        }
      }
    },
    // 发送一次性图形验证码
    sendPhoto() {
      this.$refs.onePhoto.src =
        "http://localhost:5000/captcha?time=" + Date.now();
    }
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped>
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.rightPwd
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>