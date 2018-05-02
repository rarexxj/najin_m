<template>
    <div class="login-form">
        <div class="login-form__box">
            <input type="text" class="login-form__box__phone" placeholder="手机号" v-model="account">
            <input type="password" class="login-form__box__password" placeholder="密码" v-model="password">
        </div>
        <div class="button" @click="login()">登录</div>
        <div class="login-form__forget" @click="forget()">忘记密码？</div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
    props: ['type'],
    data() {
        return {
            account: '',
            password: ''
        }
    },
    methods: {
        forget() {
            if (this.type == 1) {
                this.$router.push({ name: 'forget' })
            } else {
                this.$store.commit('SHOW_GLOBAL_FORGET', true)
            }
        },
        login() {
            if (!this.account) {
                this.$toast("请输入手机号")
                return;
            }
            if (!/^1[3|4|5|7|8]\d{9}$/.test(this.account)) {
                this.$toast("手机格式错误")
                return;
            }
            if (!this.password) {
                this.$toast("请输入密码")
                return;
            }
            var _this = this;
            Indicator.open('登录中...');
            this.$http.post('/userCommon/login', {
                account: this.account,
                passwd: this.password
            }).then(function(res) {
                _this.$store.commit('SET_USERINFO', res.data.returnData)
                // _this.plus.cook.set('userInfo', _this.plus.base64encode(res.data.returnData))
                window.localStorage.setItem('userInfo',_this.plus.base64encode(res.data.returnData))
                setTimeout(e => {
                    if(_this.type == 1){
                        _this.$router.push({name:'center'})
                    }else{
                        _this.$store.commit('SHOW_GLOBAL_LOGIN',false)  //关闭登录弹窗
                        if(_this.$route.meta.requireLogin){  //如果当前页面是需要登录页,则跳转到首页
                            _this.$router.push({name:'index'})
                        }
                    }
                    _this.account = ''  //清空数据
                    _this.password = ''
                    Indicator.close()
                }, 500)
            }).catch(function() {
                Indicator.close()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login-form {
    &__box {
        padding-left: 0.3rem;
        margin-bottom: 0.7rem;
        &__phone {
            width: 100%;
            height: 1.12rem;
            padding: .3rem 0 .3rem .58rem;
            display: block;
            font-size: .28rem;
            line-height: .52rem;
            background: url('../../assets/img/login_phone.png') no-repeat left center;
            background-size: .3rem .3rem;
            border-bottom: 1px solid #eee;
        }
        &__password {
            width: 100%;
            height: 1.12rem;
            padding: .3rem 0 .3rem .58rem;
            display: block;
            font-size: .28rem;
            line-height: .52rem;
            background: url('../../assets/img/login_password.png') no-repeat left center;
            background-size: .3rem .3rem;
            border-bottom: 1px solid #eee;
        }
    }
    &__forget {
        text-align: center;
        font-size: .28rem;
        line-height: 1;
        margin-top: 0.38rem;
        color: #aaa;
    }
}
</style>
