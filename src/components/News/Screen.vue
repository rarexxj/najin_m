<template>
  <div class="screen">
      <div class="screen-box">
          <div :class="[type == item.type?'screen__item--active':'screen__item']" v-for="(item,index) in list" :key="index" @click="tabNotice(item.type)">{{item.title}}</div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          list:[{
              title:'发标公告',
              type:'2'
          },{
              title:'网站公告',
              type:'3'
          },{
              title:'活动公告',
              type:'4'
          }]
      }
  },
  computed:{
      type(){
          return this.$store.state.news.noticeType
      }
  },
  methods:{
      //切换公告类型
      tabNotice(type){
        this.$store.commit('CHANGE_NOTICE_TYPE',type)
        this.$store.dispatch('getNoticeList')
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