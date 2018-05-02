<template>
  <div class="creditor">
      <div class="bubble-box" :style="{'top':top + 'px'}">
            <bubble :y="bubbleY"></bubble>
        </div>
        <scroll v-if="recordCreditorList.length > 0" class="scroll-box" :data="recordCreditorList" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll" :canScroll="canScroll">
            <div class="scroll-wrapper">
                <record-creditor-item v-for="(item,index) in recordCreditorList" :key="index" :info="item"></record-creditor-item>
                <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
            </div>
        </scroll>
        <div class="empty-gray" v-else></div>
  </div>
</template>
<script>
import Scroll from '../Common/Scroll'
import Bubble from '../Common/Bubble'
import scrollText from '../Common/ScrollText'
import RecordCreditorItem from './RecordCreditorItem'
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
            recordCreditorList: state => state.record.recordCreditorList,  //投资项目列表
            recordCreditorPage: state => state.record.recordCreditorPage,  //投资项目页数
            recordCreditorTotal: state => state.record.recordCreditorTotal,  //投资项目总条数数
            recordCreditorSize: state => state.record.recordCreditorSize,  //投资项目每页条数
        }),
        canScroll() {  //判断是否为最后一页，是否能再次加载
            if (this.recordCreditorPage >= Math.ceil(this.recordCreditorTotal / this.recordCreditorSize)) {
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
        'record-creditor-item':RecordCreditorItem
    },
    methods: {
        loadTop() {
            this.$store.commit('CHANGE_RECORD_CREDITOR_PAGE', 1)  //页码置1
            this.$store.dispatch('getRecordCreditorList')  //请求列表
        },
        loadBottom() {
            this.$store.commit('CHANGE_RECORD_CREDITOR_PAGE') //页码加1
            this.$store.dispatch('getRecordCreditorList')  //请求列表
        },
        scroll(pos) {
            this.posY = pos.y
            this.bubbleY = pos.y - 80
        },
    },
    mounted() { 
        let _this = this;
        this.$store.dispatch('getRecordCreditorList')
            .then(function(){
                if(_this.canScroll){ //如果能滚动加载，则显示加载提示
                    _this.showScrollText = true;
                }

            })  //请求列表
    },
}
</script>
<style lang="scss" scoped>
.creditor {
    height: 100%;
    position: relative;
    overflow: hidden;
}
</style>