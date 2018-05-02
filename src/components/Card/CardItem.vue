<template>
  <div class="card-item">
      <div class="card-item__title">{{info.bank_name}}</div>
      <div class="card-item__number">{{info.bank_card}}</div>
      <div class="card-item__btn fr" v-if="info.is_change == 1" @click="changeCard()">修改</div>
  </div>
</template>
<script>
export default {
  props:['info'],
  methods:{
      changeCard(){
          this.$router.push({name:'cardchange'})
          this.$store.commit('SET_CHANGE_CARD',this.info)
      }
  }

}
</script>

<style lang="scss" scoped>
.card-item{
    width: 7rem;
    height: 4.5rem;
    background: url('../../assets/img/card_bg.png') no-repeat;
    background-size: contain;
    padding: .5rem .6rem 0 .7rem;
    &__title{
        font-size: .36rem;
        line-height: .5rem;
        color: #fff;
    }
    &__number{
        font-size: .36rem;
        color: #fff;
        text-align: center;
        line-height: .5rem;
        margin-top: 0.5rem;
    }
    &__btn{
        width: 1.5rem;
        height: 0.5rem;
        background: #fff;
        border-radius: .25rem;
        text-align: center;
        line-height: .5rem;
        font-size: .26rem;
        color:#ff6464;
        margin-top: 0.77rem;
    }
}
</style>
