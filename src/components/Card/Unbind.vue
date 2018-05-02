<template>
  <div class="card-unbind">
      <div class="card-unbind__icon"></div>
      <div class="card-unbind__tip">请使用快捷充值，支付成功后<br>将自动绑卡。</div>
      <router-link tag="div" :to="{name:'recharge'}" class="card-unbind__btn">去快捷充值</router-link>
  </div>
</template>
<style lang="scss" scoped>
    .card-unbind{
        padding-top: 2.4rem;
        &__icon{
            width: 1.55rem;
            height: 1.12rem;
            margin: 0 auto;
            background: url('../../assets/img/card_unbind.png') no-repeat;
            background-size: contain;
        }
        &__tip{
            font-size: .3rem;
            line-height: .42rem;
            text-align: center;
            color: #666;
            margin-top: 0.5rem;
        }
        &__btn{
            box-sizing: content-box;
            width: 2.4rem;
            height: .66rem;
            border: 1px solid #ff5b5a;
            text-align: center;
            color:#ff5a59;
            font-size: .24rem;
            line-height: .66rem;
            border-radius: .33rem;
            margin: 1.1rem auto 0;
        }
    }
</style>
