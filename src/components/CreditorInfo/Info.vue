<template>
    <div class="info">
        <my-header :title="title" :transparent="transparent" url="projects"></my-header>
        <div class="info__rate">{{transfer_income | formatNumber}}</div>
        <div class="info__rate__title">受让收益(元)</div>
        <div class="info__bot">
            <div class="info__bot__item">
                <div class="info__bot__item__num">{{project_money | formatNumber}}</div>
                <div class="info__bot__item__tit">剩余本金</div>
            </div>
            <div class="info__bot__item">
                <div class="info__bot__item__num">{{transfer_income_snapshot | formatNumber}}</div>
                <div class="info__bot__item__tit">剩余利息</div>
            </div>
            <div class="info__bot__item">
                <div class="info__bot__item__num">{{left_date}} 天</div>
                <div class="info__bot__item__tit">剩余期限</div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../Common/Header'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            fix: false,
            transparent: true
        }
    },
    computed: mapState({
        title: state => state.creditorinfo.creditorInfo.title,  //标题
        transfer_income: state => state.creditorinfo.creditorInfo.transfer_income,  //受让收益
        project_money: state => state.creditorinfo.creditorInfo.project_money,  //剩余本金
        transfer_income_snapshot: state => state.creditorinfo.creditorInfo.transfer_income_snapshot,  //剩余利息
        left_date: state => state.creditorinfo.creditorInfo.left_date,  //剩余期限
    }),
    components: {
        'my-header': Header
    }
}
</script>
<style scoped lang="scss">
.info {
    background-image: linear-gradient(-180deg, #ffc279 0%, #fb9154 100%);
    width: 100%;
    height: 5.09rem;
    position: relative;
    &__rate {
        text-align: center;
        font-size: 1.2rem;
        line-height: 1rem;
        color: #fff;
        padding-top: 1.38rem;
        span {
            font-size: .48rem;
        }
        &__title {
            text-align: center;
            font-size: .24rem;
            line-height: 1;
            color: #fff;
            margin-top: 0.2rem;
        }
    }
    &__bot {
        width: 100%;
        height: 1.3rem;
        border-top: 1px solid rgba(255, 255, 255, .2);
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        &__item {
            display: flex;
            flex: 1;
            height: 1.3rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &__num {
                font-size: .36rem;
                line-height: 1;
                color: #fff;
            }
            &__tit {
                font-size: .24rem;
                line-height: 1;
                color: rgba(255, 255, 255, .6);
                margin-top: 0.1rem;
            }
        }
    }
}
</style>
