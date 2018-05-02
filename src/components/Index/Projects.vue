<template>
  <div class="projects">
    <div class="projects__title">
      <div class="projects__title__text">推荐项目</div>
      <router-link tag="div" :to="{name:'projects'}" class="projects__title__more">更多</router-link>
    </div>
    <div class="projects__list" id="project_list" style="">
      <ul class="projects__list__ul f-cb" :style="{width:width + 'px'}">
        <porject-item v-for="(item,index) in projectList" :num="index" :key="index" :info="item"></porject-item>
      </ul>

    </div>
  </div>
</template>
<script>
import ProjectItem from './ProjecetItem.vue'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      projectList: [],
      scroller: null,
      width: 0
    }
  },
  components: {
    'porject-item': ProjectItem
  },
  activated() {
    this.getProject();
  },
  methods: {
    getProject() {
      var _this = this;
      this.$http.get('/project/list?flag=1&size=10')
        .then(function(res) {
          _this.projectList = res.data.returnData.list;

          _this.$nextTick(function() {
            _this.width = document.querySelector('.project-item').clientWidth * 1.045 * _this.projectList.length
            setTimeout(() => {
              _this.scroll()
            },200)

          })
        })
    },
    scroll() {
      this.scroller = new BScroll(document.getElementById('project_list'), {
        probeType: 1,
        click: true,
        scrollX: true
      })
    }
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.projects {
  margin-top: .35rem;
  &__title {
    display: flex;
    justify-content: space-between;
    line-height: .4rem;
    &__text {
      font-size: .28rem;
      color: #666;
    }
    &__more {
      padding-right: .36rem;
      font-size: .2rem;
      color: #c4c4c4;
      background: url("../../assets/img/index_more.png") no-repeat right center;
      background-size: .25rem .25rem;
    }
  }
  &__list {
    margin-top: .24rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    &__ul {
      width: 10000px;
    }
  }
}
</style>
