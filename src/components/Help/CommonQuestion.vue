<template>
    <div class="helps">
        <my-header title="常见问题" :border="border" :fix="fix"></my-header>
        <div class="scroll-box">
            <div class="helps__box">
                <div class="center-cell bb" v-for="(item,index) in list" :key="index" @click="getHelpInfo(item.id)">
                    <div class="center-cell__title">{{item.title}}</div>
                    <div class="center-cell__arrow"></div>
                </div>
            </div>
        </div>
        <transition name="slide-go-left">
            <help-info v-show="showCommonInfo" :info="info" type="2"></help-info>
        </transition>
    </div>
</template>
<script>
import Header from '../Common/Header'
import HelpInfo from './HelpInfo'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            border: true,
            fix: true,
            list: [],
            info: {}
        }
    },
    components: {
        'my-header': Header,
        'help-info': HelpInfo
    },
    computed: mapState({
        showCommonInfo: state => state.help.showCommonInfo,  //是否显示详情页
    }),
    mounted() {
        this.getQuestionList();
    },
    methods:{
        getQuestionList() { //获取问题列表
            let _this = this;
            this.$http.get('/common/helpCenterList?type=5&page=1&size=-1')
                .then(function(res) {
                    _this.list = res.data.returnData.list;
                })
        },
        getHelpInfo(id) {  //获取问题详情
            let _this = this;
            this.$http.get('/common/helpCenterInfo?id=' + id)
                .then(function(res) {
                    _this.info = res.data.returnData;
                    _this.$nextTick(function() {
                        _this.$store.commit('SHOW_COMMON_INFO', true)
                    })
                })
        }
    }
}
</script>
<style lang="scss" scoped>
.helps {
    padding-top: 0.88rem;
    &__box {
        background: #fff;
        padding-left: 0.3rem;
        margin-top: 0.2rem;
    }
}
</style>
