<template>
    <div class="info">
        <my-header :title="title" :transparent="transparent" v-if="isHeader" style="position: absolute;"></my-header>
        <div class="info__rate">12.8
            <span>%</span>
        </div>
        <div class="info__rate__title">预期年化利率</div>
        <div class="info__bot">
            <div class="info__bot__item">
                <div class="info__bot__item__num">{{surplus | formatNumber}}</div>
                <div class="info__bot__item__tit">剩余可投(元)</div>
            </div>
            <div class="info__bot__item">
                <div class="info__bot__item__num">{{cycle}}</div>
                <div class="info__bot__item__tit">项目期限(天)</div>
            </div>
            <div class="info__bot__item">
                <div class="info__bot__item__num">{{sold}}%</div>
                <div class="info__bot__item__tit">已售</div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../Common/Header'
import { mapState } from 'vuex'
import { mapGetters} from 'vuex'
export default {
    props: {
        isHeader: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapState({
            title: state => state.projectinfo.projectInfo.title,  //投资项目标题
            cycle: state => state.projectinfo.projectInfo.cycle,  //投资项目期限
        }),
        ...mapGetters([
            'surplus',
            'sold'
        ])
    },
    data() {
        return {
            transparent: true
        }
    },
    components: {
        'my-header': Header
    },
}
</script>
<style scoped lang="scss">
.info {
    background-image: linear-gradient(-180deg, #ffa07f 3%, #ff5a59 100%);
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
