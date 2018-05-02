import * as types from '../mutation-types'
import plugin from "../../server";
import {
  Indicator
} from 'mint-ui';
const state = {
  choose: '0', //选择新闻或者公告
  loadNotice: false, // 是否加载过公告
  loadNews: false, //是否加载过新闻
  noticeType: 2, //选中的公告类型
  newsList: [], //新闻列表
  newsPage: 1, //新闻列表页码
  newsTotal: 0, //新闻列表总条数
  newsSize: 10, //新闻列表每页条数
  noticeList: [], //公告列表
  noticePage: 1, //公告列表页码
  noticeTotal: 0, //公告列表总条数
  noticeSize: 10, //公告列表每页条数
}

const mutations = {
  [types.CHANGE_NEWS](state, data) { //选择新闻或者公告
    state.choose = data;
  },
  [types.CHANGE_NOTICE_TYPE](state, data) { //切换公告类型
    state.noticeType = data;
  },
  [types.SET_NEWS_LIST](state, data) { //设置新闻列表
    if (state.newsPage == 1) {
      state.newsList = data;
    } else {
      state.newsList = state.newsList.concat(data)
    }
  },
  [types.SET_NEWS_TOTAL](state, data) { //设置新闻总条数
    state.newsTotal = data;
  },
  [types.CHANGE_NEWS_PAGE](state, data) { //改变新闻页数
    if (data) {
      state.newsPage = data
    } else {
      state.newsPage++
    }
  },
  [types.LOAD_NOTICE](state) {
    if (!state.loadNotice) {
      state.loadNotice = true
    }
  },
  [types.LOAD_NEWS](state) {
    if (!state.loadNews) {
      state.loadNews = true
    }
  },
  [types.SET_NOTICE_LIST](state, data) { //设置公告列表
    if (state.noticePage == 1) {
      state.noticeList = data;
    } else {
      state.noticeList = state.noticeList.concat(data)
    }
  },
  [types.SET_NOTICE_TOTAL](state, data) { //设置新闻总条数
    state.noticeTotal = data;
  },
  [types.CHANGE_NOTICE_PAGE](state, data) { //改变新闻页数
    if (data) {
      state.noticePage = data
    } else {
      state.noticePage++
    }
  },
}

const actions = {
  getNewsList({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      Indicator.open();
      plugin.axios.get('/news/list', {
        params: {
          type: 1,
          page: state.newsPage,
          size: state.newsSize
        }
      }).then(function (res) {
        commit('SET_NEWS_LIST', res.data.returnData.list)
        commit('SET_NEWS_TOTAL', res.data.returnData.total ? Number(res.data.returnData.total) : 0)
        Indicator.close();
        resolve();
      }).catch(function () {
        Indicator.close()
      })
    })

  },
  getNoticeList({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      Indicator.open();
      plugin.axios.get('/news/list', {
        params: {
          type: state.noticeType,
          page: state.noticePage,
          size: state.noticeSize
        }
      }).then(function (res) {
        commit('SET_NOTICE_LIST', res.data.returnData.list)
        commit('SET_NOTICE_TOTAL', res.data.returnData.total ? Number(res.data.returnData.total) : 0)
        Indicator.close();
        resolve();
      }).catch(function () {
        Indicator.close()
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
