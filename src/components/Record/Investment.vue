<template>
    <div class="investment">
        <my-header title="投资详情"></my-header>
        <div class="scroll-box">
            <div class="investment__top">
                <div class="investment__top__status--had" v-if="info.status == 3">已还款</div>
                <div class="investment__top__status--ing" v-if="info.status == 2">还款中</div>
                <div class="investment__top__status--rec" v-if="info.status == 1">募集中</div>
                <div class="investment__top__status--tra" v-if="info.status == 4">已转让</div>
                <!-- <div class="investment__top__check">查看收益
                    <div class="investment__top__arrow"></div>
                </div> -->
            </div>
            <div class="investment__content">
                <div class="investment__content__title">爱车贷一期</div>
                <div>
                    <div class="investment__content__cell">
                        <div class="investment__content__cell__title">交易时间</div>
                        <div class="investment__content__cell__info">{{info.create_at}}</div>
                    </div>
                    <div class="investment__content__cell">
                        <div class="investment__content__cell__title">预期年化收益率</div>
                        <div class="investment__content__cell__info">{{info.rate}}%</div>
                    </div>
                    <div class="investment__content__cell">
                        <div class="investment__content__cell__title">项目期限</div>
                        <div class="investment__content__cell__info">{{info.cycle}} 天</div>
                    </div>
                    <div class="investment__content__cell">
                        <div class="investment__content__cell__title">项目还款方式</div>
                        <div class="investment__content__cell__info">{{info.method == 0?'日计息，到期本息' : '月还息，到期还本'}}</div>
                    </div>
                    <div class="investment__content__cell">
                        <div class="investment__content__cell__title">投资本金</div>
                        <div class="investment__content__cell__info">{{info.investment}}元</div>
                    </div>
                    <div class="investment__content__cell">
                        <div class="investment__content__cell__title">预期收益</div>
                        <div class="investment__content__cell__info">{{info.all_interest}}元 <span v-if="info.red_package > 0">(红包{{info.red_package}})</span></div>
                    </div>
                    <div class="investment__content__cell" style="border-bottom:0">
                        <div class="investment__content__cell__title">还款时间</div>
                        <div class="investment__content__cell__info">{{info.repaymenttime}}</div>
                    </div>
                </div>
            </div>

            <!-- <div class="investment__transferor">
                <div class="investment__content__cell">
                    <div class="investment__content__cell__title">承接人</div>
                    <div class="investment__content__cell__info">张思</div>
                </div>
                <div class="investment__content__cell">
                    <div class="investment__content__cell__title">转让时间</div>
                    <div class="investment__content__cell__info">2017-09-20</div>
                </div>
                <div class="investment__content__cell" style="border-bottom:0">
                    <div class="investment__content__cell__title">转让费用</div>
                    <div class="investment__content__cell__info">500.00元</div>
                </div>
            </div> -->
        </div>
        <a :href="info.agreement_downloadurl" target="_blank" class="investment__agreement">《查看合同协议》</a>
    </div>
</template>
<script>
import Header from '../Common/Header'

export default {
    name:'investment',
    data(){
        return{
            info:{}
        }
    },
    components: {
        'my-header': Header
    },
    mounted(){
        this.getInfo()
    },
    methods:{
      getInfo(){
          var _this = this;
          this.$http.get('/user/investmentInfo?id='+this.$route.query.id)
            .then(function (res) {
              _this.info = res.data.returnData
            })
      }
    },
}
</script>

<style lang="scss" scoped>
.investment {
    background: #fff;
    padding: .88rem 0 1rem 0;
    &__top {
        width: 100%;
        height: 1.7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .3rem;
        background-image: linear-gradient(-179deg, #ff856e 6%, #ff645e 99%);
        &__status {
            padding-left: 0.55rem;
            font-size: .3rem;
            line-height: .42rem;
            color: #fff;
            &--had {
                @extend .investment__top__status;
                background: url('../../assets/img/investment_icon1.png') no-repeat left center;
                background-size: .4rem .3rem;
            }
            &--ing {
                @extend .investment__top__status;
                background: url('../../assets/img/investment_icon2.png') no-repeat left center;
                background-size: .4rem .3rem;
            }
            &--rec {
                @extend .investment__top__status;
                background: url('../../assets/img/investment_icon3.png') no-repeat left center;
                background-size: .4rem .3rem;
            }
            &--tra {
                @extend .investment__top__status;
                background: url('../../assets/img/investment_icon4.png') no-repeat left center;
                background-size: .4rem .3rem;
            }
        }
        &__check {
            font-size: .24rem;
            line-height: 1;
            color: #fff;
            display: flex;
        }
        &__arrow {
            width: 0.12rem;
            height: 0.22rem;
            background: url('../../assets/img/white_arrow.png') no-repeat;
            background-size: contain;
            margin-left: .1rem;
        }
    }
    &__content {
        padding: .4rem .3rem .2rem .3rem;
        border-bottom: 1px solid #eee;
        &__title {
            font-size: .34rem;
            line-height: .48rem;
            margin-bottom: 0.17rem;
        }
        &__cell {
            min-height: .88rem;
            border-bottom: 1px dashed #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: .26rem;
            line-height: 1;
            &__title {
                color: #999;
            }
            &__info {
                color: #666;
            }
        }
    }
    &__transferor{
        padding: .4rem .3rem .2rem .3rem;
    }
    &__agreement{
        position: absolute;
        width: 100%;
        height: 1rem;
        left: 0;
        bottom: 0;
        text-align: center;
        line-height: 1rem;
        font-size: .26rem;
        color:#949aa1;
        border-top: 1px solid #eee;
    }
}
</style>
