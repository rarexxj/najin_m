<template>
    <div class="forget">
        <div class="forget__header  border">
            <div class="forget__header__back" @click="back()"></div>
            <div class="forget__header__title text-ovh">忘记密码</div>
        </div>
        <div class="forget__box">
            <div class="cell">
                <div class="cell__title">手机号</div>
                <input type="tel" class="cell__input" placeholder="请输入手机号">
            </div>
            <div class="cell pr30">
                <div class="cell__title">验证码</div>
                <input type="tel" class="cell__input" placeholder="请输入短信验证码">
                <div class="cell__code">获取验证码</div>
            </div>
            <div class="cell">
                <div class="cell__title">新密码</div>
                <input type="password" class="cell__input" placeholder="6-20位字母+数字，字母开头">
            </div>
            <div class="cell">
                <div class="cell__title">重复密码</div>
                <input type="password" class="cell__input" placeholder="请再次输入新密码">
            </div>
        </div>
        <div class="button">立即重置</div>
    </div>
</template>
<script>
import Header from '../Common/Header'
export default {
    props: ['type'],
    data() {
        return {
            fix: false,
            border: true
        }
    },
    components: {
        'my-header': Header
    },
    methods:{
        back(){
            if(this.type == 0){
                this.$store.commit('SHOW_GLOBAL_FORGET',false)
            }else{
                this.$router.go(-1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.forget {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    background: #fff;
    &__box {
        padding-left: 0.3rem;
        margin-bottom: 0.75rem;
    }
    &__header {
        height: .88rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-bottom: 1px solid #e1e1e1;
        &__title {
            width: 5rem;
            font-size: .34rem;
            line-height: 1;
            text-align: center;
            color: #333;
        }
        &__back {
            width: 0.3rem;
            height: 0.3rem;
            position: absolute;
            top: .27rem;
            left: .23rem;
            background: url('../../assets/img/header_black_back.png') no-repeat center center;
            background-size: .15rem .25rem;
        }
    }
}
</style>
