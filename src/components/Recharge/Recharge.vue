<template>
    <div class="recharge">
        <my-header title="充值">
            <router-link tag="div" :to="{name:'rechargelist'}" class="header__right" slot="right">充值记录</router-link>
        </my-header>
        <unbind v-if="is_bind_card == 0"></unbind>
        <forms v-else></forms>
    </div>
</template>
<script>
import Header from '../Common/Header'
import Unbind from './Unbind'
import Form from './Form'
import { mapState } from 'vuex'
export default {
    components: {
        'my-header': Header,
        'unbind': Unbind,
        'forms': Form
    },
    computed: {
        ...mapState({
            is_bind_card: state => state.userInfo.is_bind_card,  //是否绑定银行卡
        }),
    },
}
</script>
<style lang="scss" scoped>
.recharge {
    padding-top: 0.88rem;
}
</style>
