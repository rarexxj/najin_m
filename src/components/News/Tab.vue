<template>
  <div class="news-tab">
    <div :class="[choose == index?'news-tab__item--active':'news-tab__item']" v-for="(item,index) in list" :key="index" @click="tab(index)">{{item}}
      <i class="line"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ['行业新闻', '平台公告']
    }
  },
  computed: {
    choose() {
      return this.$store.state.news.choose
    }
  },
  methods:{
    //切换
    tab(index){
      this.$store.commit('CHANGE_NEWS',index);
      if(index == 1){
        this.$store.commit('LOAD_NOTICE');
      }
      if(index == 0){
        this.$store.commit('LOAD_NEWS');
      }
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.news-tab {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: .88rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  .line {
    position: absolute;
    width: .24rem;
    height: .04rem;
    bottom: 0;
    left: 50%;
    margin-left: -.12rem;
    background: #ff5a59;
    display: none;
  }
  &__item {
    font-size: .3rem;
    line-height: .88rem;
    color: #666;
    position: relative;
    height: .88rem;
    &--active {
      @extend .news-tab__item;
      color: #ff5a59;
      .line {
        display: block;
      }
    }
    &:nth-child(1) {
      margin-right: 0.85rem;
    }
  }
}
</style>