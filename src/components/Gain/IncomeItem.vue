<template>
  <div class="income-item">
      <div class="income-item__top">
        <div class="income-item__top__time">{{info.date}}</div>
        <div class="income-item__top__money">待收：{{info.money}}</div>
      </div>
      <div class="income-item__content">
        <div class="income-item__content__item" v-for="(item,index) in info.list" :key="index">
          <div>
            <div class="income-item__content__item__text"><span>{{item.cycle}}/{{item.all_cycle}}</span> {{item.project_name}}</div>
            <div class="income-item__content__item__text">{{item.method == 0?'日计息，到期本息' : '月还息，到期还本'}}</div>
          </div>
          <div>
            <div :class="['income-item__content__item__money',type==1?'blue':'']">{{item.category == 1?item.money:'0.00'}}</div>
            <div class="income-item__content__item__text">本期待收本息</div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props:['type','info']
}
</script>

<style lang="scss" scoped>
.income-item{
  &__top{
    width: 100%;
    height: 0.66rem;
    background:#f5f5f5;
    font-size: .26rem;
    line-height: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .3rem;
    &__time{
      color: #666;
      font-weight: bold;
    }
    &__money{
      color: #999;
    }
  }
  &__content{
    background: #fff;
    padding-left: 0.3rem;
    &__item{
      padding-right: 0.3rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 1.3rem;
      &__text{
        font-size: .24rem;
        color: #999;
        line-height: 1.5;
        span{
          color: #666;
        }
      }
      &__money{
        font-size: .34rem;
        line-height: .36rem;
        color:#ff5a59;
        &.blue{
          color:#3ca6ff;
        }
      }
    }
    &__item:last-child{
      border-bottom: 0;
    }
  }
}
</style>
