<template>
  <div id="index" class="index">
    <div class="scroll-box">
      <!--轮播图-->
      <banner></banner>
      <!--轮播图-->

      <div class="index__content">
        <!--公告-->
        <notice></notice>
        <!--公告-->

        <!--新手专享-->
        <novice></novice>
        <!--新手专享-->

        <!--推荐项目-->
        <projects></projects>
        <!--推荐项目-->
      </div>
    </div>
    <nav-bar :num="0"></nav-bar>
  </div>
</template>
<script>
  import Navbar from '../Common/Navbar.vue'
  import Banner from './Banner.vue'
  import Notice from './Notice.vue'
  import Novice from './Novice.vue'
  import Projects from './Projects.vue'
  export default{
    components:{
    	'nav-bar':Navbar,
      'banner':Banner,
      'notice':Notice,
      'novice':Novice,
      'projects':Projects
    },
    mounted(){
      this.getBanner();
    },
    methods:{
      getBanner(){
        this.$store.dispatch('getWelcomeBanner')
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .index{
    padding-bottom: 0.98rem;
    height: 100%;
    overflow: hidden;
    &__content{
      padding: .2rem;
    }
  }
</style>
