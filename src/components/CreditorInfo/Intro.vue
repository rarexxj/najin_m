<template>
    <div class="intro">
        <div class="intro__titles">
            <div :class="[choose == index?'intro__titles__item--active':'intro__titles__item']" v-for="(item,index) in list" :key="index" @click="choose = index">{{item}}
                <i class="line"></i>
            </div>
        </div>

        <div class="intro__content" v-show="choose == 0">
            <div class="intro__content__text">
                <span class="intro__content__text__tit">转让人</span>{{transferor}} <br>
                <span class="intro__content__text__tit">预期收益率</span>{{project_rate}}%<br>
                <span class="intro__content__text__tit">总期限</span>{{project_cycle}} 天<br>
                <span class="intro__content__text__tit">还款方式</span>{{project_method == 0?'日计息，到期本息' : '月还息，到期还本'}}<br>
                <span class="intro__content__text__tit">下个付息日</span>{{next_interest_at}}
            </div>
        </div>

        <div class="intro__content" v-show="choose == 1" v-html="transfer_intro"></div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            list: ['转让信息', '转让说明'],
            choose: '0'
        }
    },
    computed: mapState({
        transferor: state => state.creditorinfo.creditorInfo.transferor,  //转让人
        project_rate: state => state.creditorinfo.creditorInfo.project_rate,  //预计年化利率
        project_cycle: state => state.creditorinfo.creditorInfo.project_cycle,  //项目期限
        project_method: state => state.creditorinfo.creditorInfo.project_method,  //还款方式
        next_interest_at: state => state.creditorinfo.creditorInfo.next_interest_at,  //下个付息日
        transfer_intro: state => state.creditorinfo.creditorInfo.transfer_intro,  //下个付息日
    }),
}
</script>

<style scoped lang="scss">
.intro {
    margin-top: 0.2rem;
    background: #fff;
    &__titles {
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #eee;
        display: flex;
        padding: 0 1.75rem;
        justify-content: space-between;
        .line {
            position: absolute;
            width: .24rem;
            height: .04rem;
            bottom: 0;
            left: 50%;
            margin-left: -.12rem;
            background: #ff9659;
            display: none;
        }
        &__item {
            width: 2rem;
            height: 1rem;
            text-align: center;
            line-height: 1rem;
            font-size: .26rem;
            color: #999;
            position: relative;
            &--active {
                @extend .intro__titles__item;
                color: #ff9659;
                .line {
                    display: block;
                }
            }
        }
    }
    &__content {
        padding: .4rem .3rem;
        color: #666;
        min-height: 3.8rem;
        font-size: .24rem;
        line-height: .36rem;
        &__text {
            font-size: .26rem;
            line-height: .6rem;
            &__tit {
                display: inline-block;
                width: 1.8rem;
                color: #999;
            }
        }
    }
}
</style>