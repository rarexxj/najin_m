<template>
    <div class="help-info">
        <div class="help-info__header">
            <div class="help-info__header__back" @click="back()"></div>
        </div>
        <div class="scroll-box">
            <div class="help-info__content">
                <div class="help-info__content__title">{{info.title}}</div>
                <div class="help-info__content__info" v-html="info.content"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props:{
      info:{
          type:Object
      },
      type:{
          type:String
      }
  },
  methods:{
      /*
        type = 1时为帮助中心引用的详情页
        type = 2时为常见问题引用的详情页
        type = 3时为联系我们引用的详情页
      */
      back(){ 
          if(this.type == 1){
            this.$store.commit('SHOW_HELP_INFO',false)
          }
          if(this.type == 2){
              this.$store.commit('SHOW_COMMON_INFO',false)
          }
          if(this.type == 3){
              this.$store.commit('SHOW_CONTACT_INFO',false)
          }
      }
  }
}
</script>

<style lang="scss" scoped>
.help-info {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 30;
    background: #fff;
    padding-top: 0.88rem;
    &__header {
        height: .88rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-bottom: 1px solid #e1e1e1;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 20;
        &__back {
            width: 0.3rem;
            height: 0.3rem;
            position: absolute;
            top: .27rem;
            left: .23rem;
            background: url('../../assets/img/header_black_back.png') no-repeat center center;
            background-size: .15rem .25rem;
        }
    }
    &__content{
        padding: .6rem .3rem;
        &__title{
            width: 95%;
            margin: 0 auto;
            text-align: center;
            font-size: .48rem;
            line-height: .6rem;
        }
        &__info{
            margin-top: 0.55rem;
            font-size: .34rem;
            line-height: .6rem;
            img{
                max-width: 100%;;
            }
        }
    }
}
</style>
