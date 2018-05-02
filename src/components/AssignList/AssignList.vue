<template>
    <div class="assign">
        <my-header title="债权转让" :border="border"></my-header>

        <!-- 筛选 -->
        <screen></screen>
        <!-- 筛选 -->

        <!-- 列表 可转让 -->
        <transferable v-show="type == 4"></transferable>
        <!-- 列表 -->

        <!-- 列表 转让中 -->
        <transferring v-show="type == 1" v-if="isLoadTransferring"></transferring>
        <!-- 列表 -->

        <!-- 列表 已转让 -->
        <transferred v-show="type == 2" v-if="isLoadTransferred"></transferred>
        <!-- 列表 -->
    </div>
</template>
<script>
import Header from '../Common/Header'
import Screen from './Screen'
import Transferable from './Transferable'
import Transferring from './Transferring'
import Transferred from './Transferred'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            border: true
        }
    },
    computed: {
        ...mapState({
            type: state => state.assignlist.type,  //选择的type
            isLoadTransferring: state => state.assignlist.isLoadTransferring,//是否加载转让中
            isLoadTransferred: state => state.assignlist.isLoadTransferred,//是否加载已转让
        }),
    },
    components: {
        'my-header': Header,
        'screen': Screen,
        'transferable': Transferable,
        'transferring': Transferring,
        'transferred': Transferred
    }
}
</script>

<style lang="scss" scoped>
.assign {
    height: 100%;
    padding-top: 1.78rem;
}
</style>
