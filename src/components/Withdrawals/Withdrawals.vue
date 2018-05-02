
<template>
    <div class="withdrawals">
        <my-header title="提现">
            <router-link tag="div" :to="{name:'withdrawalslist'}" class="header__right" slot="right">提现记录</router-link>
        </my-header>
        <div class="scroll-box">
            <unbind v-if="is_bind_card == 0"></unbind>
            <forms v-else></forms>
        </div>

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
          'forms':Form
    },
    computed: {
        ...mapState({
            is_bind_card: state => state.userInfo.is_bind_card,  //是否绑定银行卡
        }),
    },
    activated(){
        this.$store.dispatch('getBalance')
    }
}
</script>
<style lang="scss" scoped>
.withdrawals {
    padding-top: 0.88rem;
}
</style>
