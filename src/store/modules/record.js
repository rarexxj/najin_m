import * as types from '../mutation-types'
import plugin from "../../server";
import {
  Indicator
} from 'mint-ui';

const state = {
  choose: '0', //选择投资项目或者债权承接
  // loadProjects: false, // 是否加载过公告
  loadCreditor: false, //是否加载过新闻
  recordProjectList: [], //投资项目列表
  recordProjectPage: 1, //投资项目列表页码
  recordProjectTotal: 0, //投资项目列表总条数
  recordProjectSize: 10, //投资项目列表每页条数
  recordCreditorList: [], //债权承接列表
  recordCreditorPage: 1, //债权承接列表页码 
  recordCreditorTotal: 0, //债权承接列表总条数
  recordCreditorSize: 10, //债权承接列表每页条数
}

const mutations = {
  [types.CHANGE_RECORD](state, data) { //选择投资项目或者债权承接
    state.choose = data;
  },
  [types.SET_RECORD_PROJECTS_LIST](state, data) { //设置投资项目列表
    if (state.recordProjectPage == 1) {
      state.recordProjectList = data;
    } else {
      state.recordProjectList = state.recordProjectList.concat(data)
    }
  },
  [types.SET_RECORD_PROJECTS_TOTAL](state, data) { //设置投资项目总条数
    state.recordProjectTotal = data;
  },
  [types.CHANGE_RECORD_PROJECTS_PAGE](state, data) { //改变投资项目页数
    if (data) {
      state.recordProjectPage = data
    } else {
      state.recordProjectPage++
    }
  },
  [types.LOAD_RECORD_CREDITOR](state) {
    if (!state.loadCreditor) {
      state.loadCreditor = true
    }
  },
  [types.SET_RECORD_CREDITOR_LIST](state, data) { //设置债权承接列表
    if (state.recordCreditorPage == 1) {
      state.recordCreditorList = data;
    } else {
      state.recordCreditorList = state.recordCreditorList.concat(data)
    }
  },
  [types.SET_RECORD_CREDITOR_TOTAL](state, data) { //设置债权承接总条数
    state.recordCreditorTotal = data;
  },
  [types.CHANGE_RECORD_CREDITOR_PAGE](state, data) { //改变债权承接页数
    if (data) {
      state.recordCreditorPage = data
    } else {
      state.recordCreditorPage++
    }
  },
}

const actions = {
  getRecordProjectsList({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      Indicator.open();
      plugin.axios.get('/user/investmentList', {
        params: {
          type: -1,
          page: state.recordProjectPage,
          size: state.recordProjectSize
        }
      }).then(function (res) {
        commit('SET_RECORD_PROJECTS_LIST', res.data.returnData.list)
        commit('SET_RECORD_PROJECTS_TOTAL', res.data.returnData.total ? Number(res.data.returnData.total) : 0)
        Indicator.close();
        resolve();
      }).catch(function () {
        Indicator.close()
      })
    })
  },
  getRecordCreditorList({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      Indicator.open();
      plugin.axios.get('/user/transferList', {
        params: {
          page: state.recordCreditorPage,
          size: state.recordCreditorSize,
          type: 3
        }
      }).then(function (res) {
        commit('SET_RECORD_CREDITOR_LIST', res.data.returnData.list)
        commit('SET_RECORD_CREDITOR_TOTAL', res.data.returnData.total ? Number(res.data.returnData.total) : 0)
        Indicator.close();
        resolve();
      }).catch(function () {
        Indicator.close()
      })
    })
  },
}

export default {
  state,
  mutations,
  actions
}
