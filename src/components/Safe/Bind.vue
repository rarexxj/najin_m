<template>
  <div class="safe-bind">
      <div class="safe-bind__tip">已认证无法修改。</div>
      <div class="safe-bind__box">
          <div class="cell">
              <div class="cell__title">真实姓名</div>
              <div class="cell__content">{{realname}}</div>
          </div>
          <div class="cell bbn">
              <div class="cell__title">身份证号</div>
              <div class="cell__content">{{chinaid}}</div>
          </div>
      </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            realname: state => state.userInfo.realname,  //真实姓名
            chinaid: state => state.userInfo.chinaid,  //身份证
        }),
    },
}
</script>
<style lang="scss" scoped>
.safe-bind{
    &__tip{
        font-size: .24rem;
        line-height: .33rem;
        padding: .3rem;
        color:#ff6464;
    }
    &__box{
        background: #fff;
        padding-left: 0.3rem;
        margin-bottom: 0.9rem;
    }
    &__phone{
        color: #333;
    }
}
</style>