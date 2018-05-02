<template>
  <div class="received">
      <div class="received__top">
          <div class="received__top__number">{{receivedTotalMoney | formatNumber}}</div>
          <div class="received__top__text">累计已收本息(元)</div>
      </div>
      <div class="received__list">
          <div class="bubble-box" :style="{'top':top + 'px'}">
                <bubble :y="bubbleY"></bubble>
            </div>
            <scroll class="scroll-box" :data="receivedList" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll" :canScroll="canScroll">
                <div class="scroll-wrapper">
                    <income-item v-for="(item,index) in receivedList" :key="index" type="0" :info="item"></income-item>
                    <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
                </div>
            </scroll>
      </div>
  </div>
</template>
<script>
import IncomeItem from './IncomeItem'
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
            showScrollText: false,
        }
    },
    computed: {
        top() {
            return this.posY - 80
        },
        ...mapState({
            receivedList: state => state.gain.receivedList,  //待收收益列表
            receivedPage: state => state.gain.receivedPage,  //待收收益页数
            receivedTotal: state => state.gain.receivedTotal,  //待收收益总条数数
            receivedSize: state => state.gain.receivedSize,  //待收收益每页条数
            receivedTotalMoney: state => state.gain.receivedTotalMoney,  //累计已收本息
        }),
        canScroll() {  //判断是否为最后一页，是否能再次加载
            if (this.receivedPage >= Math.ceil(this.receivedTotal / this.receivedSize)) {
                return false
            } else {
                return true
            }
        }
    },
    components: {
        'income-item': IncomeItem,
        'scroll': Scroll,
        'bubble': Bubble,
        'scroll-text': scrollText
    },
    methods: {
        loadTop() {
            this.$store.commit('CHANGE_RECEIVED_PAGE', 1)  //页码置1
            this.$store.dispatch('getIncome', 2)  //请求列表
        },
        loadBottom() {
            this.$store.commit('CHANGE_RECEIVED_PAGE') //页码加1
            this.$store.dispatch('getIncome', 2)  //请求列表
        },
        scroll(pos) {
            this.posY = pos.y
            this.bubbleY = pos.y - 80
        },
    },
    mounted() {
        let _this = this;
        this.$store.dispatch('getIncome', 2)
            .then(function() {
                if (_this.canScroll) { //如果能滚动加载，则显示加载提示
                    _this.showScrollText = true;
                }

            })  //请求列表
    },
}
</script>
<style lang="scss" scoped>
.received{
    height: 100%;
    padding-top: 2.8rem;
    &__top{
        width: 100%;
        height: 2.8rem;
        padding-top: 0.75rem;
        position: absolute;
        left: 0;
        top: .88rem;
        background-image:linear-gradient(-175deg, #a587fe 0%, #5f8eff 100%);
        &__number{
            font-size: .9rem;
            line-height: 1;
            color: #fff;
            text-align: center;
        }
        &__text{
            opacity: .7;
            font-size: .26rem;
            line-height: .37rem;
            margin-top: 0.15rem;
            text-align: center;
            color: #fff;
        }
    }
    &__list{
        height: 100%;
        position: relative;
        overflow: hidden;
    }
}
</style>
