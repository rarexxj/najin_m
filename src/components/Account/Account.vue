<template>
    <div class="account">
        <my-header title="账户设置" :fix="fix" :border="border"></my-header>
        <div class="account__box">
            <div class="center-cell bb">
                <div class="center-cell__title">账户手机</div>
                <div class="center-cell__content">{{mobile.substr(0,3)+"****"+mobile.substr(7) }}</div>
            </div>
            <router-link tag="div" :to="{name:'safe'}" class="center-cell bb">
                <div class="center-cell__title">实名认证</div>
                <div class="center-cell__content" v-if="is_check == 1">{{realname}}</div>
                <div class="center-cell__content red" v-else>去认证</div>
                <div class="center-cell__arrow"></div>
            </router-link>
            <router-link tag="div" :to="{name:'card'}" class="center-cell">
                <div class="center-cell__title">银行卡</div>
                <div class="center-cell__content red" v-if="is_bind_card == 0">去绑定</div>
                <div class="center-cell__content blue" v-else>已绑定</div>
                <div class="center-cell__arrow"></div>
            </router-link>
        </div>

        <router-link tag="div" :to="{name:'password'}" class="account__box">
            <div class="center-cell">
                <div class="center-cell__title">修改登录密码</div>
                <div class="center-cell__arrow"></div>
            </div>
        </router-link>

        <div class="account__box">
            <div class="center-cell" @click="loginOut()">
                <div class="center-cell__title" style="color:#ff5a59;">退出登录</div>
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
            border: true
        }
    },
    components: {
        'my-header': Header
    },
    computed: {
        ...mapState({
            mobile: state => state.userInfo.mobile,  //手机
            is_check: state => state.userInfo.is_check,  //认证
            realname: state => state.userInfo.realname,  //真实姓名
            is_bind_card: state => state.userInfo.is_bind_card,  //未读消息数
        }),
    },
    methods: {
        loginOut() {
            let _this = this;
            this.$http.get('/user/logout')
                .then(function(res) {
                    _this.$store.commit('SET_USERINFO', {})//清空store
                    // _this.plus.cook.delete('userInfo')//清空cookie
                    window.localStorage.removeItem('userInfo')
                    _this.$router.push({ name: 'index' })
                })
        },
    }
}
</script>

<style lang="scss" scoped>
.account {
    &__box {
        background: #fff;
        padding-left: 0.3rem;
        margin-top: 0.2rem;
    }
}
</style>
