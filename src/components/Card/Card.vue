<template>
    <div class="card">
        <my-header title="绑定银行卡" :border="border"></my-header>
        <div class="scroll-box">
            <unbind v-if="is_bind_card == 0"></unbind>
            <card-list v-else></card-list>
        </div>
        
    </div>
</template>
<script>
import Header from '../Common/Header'
import Unbind from './Unbind'
import CardList from './CardList'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            border: true
        }
    },
    components: {
        'my-header': Header,
        'unbind':Unbind,
        'card-list':CardList
    },
    computed: { 
        ...mapState({
            is_bind_card: state => state.userInfo.is_bind_card,  //是否绑定银行卡
        }),
    },
}
</script>
<style lang="scss" scoped>
    .card{
        padding-top: 0.88rem;
    }
</style>