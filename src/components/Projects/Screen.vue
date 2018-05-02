<template>
  <div class="screen">
    <div class="screen__title">筛选项目 <div class="screen__close" @click="hideScreen()">╳</div></div>
    <div class="screen__list">
        <div class="screen__list__line f-cb">
          <div class="screen__list__title">项目状态：</div>
          <div :class="[chooseProjectsStatus == index ? 'screen__list__item--active':'screen__list__item']" v-for="(item,index) in projectsStatus" :key="index" @click="changeStatus(index)">{{item.name}}</div>
        </div>
      <div class="screen__list__line f-cb">
        <div class="screen__list__title">产品分类：</div>
        <div :class="[chooseProjectsType == index ? 'screen__list__item--active':'screen__list__item']" v-for="(item,index) in projectsType" :key="index" @click="changeType(index)">{{item.name}}</div>
      </div>
      <div class="screen__list__line f-cb">
        <div class="screen__list__title">年华利率：</div>
        <div :class="[chooseProjectsRate == index ? 'screen__list__item--active':'screen__list__item']" v-for="(item,index) in projectsRate" :key="index" @click="changeRate(index)">{{item.name}}</div>
      </div>
      <div class="screen__list__line f-cb">
        <div class="screen__list__title">投资期限：</div>
        <div :class="[chooseProjectsCycle == index ? 'screen__list__item--active':'screen__list__item']" v-for="(item,index) in projectsCycle" :key="index" @click="changeCycle(index)">{{item.name}}</div>
      </div>
    </div>
    <div class="screen__btn" @click="hideScreen()">确认</div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    computed: mapState({
      projectsStatus: state => state.projects.projectsStatus,  //项目状态列表
      chooseProjectsStatus: state => state.projects.chooseProjectsStatus,  //选中的项目状态
      projectsType: state => state.projects.projectsType,  //产品分类列表
      chooseProjectsType: state => state.projects.chooseProjectsType,  //选中的产品分类
      projectsRate: state => state.projects.projectsRate,  //年华利率列表
      chooseProjectsRate: state => state.projects.chooseProjectsRate,  //选中的年华利率
      projectsCycle: state => state.projects.projectsCycle,  //投资期限列表
      chooseProjectsCycle: state => state.projects.chooseProjectsCycle,  //选中的投资期限
    }),
  	methods:{
    	//隐藏筛选框
      hideScreen(){
        this.$store.commit('SET_PROJECTS_SCREEN',false)
      },
      //切换项目状态
      changeStatus(index){
        this.$store.dispatch('changeProjectsStatus',index)
      },
      //切换项目状态
      changeType(index){
        this.$store.dispatch('changeProjectsType',index)
      },
      //切换年化利率
      changeRate(index){
      	this.$store.dispatch('changeProjectsRate',index)
      },
      //切换投资期限
      changeCycle(index){
      	this.$store.dispatch('changeProjectsCycle',index)
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .screen{
    background: #fff;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 21;
    &__close{
      font-size: .26rem;
      line-height: 1;
      color: #666;
      position: absolute;
      right: .35rem;
      top: .37rem;
    }
    &__title{
      height: 1rem;
      width: 100%;
      text-align: center;
      font-size: .3rem;
      line-height: 1rem;
      border-bottom: 1px solid #eee;
      position: relative;
    }
    &__list{
      position: absolute;
      width: 100%;
      top: 1rem;
      bottom: 1rem;
      background: #f4f4f4;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      &__line{
        margin: .12rem 0 0 .3rem;
      }
      &__title{
        line-height: .24rem;
        height: .24rem;
        margin: .3rem 0;
        color: #888;
        font-size: .26rem;
        padding-left: .1rem;
        width: 100%;
        border-left: 1px solid #ff5a59;
      }
      &__item{
        float: left;
        margin: 0 .2rem .2rem 0;
        width: 1.56rem;
        text-align: center;
        height: .8rem;
        line-height: .8rem;
        font-size: .26rem;
        color: #333;
        background: #fff;
        border-radius: .04rem;
        &--active{
          @extend .screen__list__item;
          background: #ff5a59;
          color: #fff;
        }
      }
    }
    &__btn{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      background: #ff5a59;
      color: #fff;
      font-size: .32rem;
      text-align: center;
    }
  }
</style>
