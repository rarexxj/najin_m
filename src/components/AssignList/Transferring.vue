<template>
    <div class="transfer">
        <div class="bubble-box" :style="{'top':top + 'px'}">
            <bubble :y="bubbleY"></bubble>
        </div>
        <scroll class="scroll-box" v-if="transferringList.length > 0" :data="transferringList" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll" :canScroll="canScroll">
            <div class="scroll-wrapper">
                <assgin-item type="4" v-for="(item,index) in transferringList" :key="index" :info="item"></assgin-item>
                <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
            </div>
        </scroll>
        <div class="empty-gray" v-else></div>
    </div>
</template>
<script>
import AssignItem from './AssignItem'
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
            transferringList: state => state.assignlist.transferringList,
            transferringPage: state => state.assignlist.transferringPage,
            transferringTotal: state => state.assignlist.transferringTotal, 
            transferringSize: state => state.assignlist.transferringSize,  
        }),
        canScroll() {  //判断是否为最后一页，是否能再次加载
            if (this.transferringPage >= Math.ceil(this.transferringTotal / this.transferringSize)) {
                return false
            } else {
                return true
            }
        }
    },
  components: {
        'assgin-item':AssignItem,
        'scroll': Scroll,
        'bubble': Bubble,
        'scroll-text':scrollText
    },
    methods: {
        loadTop() {
            this.$store.commit('CHANGE_TRANSFER_PAGE', 1)  //页码置1
            this.$store.dispatch('getTransferList')  //请求列表
        },
        loadBottom() {
            this.$store.commit('CHANGE_TRANSFER_PAGE') //页码加1
            this.$store.dispatch('getTransferList')  //请求列表
        },
        scroll(pos) {
            this.posY = pos.y
            this.bubbleY = pos.y - 80
        },
    },
    mounted(){
        let _this = this
        this.$store.dispatch('getTransferList')
            .then(function(){
                if(_this.canScroll){ //如果能滚动加载，则显示加载提示
                    _this.showScrollText = true;
                }

            })  //请求列表
    }
}
</script>
<style lang="scss" scoped>
.transfer{
    height: 100%;
    overflow: hidden;
    position: relative;
}
</style>
