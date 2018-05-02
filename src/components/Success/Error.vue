<template>
    <div class="success">
        <div class="success__icon"></div>
        <div class="success__text">失败</div>
        <div class="success__text" v-if="msg">{{msg}}</div>
        <router-link tag="div" class="success__btn" v-if="type == 1" :to="{name:'projectinfo',query:{id:pid}}">继续投资</router-link>
        <router-link tag="div" class="success__btn" v-if="type == 2 || type == 3 || type == 0" :to="{name:'projects'}">立即投资</router-link>
        <router-link tag="div" :to="{name:'center'}" class="success__btn" v-if="type == 0">账户中心</router-link>
        <router-link tag="div" :to="{name:'record'}" class="success__btn" v-if="type == 1 || type == 2">查看投资记录</router-link>
        <router-link tag="div" :to="{name:'withdrawalslist'}" class="success__btn" v-if="type == 3">查看提现记录</router-link>
        <router-link tag="div" :to="{name:'recharge'}" class="success__btn" v-if="type == 4">立即充值</router-link>
        <div class="success__btn" v-if="type == null" @click="back()">返回</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            type: null,
            pid: null,
            msg: null
        }
    },
    methods: {
        back() {
            history.go(-1)
        }
    },
    computed:{
        account(){
            return this.$store.state.userInfo.account;
        }
    },
    mounted() {
        this.type = this.$route.query.type;
        this.pid = this.$route.query.pid;
        this.msg = this.$route.query.msg;
        if(this.account){
            this.$store.dispatch('UpdateUserInfo')  //更新用户信息
        }else{
            this.$store.commit('SET_ANALOG_USER')  //模拟登录状态
        }
    }
}
</script>

<style lang="scss" scoped>
.success {
    height: 100%;
    width: 100%;
    padding-top: 2.25rem;
    &__icon {
        width: 2.88rem;
        height: 2.33rem;
        background: url('../../assets/img/error_icon.png') no-repeat;
        background-size: contain;
        margin: 0 auto;
    }
    &__text {
        text-align: center;
        font-size: .26rem;
        color: #aaa;
        line-height: 1.5;
        width: 6.9rem;
        margin: .4rem auto .8rem;
    }
    &__btn {
        box-sizing: content-box;
        width: 2.4rem;
        height: .66rem;
        border: 1px solid #ff5b5a;
        text-align: center;
        color: #ff5a59;
        font-size: .24rem;
        line-height: .66rem;
        border-radius: .33rem;
        margin: 0 auto .32rem;
    }
}
</style>
