<template>
    <div class="message">
        <my-header title="消息中心" :fix="fix" :border="border"></my-header>
        <router-link tag="div" :to="{name:'platform'}" class="message__box">
            <div class="message__box__icon platform"></div>
            <div class="message__box__info">
                <div class="message__box__info__left">
                    <div class="message__box__info__title">平台消息</div>
                    <div class="message__box__info__content text-ovh">{{platform?platform.content:'' | filterHtml}}</div>
                </div>
                <div class="message__box__time">{{platform?platform.create_at.split(' ')[0]:''}}</div>
            </div>
        </router-link>
        <router-link tag="div" :to="{name:'personal'}" class="message__box">
            <div class="message__box__icon personal"></div>
            <div class="message__box__info">
                <div class="message__box__info__left">
                    <div class="message__box__info__title">个人信息</div>
                    <div class="message__box__info__content text-ovh">{{personal?personal.content:'' | filterHtml}}</div>
                </div>
                <div class="message__box__time">{{personal?personal.create_at.split(' ')[0]:''}}</div>
            </div>
        </router-link>
    </div>
</template>
<script>
import Header from '../Common/Header'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            fix: false,
            border: true
        }
    },
    components: {
        'my-header': Header
    },
    mounted(){
        this.$store.dispatch('getMessage',{type:0})
        this.$store.dispatch('getMessage',{type:1})
    },
    computed:{
        ...mapGetters({
            personal:'getPersonalFirst',
            platform:'getPlatformFirst'
        })
        
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
.message {
    background: #fff;
    &__box {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-left: 0.3rem;
        padding-top: 0.3rem;
        &__icon {
            width: 0.8rem;
            height: 0.8rem;
            &.platform{
                background: url('../../assets/img/message_platform.png') no-repeat;
                background-size: contain;
            }
            &.personal{
                background: url('../../assets/img/message_personal.png') no-repeat;
                background-size: contain;
            }
        }
        &__info {
            width: 6.1rem;
            padding-right: 0.3rem;
            padding-bottom: 0.3rem;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            &__title {
                font-size: .28rem;
                line-height: .4rem;
                margin-bottom: 0.06rem;
            }
            &__content {
                font-size: .24rem;
                line-height: .33rem;
                color: #aaa;
            }
            &__left{
                width: 4.2rem;
            }
        }
        &__time {
            font-size: .22rem;
            line-height: .3rem;
            color: #aaa;
            width: 1.6rem;
        }
    }
}
</style>
