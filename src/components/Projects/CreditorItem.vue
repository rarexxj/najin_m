<template>
  <router-link tag="div" :to="{name:'creditorinfo',query:{id:info.id}}" class="creditor-item">
    <div class="creditor-item__title">{{info.title}}</div>

    <div class="creditor-item__content">
      <div class="creditor-item__content__item">
        <div class="creditor-item__content__rate">{{info.project_rate | formatNumber}}<span>%</span></div>
        <div class="creditor-item__content__text">预期年化收益</div>
      </div>
      <div class="creditor-item__content__item">
        <div class="creditor-item__content__num">{{info.transfer_money | formatNumber}}</div>
        <div class="creditor-item__content__text">转让价格(元)</div>
      </div>
      <div class="creditor-item__content__item">
        <div class="creditor-item__content__btn" v-if="info.status == 1">立即承接</div>
        <div class="creditor-item__content__btn--gray" v-if="info.status == 2">已转让</div>
        <div class="creditor-item__content__money">本金{{info.project_money | formatNumber}}元</div>
      </div>
    </div>
  </router-link>
</template>
<script>
  export default{
    props:['info']
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .creditor-item{
    width: 100%;
    height: 2.44rem;
    background: #fff;
    padding: .27rem 0 0 .4rem;
    border-bottom: 1px solid #eee;
    &__title{
      font-size: .26rem;
      line-height: .34rem;
    }
    &__content{
      display: flex;
      justify-content: space-between;
      padding-right: .4rem;
      margin-top: .2rem;
      &__rate{
        font-size: .76rem;
        line-height: .76rem;
        color:#ff5a59;
        span{
          font-size: .36rem;
        }
      }
      &__text{
        font-size: .24rem;
        line-height: 1;
        color: #999;
      }
      &__num{
        font-size: .6rem;
        line-height: .6rem;
        margin-top: .2rem;
        margin-bottom: .1rem;
      }
      &__btn{
        width: 1.5rem;
        height: .54rem;
        border-radius: .27rem;
        text-align: center;
        line-height: .54rem;
        color: #fff;
        background:#ff9f4f;
        margin-top: .24rem;
        &--gray{
          @extend .creditor-item__content__btn;
          background:#cacaca;
        }
      }
      &__money{
        font-size: .22rem;
        line-height: 1;
        color:#ff9659;
        text-align: center;
        margin-top: .1rem;
      }
    }
  }
</style>
