<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive exclude="projectinfo,projectbuy,investmentlist,creditorinfo,newsinfo,investment,assigninfo">
        <router-view :class="['main',needSilde?'transition':'']"></router-view>
      </keep-alive>
    </transition>

    <!-- 全局登录窗口组件 -->
    <transition name="slide-top">
      <div class="login" v-show="showLoginBox">
        <login-header :num="loginChoose" type="0"></login-header>
        <register-form v-show="loginChoose == 1"></register-form>
        <login-form v-show="loginChoose == 0" type="0"></login-form>
      </div>
    </transition>
    <!-- 全局登录窗口组件 -->

    <transition name="slide-go-left">
      <forget type="0" v-if="showForgetBox"></forget>
    </transition>

    <!-- 全局注册协议 -->
    <transition name="slide-go-left">
      <agreement :content="agreementContent" :title="agreementTitle" v-show="showRegisterAgreement" @hide="hideAgreement"></agreement>
    </transition>
    <!-- 全局注册协议 -->


  </div>
</template>
<script>
  import LoginHeader from './components/Login/LoginHeader.vue'
  import RegisterForm from './components/Register/RegisterForm'
  import LoginForm from './components/Login/LoginForm'
  import Forget from './components/Forget/Forget'
  import Agreement from './components/Common/Agreement'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        transitionName: '',
        agreementContent:'',
        agreementTitle:''
      }
    },
    name: 'app',
    computed: mapState({
      needSlide:function(state){
        state.needSilde
      },
      needSilde: state => state.needSilde,  //项目状态列表
      loginChoose: state => state.loginChoose,  //项目状态列表
      showLoginBox: state => state.showLoginBox, //是否显示全局登录组件
      showForgetBox: state => state.showForgetBox, //是否显示全局忘记组件
      showRegisterAgreement: state => state.showRegisterAgreement, //是否显示全局注册协议
    }),
    components: {
      'login-header': LoginHeader,
      'register-form': RegisterForm,
      'login-form': LoginForm,
      'forget':Forget,
      'agreement':Agreement
    },
    mounted(){
      this.getIndexConfig();
      this.getAgreement();
    },
    methods:{
      getIndexConfig(){
        var _this = this;
        this.$http.get('/common/index_config')
          .then(function (res) {
            _this.$store.commit('SET_INDEXCONFIG', res.data.returnData);
          })
      },
      //获取注册协议
      getAgreement(){
        var _this = this;
        this.$http.get('/common/contractList?type=1')
          .then(function (res) {
            _this.agreementContent = res.data.returnData.content;
            _this.agreementTitle = res.data.returnData.title;

          })
      },
      hideAgreement(){
        this.$store.commit('SET_REGISET_ARGREEMENT',false)
      }
    },
    watch: {
      '$route'(to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (toDepth == fromDepth) {  //同级路径不加过渡效果，去除transition效果
          this.$store.commit('SET_SLIDE', false)
        } else {
          this.$store.commit('SET_SLIDE', true)
        }
        this.transitionName = toDepth == fromDepth ? '' : (toDepth < fromDepth ? 'slide-right' : 'slide-left')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .login {
    height: 100%;
    width: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 40;
  }
</style>
