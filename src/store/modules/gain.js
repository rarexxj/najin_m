import * as types from '../mutation-types'
import plugin from "../../server";
import {
  Indicator
} from 'mint-ui';
const state = {
  choose: '0', //选择待收收益或者已收收益
  loadGain:false, //是否加载过已收收益

  incomeList: [], //待收收益列表
  incomePage: 1, //待收收益列表页码
  incomeTotal: 0, //待收收益列表总条数
  incomeSize: 10, //待收收益列表每页条数
  incomeTotalMoney:0, //总待收本息
  receivedList: [], //已收收益列表
  receivedPage: 1, //已收收益列表页码
  receivedTotal: 0, //已收收益列表总条数
  receivedSize: 10, //已收收益列表每页条数
  receivedTotalMoney:0, //累计已收本息
}

const mutations = {
  [types.CHANGE_GAIN](state, data) { //选择待收收益或者已收收益
    state.choose = data;
  },
  [types.LOAD_GAIN](state) {
    if (!state.loadGain) {
      state.loadGain = true
    }
  },
  [types.SET_INCOME_LIST](state, data) { //设置待收收益列表
    if (state.incomePage == 1) {
      state.incomeList = data;
    } else {
      state.incomeList = state.incomeList.concat(data)
    }
  },
  [types.SET_INCOME_TOTAL](state, data) { //设置待收收益总条数
    state.incomeTotal = data;
  },
  [types.CHANGE_INCOME_PAGE](state, data) { //改变待收收益页数
    if (data) {
      state.incomePage = data
    } else {
      state.incomePage++
    }
  },
  [types.SET_INCOME_TOTAL_MONEY](state, data) { //设置总待收本息
    state.incomeTotalMoney = data;
  },
  [types.SET_RECEIVED_LIST](state, data) { //设置已收收益列表
    if (state.receivedPage == 1) {
      state.receivedList = data;
    } else {
      state.receivedList = state.receivedList.concat(data)
    }
  },
  [types.SET_RECEIVED_TOTAL](state, data) { //设置已收收益总条数
    state.receivedTotal = data;
  },
  [types.CHANGE_RECEIVED_PAGE](state, data) { //改变已收收益页数
    if (data) {
      state.receivedPage = data
    } else {
      state.receivedPage++
    }
  },
  [types.SET_RECEIVED_TOTAL_MONEY](state, data) { //设置累计已收本息
    state.receivedTotalMoney = data;
  },
}

const actions = {
  getIncome({
    state,
    commit
  },type) {
    return new Promise((resolve, reject) => {
      Indicator.open();
      plugin.axios.get('/user/incomeListApp', {
        params: {
          type: type,
          page: type == 1 ? state.incomePage : state.receivedPage,
          size: type == 1 ? state.incomeSize : state.receivedSize
        }
      }).then(function (res) {
        if(type == 1){
          commit('SET_INCOME_LIST', res.data.returnData.list)
          commit('SET_INCOME_TOTAL', res.data.returnData.total ? Number(res.data.returnData.total) : 0)
          commit('SET_INCOME_TOTAL_MONEY',res.data.returnData.total_income)
        }else{
          commit('SET_RECEIVED_LIST', res.data.returnData.list)
          commit('SET_RECEIVED_TOTAL', res.data.returnData.total ? Number(res.data.returnData.total) : 0)
          commit('SET_RECEIVED_TOTAL_MONEY',res.data.returnData.total_income)
        }
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

