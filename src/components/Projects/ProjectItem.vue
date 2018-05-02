<template>
  <router-link tag="div" :to="{name:'projectinfo',query:{id:info.id}}" class="project-item">

    <div class="project-item__title">{{info.title}} <span class="project-item__novice" v-if="info.tags">新手专享</span><span class="project-item__start" v-if="info.status == 0">未开始</span></div>

    <div class="project-item__content">
      <div class="project-item__content__item">
        <div class="project-item__content__rate">{{info.rate}}<span>%</span></div>
        <div class="project-item__content__text">预期年化收益</div>
      </div>
      <div class="project-item__content__item">
        <div class="project-item__content__date">{{info.cycle}}<span>天</span></div>
        <div class="project-item__content__text">项目期限</div>
      </div>

      <div class="project-item__content__gray" v-if="info.status == 0">未开始</div>
      <div class="circle" v-if="info.status == 1">
        <div class="pie_left"><div class="left" :style="{transform: 'rotate('+leftRun+'deg)'}"></div></div>
        <div class="pie_right"><div class="right" :style="{transform: 'rotate('+rightRun+'deg)'}"></div></div>
        <div class="circle-num">{{inc}}%</div>
      </div>
      <div class="project-item__content__gray" v-if="info.status == 2">还款中</div>
      <div class="project-item__content__gray" v-if="info.status == 3">已结清</div>
    </div>
  </router-link>
</template>
<script>
  export default{
  	props:['info'],
    data(){
  		return{
        rightRun:0,
        leftRun:0,
        inc:0,
        time:null,
        deg:0
      }
    },
    computed:{
    	number(){  //计算已投百分比
    		return (this.info.have_money/this.info.investment*100).toFixed(1)
      }
    },
    mounted(){
      if(this.info.status == 1){
      	this.initCircle()
      }
    },
    methods:{
      initCircle(){  //初始化话圆圈
  			this.deg =this.number*3.6;
  			if(this.deg > 180){
          this.rightRun = 180;
          setTimeout(() => {
            this.leftRun = this.deg - 180;
          },300)
        }else{
          this.rightRun = this.deg
        }
        this.numberRun()
      },
      numberRun(){  //数字递增
      	this.time = setInterval(() => {
      		if(this.inc >= this.number){
      			this.inc = this.number;
      			clearInterval(this.time)
          }else{
            this.inc++
          }
        },this.deg > 180 ? 600/this.deg : 300/this.deg)
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .project-item{
    width: 100%;
    height: 2.44rem;
    background: #fff;
    padding: .27rem 0 0 .4rem;
    border-bottom: 1px solid #eee;
    &__title{
      font-size: .26rem;
      line-height: .34rem;
    }
    &__novice{
      width: 1.2rem;
      height: .34rem;
      background:#f1f9ff;
      border-radius: .17rem;
      text-align: center;
      line-height: .34rem;
      font-size: .2rem;
      color:#3ca6ff;
      text-align: center;
      display: inline-block;
      margin-left: .08rem;
    }
    &__start{
      width: 1.2rem;
      height: .34rem;
      border-radius: .17rem;
      text-align: center;
      line-height: .34rem;
      font-size: .2rem;
      text-align: center;
      display: inline-block;
      margin-left: .08rem;
      background:#ffeae2;
      color:#ff5a59;
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
      &__date{
        font-size: .6rem;
        line-height: .6rem;
        margin-top: .18rem;
        span{
          font-size: .34rem;
        }
      }
      &__canvas{
        width: 1rem;
        height: 1rem;
        margin-top: .1rem;
      }
      &__gray{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 3px solid #999;
        font-size: .22rem;
        color: #999;
        line-height: .9rem;
        text-align: center;
      }
    }
  }
  .circle {
    width: 1rem;
    height: 1rem;
    /*position: absolute;*/
    border-radius: 50%;
    background: #ffa12f;
    position: relative;
  }
  .circle-num{
    width: .88rem;
    height: .88rem;
    position: absolute;
    left: .06rem;
    top: .06rem;
    background: #fff;
    border-radius: 50%;
    font-size: .22rem;
    text-align: center;
    line-height: .88rem;
    color: #999;
  }
  .pie_left, .pie_right {
    width:1rem;
    height:1rem;
    position: absolute;
    top: 0;left: 0;
  }
  .left, .right {
    width:1rem;
    height:1rem;
    background:#dfe6e4;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all .3s linear;
  }
  .pie_right, .right {
    clip:rect(0,auto,auto,.5rem);
  }
  .pie_left, .left {
    clip:rect(0,.5rem,auto,0);
  }
</style>
