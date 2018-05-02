<template>
  <div class="register-form">
    <!--手机号-->
    <div class="cell f-cb">
      <div class="cell__title">手机号</div>
      <input type="tel" class="cell__input" placeholder="请输入手机号码" v-model.trim="mobile" />
    </div>
    <!--手机号-->

    <!--验证码-->
    <div class="cell f-cb pr30">
      <div class="cell__title">验证码</div>
      <input type="tel" class="cell__input" placeholder="请输入验证码" v-model.trim="code" />
      <div class="cell__code" @click="getCode()">{{codeText}}</div>
    </div>
    <!--验证码-->

    <!--密码-->
    <div class="cell f-cb">
      <div class="cell__title">密码</div>
      <input type="password" class="cell__input" placeholder="6-20位字母+数字，字母开头" v-model.trim="password" />
    </div>
    <!--密码-->

    <!--确认密码-->
    <div class="cell f-cb">
      <div class="cell__title">确认密码</div>
      <input type="password" class="cell__input" placeholder="请再次输入密码" v-model.trim="spw" />
    </div>
    <!--确认密码-->

    <!--邀请人手机-->
    <div class="cell f-cb">
      <div class="cell__title">邀请人手机</div>
      <input type="tel" class="cell__input" placeholder="请输入邀请人手机" v-model.trim="inviteMobile" :readonly="read" />
    </div>
    <!--邀请人手机-->

    <!--推荐码-->
    <div class="cell f-cb">
      <div class="cell__title">推荐码</div>
      <select class="cell__select" v-model="inviteCode">
        <option :value="item.value" v-for="(item,index) in codeList" :key="index">{{item.title}}</option>
      </select>
    </div>
    <!--推荐码-->

    <!--按钮-->
    <div class="register-form__btn">
      <div class="button" @click="reg()">注册</div>
    </div>
    <!--按钮-->

    <!--协议-->
    <div class="register-form__agree">注册表示同意
      <span @click="showAgreement()">《服务条款协议》</span>
    </div>
    <!--协议-->

  </div>
</template>
<script>
export default {
  data() {
    return {
      codeList: [], //邀请码列表
      value: '',
      mobile: '', //手机号码
      codeText: '获取验证码',
      canGetCode: true,  //是否能发送验证码
      codeTime: 60,  //验证码计时
      code: '',//手机验证码
      password: '',//密码
      spw: '',//确认密码
      inviteMobile: '',//邀请人手机
      inviteCode: '',//推荐码
      read: false,
    }
  },
  mounted() {
    this.getCodeList()
    if (this.$route.query.actcode) {
      this.inviteMobile = this.$route.query.actcode;
      this.read = true;
    }
  },

  methods: {
    //获取验证码
    getCode() {
      if (!this.canGetCode) {
        return;
      }
      if (!this.mobile) {
        this.$toast("请输入手机号码")
        return;
      }
      if (!/^1[3|4|5|7|8]\d{9}$/.test(this.mobile)) {
        this.$toast("手机格式错误")
        return;
      }
      var _this = this;
      this.$http.post('/userCommon/sendCode', {
        mobile: this.mobile,
        type: 1
      }).then(function(res) {
        _this.canGetCode = false;
        var cutdown = setInterval(function() {
          if (_this.codeTime == 0) {
            clearInterval(cutdown);
            _this.codeTime = '60';
            _this.codeText = '获取验证码';
            _this.canGetCode = true;
          } else {
            _this.codeTime--;
            _this.codeText = _this.codeTime + 's后获取';
          }
        }, 1000);
      })
    },
    //获取推荐码列表
    getCodeList() {
      var _this = this;
      this.$http.get('/common/recommendCodeList')
        .then(function(res) {
          _this.codeList = res.data.returnData.list;
        })
    },
    //注册
    reg() {
      if (!this.mobile) {
        this.$toast("请输入手机号码")
        return;
      }
      if (!/^1[3|4|5|7|8]\d{9}$/.test(this.mobile)) {
        this.$toast("手机格式错误")
        return;
      }
      if (!this.code) {
        this.$toast("请输入验证码")
        return;
      }
      if (!this.password) {
        this.$toast("请输入密码")
        return;
      }
      if (!/^[a-zA-Z]\w{5,19}$/.test(this.password)) {
        this.$toast("密码格式错误,6-20位字母+数字组合，以字母开头")
        return;
      }
      if (!this.spw) {
        this.$toast("请输入确定密码")
        return;
      }
      if (this.spw != this.password) {
        this.$toast("确认密码必须和密码相同")
        return;
      }
      if (this.inviteMobile == this.mobile) {
        this.$toast("邀请人手机号码不能是本人")
        return;
      }
      let datas;
      datas = {
        passwd: this.password,
        code: this.code,
        mobile: this.mobile,
      }
      if (this.inviteCode || this.inviteMobile) {
        datas.reg_invite_mobile = this.inviteMobile;
        datas.reg_invite_code = this.inviteCode;
      }
      var _this = this;
      this.$http.post('/userCommon/resign', datas)
        .then(function(res) {
          _this.$toast("注册成功！")
          _this.mobile = ''
          _this.code = ''
          _this.password = ''
          _this.spw = ''
          _this.inviteMobile = ''
          _this.inviteCode = ''
          _this.$store.commit('TAB_LOGIN_CHOOSE', 0)
        })
    },
    showAgreement(){
      this.$store.commit('SET_REGISET_ARGREEMENT',true)
    }
  },
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.register-form {
  padding-left: .3rem;
  &__btn {
    margin-top: .7rem;
  }
  &__agree {
    text-align: center;
    font-size: .26rem;
    line-height: 1;
    color: #999;
    margin-top: .38rem;
    span {
      color: #ff5a59;
    }
  }
}
</style>
