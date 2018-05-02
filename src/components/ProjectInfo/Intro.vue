<template>
  <div class="intro">
      <span>计划总额</span>&nbsp;&nbsp;&nbsp;&nbsp;{{money | formatNumber}}<br>
      <span>还款方式</span>&nbsp;&nbsp;&nbsp;&nbsp;{{method}}<br>
      <span>安全保障</span>&nbsp;&nbsp;&nbsp;&nbsp;抵押担保，风险备付金<br>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed:mapState({
      money: state => state.projectinfo.projectInfo.money,  //计划总额
      method: state => state.projectinfo.projectInfo.method,  //还款方式
  })
}
</script>

<style scoped lang="scss">
.intro{
    background: #fff;
    font-size: .26rem;
    line-height: .56rem;
    color: #666;
    padding: .36rem 0 .36rem .3rem;
    span{
        color: #999;
    }
}
</style>