<template>
    <div class="creditor">
        <!-- 详情头部 -->
        <info></info>
        <!-- 详情头部 -->

        <!-- 转让信息、转让说明 -->
        <intro></intro>
        <!-- 转让信息、转让说明 -->

        <!-- 原项目信息 -->
        <router-link tag="div" :to="{name:'projectinfo',query:{id:pid}}" class="creditor__old">
            <span>原项目信息</span>
            <div class="arrow"></div>
        </router-link>
        <!-- 原项目信息 -->

        <div class="creditor__bot">
            <div class="creditor__bot__profit" v-if="account">当前余额 {{money | formatNumber}}元，
                <router-link tag="span" :to="{name:'recharge'}">前往充值</router-link>
            </div>
            <div class="creditor__bot__profit" v-else>您还未登录</div>
            <div class="creditor__bot__btn" v-if="status == 1">承接（{{transfer_money | formatNumber}}元）</div>
            <div class="creditor__bot__btn out" v-if="status == 2">承接（{{transfer_money | formatNumber}}元）</div>
        </div>
    </div>
</template>
<script>
import Info from './Info'
import Intro from './Intro'
import { mapState } from 'vuex'
export default {
    name: 'creditorinfo',
    components: {
        'info': Info,
        'intro': Intro
    },
    mounted() {
        this.getInfo()  //获取详情
        if (this.account) {  //已登录请求余额
            this.$store.dispatch('getBalance')
        }
    },
    computed: {
        ...mapState({
            account: state => state.userInfo.account,  //账户
            is_check: state => state.userInfo.is_check,  //认证
            transfer_money: state => state.creditorinfo.creditorInfo.transfer_money,  //转让金额
            status: state => state.creditorinfo.creditorInfo.status,  //转让金额
            pid: state => state.creditorinfo.creditorInfo.pid,  //原项目id
            money: state => state.assets.money,  //余额
        }),
    },
    methods: {
        getInfo() {  //获取详情
            let _this = this;
            this.$http.get('/transfer/info?id=' + this.$route.query.id)
                .then(function(res) {
                    _this.$store.commit('SET_CREDITOR_INFO', res.data.returnData)
                })
        },
        buy() { //承接
            if (!this.account) {
                let _this = this
                this.$msgbox.confirm('您还没有登录，请登录后<br>进行此操作', '').then(action => {
                    _this.$store.commit('SHOW_GLOBAL_LOGIN', true)
                }).catch(e => {
                    console.log(e)
                })
                return
            }
            if(this.is_check != 1){
                this.$msgbox.confirm('您的账户还未认证，请完成<br>认证后进行此操作', '').then(action => {
                    _this.$router.push({name:'safe'})
                }).catch(e => {
                    console.log(e)
                })
                return
            }
            let _this = this;
            this.$http.post('funds/transfer', {
                id: _this.$route.query.id
            }).then(function(res) {
                window.location.href = res.data.returnData.go_url;
            })
        },
    }
}
</script>
<style scoped lang="scss">
.creditor {
    height: 100vh;
    padding-bottom: 1.7rem;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &__old {
        width: 100%;
        height: 0.75rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .3rem;
        margin-top: 0.3rem;
        color: #999
    }
    &__bot {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        &__profit {
            height: 0.7rem;
            background: #fff5d9;
            font-size: .24rem;
            line-height: .7rem;
            text-align: center;
            span {
                color: #ff5a59;
            }
        }
        &__btn {
            height: 1rem;
            background: #ff9f4f;
            color: #fff;
            font-size: .32rem;
            line-height: 1rem;
            text-align: center;
            &.out {
                opacity: .5;
            }
        }
    }
}
</style>