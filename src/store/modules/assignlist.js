import * as types from '../mutation-types'
import plugin from "../../server";
import {
  Indicator
} from 'mint-ui';
const state = {
  isLoadTransferring: false,
  isLoadTransferred: false,
  type: "4",
  transferableList: [],
  transferablePage: 1,
  transferableTotal: 0, //注释写得太累了
  transferableSize: 10,
  transferringList: [],
  transferringPage: 1,
  transferringTotal: 0,
  transferringSize: 10,
  transferredList: [],
  transferredPage: 1,
  transferredTotal: 0,
  transferredSize: 10,
  transferInfo:{}
}
const mutations = {
  [types.TAB_ASSIGNLIST](state, data) {
    state.type = data
  },
  [types.LOAD_TRANSFERRING](state) {
    state.isLoadTransferring = true
  },
  [types.LOAD_TRANSFERRED](state) {
    state.isLoadTransferred = true
  },
  [types.SET_TRANSFER_LIST](state, data) {
    switch (state.type) {
      case "4":
        if (state.transferablePage == 1) {
          state.transferableList = data;
        } else {
          state.transferableList = state.transferableList.concat(data)
        }
        break;
      case "1":
        if (state.transferringPage == 1) {
          state.transferringList = data;
        } else {
          state.transferringList = state.transferringList.concat(data)
        }
        break;
      case "2":
        if (state.transferredPage == 1) {
          state.transferredList = data;
        } else {
          state.transferredList = state.transferredList.concat(data)
        }
        break;
    }
  },
  [types.SET_TRANSFER_TOTAL](state, data) { //设置待收收益总条数
    switch (state.type) {
      case "4":
        state.transferableTotal = data;
        break;
      case "1":
        state.transferringTotal = data;
        break;
      case "2":
        state.transferredTotal = data;
        break;
    }
  },
  [types.CHANGE_TRANSFER_PAGE](state, data) { //改变待收收益页数
    switch (state.type) {
      case "4":
        if (data) {
          state.transferablePage = data
        } else {
          state.transferablePage++
        }
        break;
      case "1":
        if (data) {
          state.transferringPage = data
        } else {
          state.transferringPage++
        }
        break;
      case "2":
        if (data) {
          state.transferredPage = data
        } else {
          state.transferredPage++
        }
        break;
    }
  },
  [types.SET_TRANSFER_INFO](state,data){
    state.transferInfo = data
  }
}

const actions = {
  getTransferList({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      Indicator.open();
      let params = {
        type:state.type,
        page:state.type == "4" ? state.transferablePage : (state.type == "1" ? state.transferringPage : state.transferredPage),
        size:state.type == "4" ? state.transferableSize : (state.type == "1" ? state.transferringSize : state.transferredSize)
      }
      plugin.axios.get('/user/transferList', {
        params: params
      }).then(function (res) {
        commit('SET_TRANSFER_LIST', res.data.returnData.list)
        commit('SET_TRANSFER_TOTAL', res.data.returnData.total ? Number(res.data.returnData.total) : 0)
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
