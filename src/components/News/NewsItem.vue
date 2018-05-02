<template>
  <router-link tag="div" :to="{name:'newsinfo',query:{id:info.id}}" class="news-item">
      <div class="news-item__content">
        <div class="news-item__content__title">{{info.title}}</div>
        <div class="news-item__content__time">{{info.create_at}}</div>
      </div>
      <div class="news-item__image bg-over" v-if="info.photo" :style="{backgroundImage:'url('+info.photo+')'}"></div>
  </router-link>
</template>
<script>
export default {
  props:['info']
}
</script>

<style lang="scss" scoped>
.news-item{
  display: flex;
  padding: .3rem 0;
  background: #fff;
  border-bottom: 1px solid #eee;
  height: 2.7rem;
  &__content{
    flex:1;
    &__title{
      font-size: .34rem;
      line-height: .49rem;
      height: 0.98rem;
      overflow: hidden;
    }
    &__time{
      font-size: .24rem;
      line-height: 1;
      color: #aaa;
      margin-top: 0.75rem;
    }
  }
  &__image{
    width: 2rem;
    height: 2rem;
    margin-left: 0.4rem;
    border-radius: .1rem;
    overflow: hidden;
  }
}
</style>
