<template>
    <div class="platform">
        <my-header title="个人信息"></my-header>
        <div class="bubble-box" :style="{'top':top + 'px'}">
            <bubble :y="bubbleY"></bubble>
        </div>
        <scroll class="scroll-box" :data="personalList" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll" :canScroll="canScroll">
            <div class="scroll-wrapper">
                <message-item v-for="(item,index) in personalList" :key="index" :info="item"></message-item>
                <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
            </div>
        </scroll>
    </div>
</template>
<script>
import Header from '../Common/Header'
import MessageItem from './MessageItem'
import Scroll from '../Common/Scroll'
import Bubble from '../Common/Bubble'
import scrollText from '../Common/ScrollText'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            border: true,
            listenScroll: true,
            posY: 0,
            bubbleY: 0,
            pullup: true,
            pulldown: true,
            showScrollText: false,
        }
    },
    components: {
        'my-header': Header,
        'message-item': MessageItem,
        'scroll': Scroll,
        'bubble': Bubble,
        'scroll-text': scrollText
    },
    computed: {
        top() {
            return this.posY - 80
        },
        ...mapState({
            personalList: state => state.message.personalList,  //个人信息列表
            personalPage: state => state.message.personalPage,  //个人信息页数
            personalTotal: state => state.message.personalTotal,  //个人信息总条数数
            personalSize: state => state.message.personalSize,  //个人信息每页条数
        }),
        canScroll() {  //判断是否为最后一页，是否能再次加载
            if (this.personalPage >= Math.ceil(this.personalTotal / this.personalSize)) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        loadTop() {
            this.$store.commit('SET_PERSONAL_MEASSAGE_PAGE', 1)  //页码置1
            this.$store.commit('SET_MESSAGE_LIST', { data: [], type: 0 })  //清空列表
            this.$store.dispatch('getMessage', { type: 0 })  //请求列表
        },
        loadBottom() {
            this.$store.commit('SET_PERSONAL_MEASSAGE_PAGE') //页码加1
            this.$store.dispatch('getMessage', { type: 0 })  //请求列表
        },
        scroll(pos) {
            this.posY = pos.y
            this.bubbleY = pos.y - 80
        },
    },
    mounted() {
        if (this.personalList == 0) {
            let _this = this
            this.$store.dispatch('getMessage', { type: 0 })
                .then(function() {
                    if (_this.canScroll) { //如果能滚动加载，则显示加载提示
                        _this.showScrollText = true;
                    }

                })
        }
    }
}
</script>
<style lang="scss" scoped>
.platform {
    padding-top: 0.88rem;
    .scroll-box {
        padding: 0 .3rem;
        position: relative;
    }
}
</style>
