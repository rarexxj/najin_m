<template>
<div id="projects">
  <div class="projects">
    <!--头部切换-->
    <tab></tab>
    <!--头部切换-->

    <!--筛选-->
    <sort></sort>
    <!--筛选-->

    <!--投资项目分类-->
    <transition name="slide-top">
      <screen v-show="showScreen"></screen>
    </transition>
    <!--投资项目分类-->

    <!--投资项目列表-->
    <project-list v-show="projectChoose == 0" v-if="loadProjects"></project-list>
    <!--投资项目列表-->

    <!--债权转让列表-->
    <creditor-list v-show="projectChoose == 1" v-if="loadCreditor"></creditor-list>
    <!--债权转让列表-->
  </div>
  <nav-bar :num="1"></nav-bar>
</div>
</template>
<script>
  import Navbar from '../Common/Navbar.vue'
  import Tab from './Tab.vue'
  import Sort from './Sort.vue'
  import Screen from './Screen.vue'
  import ProjectList from './ProjectsList.vue'
  import CreditorList from './CreditorList.vue'
  import {mapState} from 'vuex'
  export default{
    computed: mapState({
      showScreen: state => state.projects.showScreen,  //是否显示隐藏筛选框
      projectChoose: state => state.projects.projectChoose,  //选中投资项目/债权转让
      loadProjects: state => state.projects.loadProjects,  //是否
      loadCreditor: state => state.projects.loadCreditor,  //是否
    }),
    components:{
      'nav-bar':Navbar,
      'tab':Tab,
      'sort':Sort,
      'screen':Screen,
      'project-list':ProjectList,
      'creditor-list':CreditorList
    },
    mounted(){
    //type 为0 则显示投资项目 为1 则显示平台公告
    if(this.$route.query.type == 1 || this.$route.query.type == null){
      this.$store.commit('LOAD_PROJECTS');
      this.$store.commit('TAB_PROJECTS',0);
    }else{
      this.$store.commit('LOAD_CREDITOR');
      this.$store.commit('TAB_PROJECTS',1);
    }
  }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .projects{
    height: 100%;
    padding-bottom: 0.98rem;
  }
</style>
