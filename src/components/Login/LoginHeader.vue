<template>
  <div class="login__header">
    <div class="login__header__back" @click="back()"></div>
    <div class="login__header__btnlist">
      <div :class="[num == 0?'login__header__btn--active':'login__header__btn']" @click="login()">登录</div>
      <div class="login__header__line"></div>
      <div :class="[num == 1?'login__header__btn--active':'login__header__btn']" @click="reg()">注册</div>
    </div>
    <div class="login__header__arrow" :style="{left:arrowLeft + 'rem'}"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['num', 'type'],  //type 表示全局登录组件或者登录页面
  computed: {
    arrowLeft() {  //箭头位置
      if (this.num == 0) {
        return 1.85
      } else {
        return 5.4
      }
    },
    account(){
      return this.$store.state.userInfo.account
    }
  },
  methods: {
    login() {
      if (this.type == 0) {
        this.$store.commit('TAB_LOGIN_CHOOSE',0)
      } else {
        this.$router.push({name:'login'})
      }
    },
    reg() {
      if (this.type == 0) {
        this.$store.commit('TAB_LOGIN_CHOOSE',1)
      } else {
        this.$router.push({name:'register'})
      }
    },
    back(){
      if(this.type == 0){
        if(this.account){  //登录失效状态，拒绝登录则调回首页
          this.$router.push({name:'index'})
          setTimeout(() => {
            this.$store.commit('SHOW_GLOBAL_LOGIN',false)
          },400)
        }else{  //未登录状态，关闭登录框
          this.$store.commit('SHOW_GLOBAL_LOGIN',false)
        }
      }else{  
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.login__header {
  width: 100%;
  height: 3.4rem;
  background: url("../../assets/img/login_banner.png") no-repeat;
  background-size: contain;
  position: relative;
  &__back {
    width: .28rem;
    height: .28rem;
    background: url("../../assets/img/login_header_close.png") no-repeat;
    background-size: contain;
    position: absolute;
    left: .3rem;
    top: .3rem;
  }
  &__btnlist {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: .35rem;
    padding: 0 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__btn {
    width: 1.6rem;
    height: .6rem;
    opacity: .7;
    background: #000;
    text-align: center;
    line-height: .6rem;
    color: #fff;
    border-radius: .3rem;
    &--active {
      @extend .login__header__btn;
      opacity: 1;
    }
  }
  &__line {
    width: 2px;
    height: .33rem;
    background: #fff;
    opacity: .4;
  }
  &__arrow {
    width: .24rem;
    height: .24rem;
    position: absolute;
    background: url("../../assets/img/login_header_arrow.png") no-repeat;
    background-size: contain;
    bottom: -.12rem;
  }
}
</style>
