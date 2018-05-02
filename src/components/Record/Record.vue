<template>
    <div class="record">
        <!-- 切换 -->
        <tab></tab>
        <!-- 切换 -->

        <!-- 投资项目列表 -->
        <record-projects v-show="choose == 0"></record-projects>
        <!-- 投资项目列表 -->

        <!-- 债权承接列表 -->
        <record-creditor v-show="choose == 1" v-if="loadCreditor"></record-creditor>
        <!-- 债权承接列表 -->
    </div>
</template>
<script>
import Tab from './Tab.vue'
import RecordProjects from './RecordProjects'
import RecordCreditor from './RecordCreditor'
import { mapState } from 'vuex'
export default {
    computed: mapState({
        choose: state => state.record.choose,  //显示 投资项目/债权承接
        loadCreditor: state => state.record.loadCreditor,  //是否加载过债权承接  
    }),
    components: {
        'tab': Tab,
        'record-projects': RecordProjects,
        'record-creditor':RecordCreditor
    },
}
</script>

<style lang="scss" scoped>
.record {
    padding-top: 0.88rem;
}
</style>
