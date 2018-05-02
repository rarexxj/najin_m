<template>
  <div class="sort">
    <!--投资项目排序-->
    <div class="sort-box" v-show="projectChoose == 0">
      <div :class="[chooseProjectsSort == index ? 'sort__item--active':'sort__item']"
           v-for="(item,index) in projectsSort" @click="changeSort(index)" :key="index">{{item.name}}
      </div>
    </div>
    <!--投资项目排序-->

    <!--债权转让排序-->
    <div class="sort-box" v-show="projectChoose == 1">
      <div :class="[chooseCreditorClass == index ? 'sort__item--active':'sort__item']"
           v-for="(item,index) in creditorClass" @click="changeClass(index)" :key="index">{{item.name}}
      </div>
    </div>
    <!--债权转让排序-->
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    computed: mapState({
      projectsSort: state => state.projects.projectsSort,  //排序列表
      chooseProjectsSort: state => state.projects.chooseProjectsSort,  //选中的排序条件
      projectChoose: state => state.projects.projectChoose,  //选中投资项目/债权转让
      creditorClass: state => state.projects.creditorClass, //债权转让筛选列表
      chooseCreditorClass: state => state.projects.chooseCreditorClass, //选中的债权筛选
    }),
    methods:{
    	//切换投资项目排序
      changeSort(index){
      	this.$store.dispatch('changeProjectsSort',index)
      },
      //切换债权转让筛选
      changeClass(index){
      	this.$store.dispatch('changeCreditorClass',index)
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .sort {
    background: #fff;
    height: .9rem;
    width: 100%;
    position: absolute;
    left: 0;
    top: .88rem;
    z-index: 5;
    border-bottom: 1px solid #eee;
    &__item {
      flex: 1;
      height: .9rem;
      text-align: center;
      line-height: .9rem;
      color: #999;
      &--active {
        @extend .sort__item;
        color: #333;
      }
    }
  }

  .sort-box {
    display: flex;
    height: .9rem;
    width: 100%;
  }
</style>
