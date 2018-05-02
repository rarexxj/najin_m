<template>
  <div id="news" :class="['news',choose == 1?'pt':'']">

    <!--头部切换-->
    <tab></tab>
    <!--头部切换-->

    <screen v-show="choose == 1"></screen>

    <!-- 新闻列表 -->
    <div class="scroll-box" v-show="choose == 0" v-if="loadNews">
      <news-list></news-list>
    </div>
    <!-- 新闻列表 -->

    <!-- 公告列表 -->
    <div class="scroll-box" v-show="choose == 1" v-if="loadNotice">
      <notice-list></notice-list>
    </div>
    <!-- 公告列表 -->

    <nav-bar :num="2"></nav-bar>
  </div>
</template>
<script>
import Navbar from '../Common/Navbar.vue'
import Tab from './Tab.vue'
import NewsList from './NewsList'
import NoticeList from './NoticeList'
import Screen from './Screen'
import { mapState } from 'vuex'
export default {
  computed: mapState({
    choose: state => state.news.choose,  //显示 行业新闻/平台公告
    loadNotice: state => state.news.loadNotice,  // 是否已经加载平台公告
    loadNews: state => state.news.loadNews,  // 是否已经加载行业新闻
  }),
  components: {
    'nav-bar': Navbar,
    'tab': Tab,
    'news-list': NewsList,
    'notice-list': NoticeList,
    'screen': Screen
  },
  mounted(){
    //type 为0 则显示行业新闻 为1 则显示平台公告
    if(this.$route.query.type == 1 || this.$route.query.type == null){
      this.$store.commit('LOAD_NEWS');
      this.$store.commit('CHANGE_NEWS',0);
    }else{
      this.$store.commit('CHANGE_NOTICE_TYPE',this.$route.query.type)
      this.$store.commit('LOAD_NOTICE');
      this.$store.commit('CHANGE_NEWS',1);
    }
  }
}
</script>
<style lang="scss" scoped>
.news {
  padding-top: 0.88rem;
  padding-bottom: 0.98rem;
  &.pt {
    padding-top: 1.78rem;
  }
}
</style>