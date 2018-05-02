<template>
    <div class="contact">
        <my-header title="联系我们" :border="border" :fix="fix"></my-header>
        <div class="scroll-box">
            <div class="contact__box">
                <div class="center-cell bb" v-for="(item,index) in list" :key="index" @click="getHelpInfo(item)">
                    <div class="center-cell__title">{{item.title}}</div>
                    <div class="center-cell__arrow"></div>
                </div>
            </div>
        </div>

        <transition name="slide-go-left">
            <help-info v-show="showContactInfo" :info="info" type="3"></help-info>
        </transition>

    </div>
</template>
<script>
import Header from '../Common/Header'
import HelpInfo from '../Help/HelpInfo'
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
    computed: mapState({
        showContactInfo: state => state.help.showContactInfo,  //是否显示详情页
    }),
    components: {
        'my-header': Header,
        'help-info': HelpInfo
    },
    mounted() {
        this.getQuestionList();
    },
    methods: {
        getQuestionList() { //获取问题列表
            let _this = this;
            this.$http.get('/common/contactAll')
                .then(function(res) {
                    _this.list = res.data.returnData.list;
                })
        },
        getHelpInfo(data) {
            this.info = data;
            this.$nextTick(function() {
                this.$store.commit('SHOW_CONTACT_INFO', true)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.contact {
    padding-top: 0.88rem;
    &__box {
        background: #fff;
        padding-left: 0.3rem;
        margin-top: 0.2rem;
    }
}
</style>
