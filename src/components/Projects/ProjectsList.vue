<template>
  <div class="projects">
    <div class="scroll-box" v-if="projectsList.length > 0">
      <div class="bubble-box" :style="{'top':top + 'px'}">
        <bubble :y="bubbleY"></bubble>
      </div>
      <scroll class="projects__scroll" :data="projectsList" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll" :canScroll="canScroll">
        <div class="scroll-wrapper">
          <project-item v-for="(item,index) in projectsList" :key="index" :info="item"></project-item>
          <scroll-text :canScroll="canScroll" v-show="showScrollText"></scroll-text>
        </div>
      </scroll>
    </div>
    <div class="empty-gray" v-else></div>
  </div>
</template>
<script>
import ProjectItem from './ProjectItem.vue'
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
      projectsList: state => state.projects.projectsList,  //项目状态列表
      projectsPage: state => state.projects.projectsPage,  //项目页数
      projectTotal: state => state.projects.projectTotal,  //项目总条数数
      projectsSize: state => state.projects.projectsSize,  //项目每页条数
    }),
    canScroll() {  //判断是否为最后一页，是否能再次加载
      if (this.projectsPage >= Math.ceil(this.projectTotal / this.projectsSize)) {
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
    'project-item': ProjectItem,
    'scroll': Scroll,
    'bubble': Bubble,
    'scroll-text': scrollText
  },
  methods: {
    loadTop() {
      this.$store.commit('CHANGE_PROJECTS_PAGE', 1)  //刷新页面变成1
      this.$store.commit('SET_PROJECTS_LIST', []) // 清空投资项目列表（防止mounted方法不会被调用）
      this.$store.dispatch('getProjectsList')  //请求列表
    },
    loadBottom() {
      this.$store.commit('CHANGE_PROJECTS_PAGE')  //页码增加
      this.$store.dispatch('getProjectsList')  //请求列表
    },
    scroll(pos) {
      this.posY = pos.y
      this.bubbleY = pos.y - 80
    },
  },
  mounted() {
    //获取投资项目所有筛选条件

    let _this = this;
    this.$store.dispatch('getProjectsScreen')
      .then(function() {
        if (_this.canScroll) { //如果能滚动加载，则显示加载提示      
          _this.showScrollText = true;
        }
      })
  },
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.projects {
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
