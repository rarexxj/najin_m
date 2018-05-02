<template>
  <div class="screen">
      <div class="screen-box">
          <div :class="[type == item.type?'screen__item--active':'screen__item']" v-for="(item,index) in list" :key="index" @click="tabAssign(item.type)">{{item.title}}</div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          list:[{
              title:'可转让',
              type:'4'
          },{
              title:'转让中',
              type:'1'
          },{
              title:'已转让',
              type:'2'
          }]
      }
  },
  computed:{
      type(){
          return this.$store.state.assignlist.type
      }
  },
  methods:{
      //切换公告类型
      tabAssign(type){
        this.$store.commit('TAB_ASSIGNLIST',type)
        if(type == 1){
            this.$store.commit('LOAD_TRANSFERRING')
        }   
        if(type == 2){
            this.$store.commit('LOAD_TRANSFERRED')
        }
      }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .screen {
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
        @extend .screen__item;
        color:#ff5a59;
      }
    }
  }

  .screen-box {
    display: flex;
    height: .9rem;
    width: 100%;
  }
</style>
