<template>
    <div class="safe">
        <my-header title="实名认证" :fix="fix" :border="border"></my-header>
        <unbind v-if="is_check == 0"></unbind>
        <bind v-else></bind>   
    </div>
</template>
<script>
import Header from '../Common/Header'
import Unbind from './Unbind'
import Bind from './Bind'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            fix: false,
            border:true
        }
    },
    components: {
        'my-header': Header,
        'unbind':Unbind,
        'bind':Bind
    },
    computed: {
        ...mapState({
            is_check: state => state.userInfo.is_check,  //认证
        }),
    },
}
</script>

