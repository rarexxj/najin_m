<template>
  <router-link tag="div" :to="{name:'projectinfo',query:{id:project.id}}" class="novice">
    <div class="novice__title" :style="{color:project.color?project.color:'#000'}">{{project.title}}</div>
    <div class="novice__tag">新手专享</div>
    <div class="novice__rate">{{project.rate}}<span class="novice__rate__unit">%</span></div>
    <div class="novice__rate__tit">预期年化收益</div>
    <div class="novice__intro">
      <div class="novice__intro__time">项目期限 <span class="novice__intro__num">{{project.cycle}}天</span></div>
      <div class="novice__intro__money">可投金额 <span class="novice__intro__num">{{(project.investment - project.have_money).toFixed(2)}}元</span></div>
    </div>
    <div class="novice__btn">立即投标</div>
  </router-link>
</template>
<script>
export default {
  data(){
    return{
      project:{}
    }
  },
  methods:{
    //新手投资项目
    getProject(){
        var _this = this;
        this.$http.get('/project/list?flag=1&size=1&tags=1')
          .then(function (res) {
            if (res.data.returnData.list.length > 0) {
              _this.project = res.data.returnData.list[0];
            }

          })
      },
  },
  activated(){
    this.getProject();
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .novice{
    width: 100%;
    height: 5.6rem;
    background: #fff;
    border-radius: .04rem;
    margin-top: .25rem;
    padding-top: .4rem;
    background: url('../../assets/img/index_novice_bg.png') no-repeat;
    background-size: contain;
    &__title{
      font-size: .32rem;
      line-height: 1;
      text-align: center;
    }
    &__tag{
      width: 1.2rem;
      height: .34rem;
      background:#f1f9ff;
      font-size: .2rem;
      line-height: .34rem;
      color:#3ca6ff;
      margin: .17rem auto 0;
      border-radius: .17rem;
      text-align: center;
    }
    &__rate{
      margin-top: .2rem;
      color:#ff5a59;
      font-size: 1.1rem;
      text-align: center;
      line-height: 1.1rem;
      &__unit{
        font-size: .64rem;
      }
      &__tit{
        font-size: .24rem;
        line-height: 1;
        color:#adadad;
        text-align: center;
        margin-top: .15rem;
      }
    }
    &__intro{
      margin-top: .5rem;
      display: flex;
      padding: 0 1.2rem;
      justify-content: space-between;
      font-size: .26rem;
      color:#adadad;
      line-height: 1;
      &__num{
        color: #333;
      }
    }
    &__btn{
      width: 3.8rem;
      height: .8rem;
      background:#fff2e2;
      border-radius: .4rem;
      text-align: center;
      line-height: .8rem;
      color:#ff9b48;
      font-size: .3rem;
      margin: .4rem auto 0;
    }
  }
</style>
