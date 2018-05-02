<template>
    <div class="creditor-item">
        <div class="creditor-item__content">
            <div class="creditor-item__title">
                <span>{{info.title}}</span>
            </div>
            <div class="creditor-item__info f-cb">
                <div class="creditor-item__info__item w280">
                    <div class="creditor-item__info__title">待收本金(元)</div>
                    <div class="creditor-item__info__number">{{info.investment_money | formatNumber}}</div>
                </div>
                <div class="creditor-item__info__item w280" v-if="type != 2">
                    <div class="creditor-item__info__title">待收利息</div>
                    <div class="creditor-item__info__number">{{info.transfer_income_snapshot}}</div>
                </div>
                <div class="creditor-item__info__item w280" v-if="type == 2">
                    <div class="creditor-item__info__title">待收本息(元)</div>
                    <div class="creditor-item__info__number">{{(Number(info.investment_money) + Number(info.interest_will)).toFixed(2)}}</div>
                </div>
                <div class="creditor-item__info__item" v-if="type != 2">
                    <div class="creditor-item__info__title">预期收益率</div>
                    <div class="creditor-item__info__number">{{info.project_rate}}%</div>
                </div>
                <div class="creditor-item__info__item" v-if="type == 2">
                    <div class="creditor-item__info__title">承接人</div>
                    <div class="creditor-item__info__number">{{info.assignee}}</div>
                </div>
                <div class="creditor-item__info__item w280" v-if="type != 2">
                    <div class="creditor-item__info__title">剩余期限</div>
                    <div class="creditor-item__info__number">{{info.left_date}} 天</div>
                </div>
                <div class="creditor-item__info__item w280" v-if="type != 2">
                    <div class="creditor-item__info__title">下个付息日</div>
                    <div class="creditor-item__info__number">{{info.next_interest_at}}</div>
                </div>
            </div>
        </div>
        <div class="creditor-item__status f-cb" v-if="type != 2 && showBtn">
            <div class="creditor-item__status__btn fr" v-if="type == 4 && info.transferable == 1" @click="transfer()">申请转让</div>
            <div class="creditor-item__status__btn--gray fr" v-if="type == 4 && info.transferable == 0">申请转让</div>
            <div class="creditor-item__status__btn fr" v-if="type == 1">取消</div>
            <!-- <div class="creditor-item__status__btn--gray fr">还款中</div> -->
        </div>
        <div class="creditor-item__transfer" v-if="type == 2">{{info.assignee_at}}  转让</div>
    </div>
</template>
<script>
export default {
  props:{
      type:{
          type:String
      },
      showBtn:{
          type:Boolean,
          default:true
      },
      info:Object
  },
  methods:{
      transfer(){
          this.$store.commit('SET_TRANSFER_INFO',this.info)
          this.$router.push({name:'assigninfo'})
      }
  }
}
</script>

<style lang="scss" scoped>
.creditor-item {
    background: #fff;
    margin-bottom: 0.2rem;
    &__content {
        padding-left: 0.3rem;
    }
    &__title {
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 0.3rem;
        border-bottom: 1px solid #eee;
    }
    &__info{
        
        &__item{
            float: left;
            height: 1.35rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            &.w280{
                width: 2.8rem;
            }
            &.w280{
                width: 2.8rem;
            }
        }
        &__title{
            font-size: .24rem;
            line-height: .33rem;
            color: #999;
        }
        &__number{
            font-size: .26rem;
            line-height: .37rem;
            color: #333;
            margin-top: 0.1rem;
        }
    }
    &__status{
        padding: .22rem .3rem;
        border-top: 1px solid #eee;
        &__btn{
            box-sizing: content-box;
            width: 1.6rem;
            height: .54rem;
            border: 1px solid #ff5b5a;
            text-align: center;
            color:#ff5a59;
            font-size: .24rem;
            line-height: .54rem;
            border-radius: .27rem;
            &--gray{
                @extend .creditor-item__status__btn;
                color: #aaa;
                border-color: #aaa;
            }
        }
        
    }
    &__transfer{
        text-align: right;
        font-size: .24rem;
        color: #aaa;
        padding: .2rem .3rem .3rem .3rem;
    }
}
</style>

