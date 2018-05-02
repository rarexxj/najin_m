<template>
  <div class="creidtors">
    <div class="scroll-box" v-if="creditorList.length > 0">
      <div class="bubble-box" :style="{'top':top + 'px'}">
        <bubble :y="bubbleY"></bubble>
      </div>
      <scroll class="creidtors__scroll" :data="creditorList" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll" :canScroll="canScroll">
        <div class="scroll-wrapper">
          <creditor-item v-for="(item,index) in creditorList" :info="item" :key="index"></creditor-item>
          <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
        </div>

      </scroll>
    </div>
    <div class="empty-gray" v-else></div>
  </div>
</template>
<script>
import CreditorItem from './CreditorItem.vue'
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
    ...mapState({
      creditorList: state => state.projects.creditorList,  //债权列表
      creditorPage: state => state.projects.creditorPage,  //债权页数
      creditorTotal: state => state.projects.creditorTotal,  //债权总条数
      creditorSize: state => state.projects.creditorSize,  //债权每页条数
    }),
    canScroll() {  //判断是否为最后一页，是否能再次加载
      if (this.creditorPage >= Math.ceil(this.creditorTotal / this.creditorSize)) {
        return false
      } else {
        return true
      }
    },
    top() {
      return this.posY - 80
    },
  },
  components: {
    'creditor-item': CreditorItem,
    'scroll': Scroll,
    'bubble': Bubble,
    'scroll-text': scrollText
  },
  methods: {
    loadTop() {
      this.$store.commit('CHANGE_CREDITOR_PAGE', 1) // 页码重置为1
      this.$store.dispatch('getCreditorList') // 请求
    },
    loadBottom() {
      this.$store.commit('CHANGE_CREDITOR_PAGE') // 页码增加
      this.$store.dispatch('getCreditorList')// 请求
    },
    scroll(pos) {
      this.posY = pos.y
      this.bubbleY = pos.y - 80
    },
  },
  mounted() {
    var _this = this;
    this.$store.dispatch('getCreditorList')  //请求列表
      .then(function() {
        if (_this.canScroll) { //如果能滚动加载，则显示加载提示      
          _this.showScrollText = true;
        }
      })
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.creidtors {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 1.78rem;
  padding-bottom: 1rem;
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
