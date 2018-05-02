<template>
    <div class="projects">
        <div class="bubble-box" :style="{'top':top + 'px'}">
            <bubble :y="bubbleY"></bubble>
        </div>
        <scroll v-if="recordProjectList.length > 0" class="scroll-box" :data="recordProjectList" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll" :canScroll="canScroll">
            <div class="scroll-wrapper">
                <record-project-item v-for="(item,index) in recordProjectList" :key="index" :info="item"></record-project-item>
                <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
            </div>
        </scroll>
        <div class="empty" v-else></div>
    </div>
</template>
<script>
import Scroll from '../Common/Scroll'
import Bubble from '../Common/Bubble'
import scrollText from '../Common/ScrollText'
import RecordProjectItem from './RecordProjectItem'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            listenScroll: true,
            posY: 0,
            bubbleY: 0,
            pullup: true,
            pulldown: true,
            showScrollText: false,
        }
    },
    computed: {
        top() {
            return this.posY - 80
        },
        ...mapState({
            recordProjectList: state => state.record.recordProjectList,  //投资项目列表
            recordProjectPage: state => state.record.recordProjectPage,  //投资项目页数
            recordProjectTotal: state => state.record.recordProjectTotal,  //投资项目总条数数
            recordProjectSize: state => state.record.recordProjectSize,  //投资项目每页条数
        }),
        canScroll() {  //判断是否为最后一页，是否能再次加载
            if (this.recordProjectPage >= Math.ceil(this.recordProjectTotal / this.recordProjectSize)) {
                return false
            } else {
                return true
            }
        }
    },
    components: {
        'scroll': Scroll,
        'bubble': Bubble,
        'scroll-text': scrollText,
        'record-project-item':RecordProjectItem
    },
    methods: {
        loadTop() {
            this.$store.commit('CHANGE_RECORD_PROJECTS_PAGE', 1)  //页码置1
            this.$store.dispatch('getRecordProjectsList')  //请求列表
        },
        loadBottom() {
            this.$store.commit('CHANGE_RECORD_PROJECTS_PAGE') //页码加1
            this.$store.dispatch('getRecordProjectsList')  //请求列表
        },
        scroll(pos) {
            this.posY = pos.y
            this.bubbleY = pos.y - 80
        },
    },
    mounted() {
        let _this = this;
        this.$store.dispatch('getRecordProjectsList')
            .then(function(){
                if(_this.canScroll){ //如果能滚动加载，则显示加载提示
                    _this.showScrollText = true;
                }

            })  //请求列表
    },
}
</script>

<style lang="scss" scoped>
.projects {
    height: 100%;
    background: #fff;
    position: relative;
    overflow: hidden;
}
</style>
