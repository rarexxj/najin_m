<template>
    <div class="news-list">
        <div class="bubble-box" :style="{'top':top + 'px'}">
            <bubble :y="bubbleY"></bubble>
        </div>
        <scroll class="news-list__scroll" :data="newsList" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll" :canScroll="canScroll">
            <div class="scroll-wrapper">
                <news-item v-for="(item,index) in newsList" :key="index" :info="item"></news-item>
                <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
            </div>
        </scroll>
    </div>
</template>
<script>
import NewsItem from './NewsItem'
import Scroll from '../Common/Scroll'
import Bubble from '../Common/Bubble'
import scrollText from '../Common/ScrollText'
import { mapState } from 'vuex'
export default {
    data() { 
        return {
            listenScroll: true,
            posY: 0,
            bubbleY: 0,
            pullup: true,
            pulldown: true,
            showScrollText:false,
        }
    },
    computed: {
        top() {
            return this.posY - 80
        },
        ...mapState({
            newsList: state => state.news.newsList,  //新闻列表
            newsPage: state => state.news.newsPage,  //新闻页数
            newsTotal: state => state.news.newsTotal,  //新闻总条数数
            newsSize: state => state.news.newsSize,  //新闻每页条数
        }),
        canScroll() {  //判断是否为最后一页，是否能再次加载
            if (this.newsPage >= Math.ceil(this.newsTotal / this.newsSize)) {
                return false
            } else {
                return true
            }
        }
    },
    components: {
        'news-item': NewsItem,
        'scroll': Scroll,
        'bubble': Bubble,
        'scroll-text':scrollText
    },
    methods: {
        loadTop() {
            this.$store.commit('CHANGE_NEWS_PAGE', 1)  //页码置1
            this.$store.dispatch('getNewsList')  //请求列表
        },
        loadBottom() {
            this.$store.commit('CHANGE_NEWS_PAGE') //页码加1
            this.$store.dispatch('getNewsList')  //请求列表
        },
        scroll(pos) {
            this.posY = pos.y
            this.bubbleY = pos.y - 80
        },
    },
    mounted() {
        let _this = this;
        this.$store.dispatch('getNewsList')
            .then(function(){
                if(_this.canScroll){ //如果能滚动加载，则显示加载提示
                    _this.showScrollText = true;
                }

            })  //请求列表
    },
}
</script>

<style lang="scss" scoped>
.news-list {
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
