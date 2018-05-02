<template>
  <div class="banner">
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <div class="banner__item bg-cover" v-for="(item,index) in bannerList" :key="index" :style="{backgroundImage:'url('+item.photo+')'}">
          <a :href="item.link" class="link"></a>
        </div>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  export default{
    components:{
      'mt-swipe':Swipe,
      'mt-swipe-item':SwipeItem
    },
    computed:{
      bannerList(){
        return this.$store.state.welcome.bannerList
      }
    },
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .banner{
    height: 4rem;
    width: 100%;
    &__item{
      width: 100%;
      height: 100%;
      .link{
        display: block;
        height: 100%;
      }
    }
  }
</style>
