<template>
  <router-link tag="li" :to="{name:'projectinfo',query:{id:info.id}}" class="project-item">
    <div class="project-item__top">
      <div class="project-item__top__left">
        <div class="project-item__top__rate">{{info.rate}}
          <span>%</span>
        </div>
        <div class="project-item__top__text">预期年化收益</div>
      </div>
      <div class="project-item__top__right">
        <div class="project-item__top__time">{{info.cycle}}天</div>
        <div class="project-item__top__text" style="margin-top: .1rem;">预期年化收益</div>
      </div>
    </div>
    <div class="project-item__bot">
      <div class="project-item__bot__title" :style="{color:info.color?info.color:'#000'}">{{info.title}}</div>
      <div class="project-item__bot__percent">
        <div class="project-item__bot__chart">
          <canvas :id="'pjc'+num" class="project-item__bot__canvas" width="20" height="20"></canvas>
        </div>
        <div class="project-item__bot__percent__num">{{percent}}%</div>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: ['num', 'info'],
  computed:{
     percent(){
       return (this.info.have_money / this.info.investment).toFixed(0)
     }
  },
  mounted() {
    this.$nextTick(function() {
      this.init();
    })
  },
  methods: {
    init() {
      var c = document.getElementById("pjc" + this.num);
      var ctx = c.getContext("2d");
      ctx.width = 20;
      ctx.height = 20;
      ctx.beginPath();

      ctx.arc(10, 10, 6, 0, 2 * Math.PI);
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#d6e0dd'

      ctx.stroke();
      this.draw(ctx, this.percent/100);
    },
    draw(ctx, cur) {
      ctx.beginPath();
      ctx.arc(10, 10, 6, -Math.PI / 2, ((Math.PI * 2) * cur) - Math.PI / 2, false);
      ctx.lineWidth = 4;
      ctx.fillStyle = '#00af0b';
      ctx.strokeStyle = '#ffa12f'
      ctx.stroke();
    }
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.project-item {
  width: 4.5rem;
  height: 2.8rem;
  background: #fff;
  border-radius: .04rem;
  margin-right: .2rem;
  padding: 0.35rem .25rem 0;
  float: left;
  &__top {
    display: flex;
    padding-bottom: .4rem;
    border-bottom: 1px solid #f5f5f5;
    &__left {
      width: 1.8rem;
    }
    &__right {
      padding-left: .47rem;
      border-left: 1px solid #f5f5f5;
      height: .82rem;
      margin-top: .18rem;
    }
    &__rate {
      font-size: .52rem;
      color: #ff5a59;
      line-height: .64rem;
      span {
        font-size: .32rem;
      }
    }
    &__text {
      font-size: .24rem;
      line-height: 1;
      color: #999;
    }
    &__time {
      font-size: .44rem;
      line-height: .44rem;
    }
  }
  &__bot {
    display: flex;
    justify-content: space-between;
    margin-top: .35rem;
    align-items: center;
    &__percent {
      display: flex;
      align-items: center;
      &__num {
        font-size: .24rem;
        color: #999;
        margin-left: .1rem;
      }
    }
    &__title {
      font-size: .24rem;
      line-height: .24rem;
      color: #666;
    }
    &__chart {
      width: 18px;
      height: 18px;
      overflow: hidden;
    }
  }
}
</style>
