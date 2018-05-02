<template>
    <div class="notice-list">
        <div class="bubble-box" :style="{'top':top + 'px'}">
            <bubble :y="bubbleY"></bubble>
        </div>
        <scroll class="notice-list__scroll" :data="noticeList" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll">
            <div class="scroll-wrapper">
                <notice-item v-for="(item,index) in noticeList" :key="index" :info="item"></notice-item>
                <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
            </div>
        </scroll>
    </div>
</template>
<script>
import NoticeItem from './NoticeItem'
import Scroll from '../Common/Scroll'
import Bubble from '../Common/Bubble'
import scrollText from '../Common/ScrollText'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            bubbleY: 0,
            listenScroll: true,
            posY: 0,
            pullup: true,
            pulldown: true,
            showScrollText: false,
        }
    },
    components: {
        'notice-item': NoticeItem,
        'scroll': Scroll,
        'bubble': Bubble,
        'scroll-text': scrollText
    },
    computed: {
        top() {
            return this.posY - 80
        },
        ...mapState({
            noticeList: state => state.news.noticeList,  //公告列表
            noticePage: state => state.news.noticePage,  //公告页数
            noticeTotal: state => state.news.noticeTotal,  //公告总条数数
            noticeSize: state => state.news.noticeSize,  //公告每页条数
        }),
        canScroll() {  //判断是否为最后一页，是否能再次加载
            if (this.noticePage >= Math.ceil(this.noticeTotal / this.noticeSize)) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        loadTop() {
            this.$store.commit('CHANGE_NOTICE_PAGE', 1)  //页码置1
            this.$store.dispatch('getNoticeList')  //请求列表
        },
        loadBottom() {
            this.$store.commit('CHANGE_NOTICE_PAGE') //页码加1
            this.$store.dispatch('getNoticeList')  //请求列表
        },
        scroll(pos) {
            this.posY = pos.y
            this.bubbleY = pos.y - 80
        },
    },
    mounted() {
        //加载公告列表
        let _this = this;
        this.$store.dispatch('getNoticeList')
            .then(function() {
                if (_this.canScroll) { //如果能滚动加载，则显示加载提示
                    _this.showScrollText = true;
                }
            })  //请求列表
    }
}
</script>

<style lang="scss" scoped>
.notice-list {
    padding: 0 .3rem;
    background: #fff;
    height: 100%;
    position: relative;
    overflow: hidden;
    &__scroll {
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
}
</style>