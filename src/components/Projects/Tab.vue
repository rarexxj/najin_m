<template>
  <div class="projects-tab">
    <div :class="[projectChoose == 0?'projects-tab__item--active':'projects-tab__item']" style="margin-right: .85rem;" @click="tab(0)">投资项目
      <i class="line"></i>
    </div>
    <div :class="[projectChoose == 1?'projects-tab__item--active':'projects-tab__item']" @click="tab(1)">债权转让
      <i class="line"></i>
    </div>
    <div class="screen-btn" v-if="projectChoose == 0" @click="showScreen()"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    projectChoose: state => state.projects.projectChoose  //选中投资项目/债权转让
  }),
  methods: {
    //切换投资项目/债权转让
    tab(num) {
      this.$store.commit('TAB_PROJECTS', num)
      if (num == 1) {
        this.$store.commit('LOAD_CREDITOR');
      }
      if (num == 0) {
        this.$store.commit('LOAD_PROJECTS');
      }
    },
    //显示筛选框
    showScreen() {
      this.$store.commit('SET_PROJECTS_SCREEN', true)

    }
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.projects-tab {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: .88rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  z-index: 5;
  .line {
    position: absolute;
    width: .24rem;
    height: .04rem;
    bottom: 0;
    left: 50%;
    margin-left: -.12rem;
    background: #ff5a59;
    display: none;
  }
  &__item {
    font-size: .3rem;
    line-height: .88rem;
    color: #666;
    position: relative;
    height: .88rem;
    &--active {
      @extend .projects-tab__item;
      color: #ff5a59;
      .line {
        display: block;
      }
    }
  }
}

.screen-btn {
  width: .32rem;
  height: .28rem;
  position: absolute;
  right: .25rem;
  top: .3rem;
  background: url("../../assets/img/projects_screen_icon.png") no-repeat;
  background-size: contain;
}
</style>
