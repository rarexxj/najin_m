<template>
  <div class="message-item">
      <div class="message-item__time">{{info?info.create_at.split(' ')[0]:''}}</div>
      <div class="message-item__content">
          <div class="message-item__content__title">{{info?info.title:''}}</div>
          <div class="message-item__content__text" v-html="info?info.content:''"></div>
      </div>
  </div>    
</template>
<script>
export default {
  props:['info']
}
</script>

<style lang="scss" scoped>
.message-item{
    padding-top: 0.4rem;
    &__time{
        width: 2.05rem;
        height: 0.4rem;
        border-radius: .2rem;
        margin: 0 auto .3rem;
        background:#dbdce3;
        font-size: .24rem;
        line-height: .4rem;
        text-align: center;
        color: #fff;
    }
    &__content{
        width: 100%;
        background: #fff;
        padding: .4rem;
        box-shadow:0 5px 5px 0 rgba(0,0,0,0.01);
        border-radius: .1rem;
        &__title{
            font-size: .32rem;
            line-height: .45rem;
            margin-bottom: 0.3rem;
        }
        &__text{
            font-size: .26rem;
            line-height: .5rem;
        }
    }
}
</style>
