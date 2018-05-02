<template>
  <router-link tag="div" :to="{name:'investment',query:{id:info.id}}" class="project-item">
      <div class="project-item__content">
          <div class="project-item__content__title">{{info.title}}</div>
          <div class="project-item__content__money">
              投资金额：{{info.investment | formatNumber}} <br>
              预期收益  {{info.all_interest}} <span v-if="info.red_package > 0">（红包{{info.red_package}}元）</span> 
          </div>
      </div>
      <div class="project-item__status" v-if="info.status == 1">招标中</div>
      <div class="project-item__status" v-if="info.status == 2">还款中</div>
      <div class="project-item__status--gray" v-if="info.status == 3">已还清</div>
      <div class="project-item__status--gray" v-if="info.status == 4">已转让</div>
  </router-link>
</template>
<script>
export default {
  props:['info']
}
</script>

<style lang="scss" scoped>
.project-item{
    width: 100%;
    height: 1.88rem;
    padding: .3rem;
    display: flex;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    &__content{
        width: 5.5rem;
        &__title{
            font-size: .28rem;
            line-height: .4rem;
            color: #333;
        }
        &__money{
            font-size: .26rem;
            line-height: .37rem;
            color: #999;
            margin-top: 0.05rem;
        }
    }
    &__status{
        font-size: .28rem;
        line-height: .4rem;
        color:#ff5a59;
        margin-top: 0.4rem;
        &--gray{
            @extend .project-item__status;
            color:#aaaaaa;
        }
    }
}
</style>
