import * as types from '../mutation-types'
import plugin from "../../server";
import {
  Indicator
} from 'mint-ui';
const state = {
  platformList: [], //平台信息列表
  platformPage: 1, //平台信息列表页码
  platformTotal: 0, //平台信息列表总条数
  platformSize: 10, //平台信息列表每页条数
  personalList: [], //个人信息列表
  personalPage: 1, //个人信息列表页码
  personalTotal: 0, //个人信息列表总条数
  personalSize: 10, //个人信息列表每页条数
}

const mutations = {
  [types.SET_MESSAGE_LIST](state, data) {
    if (data.type == 0) {
      if (state.personalPage == 1) {
        state.personalList = data.data
      } else {
        state.personalList = state.personalList.concat(data.data)
      }
    } else {
      if (state.platformPage == 1) {
        state.platformList = data.data
      } else {
        state.platformList = state.platformList.concat(data.data)
      }

    }
  },
  [types.SET_MESSAGE_LIST_TOTAL](state, data) {
    if (data.type == 0) {
      state.personalTotal = data.total
    } else {
      state.platformTotal = data.total
    }
  },
  [types.SET_PERSONAL_MEASSAGE_PAGE](state, data) {
    if (data) {
      state.personalPage = data
    } else {
      state.personalPage++
    }
  },
  [types.SET_PLATFORM_MEASSAGE_PAGE](state, data) {
    if (data) {
      state.personalPage = data
    } else {
      state.personalPage++
    }
  }
}

const actions = {
  getMessage({
    state,
    commit,
    dispatch
  }, data) {
    return new Promise((resolve,reject) => {
        Indicator.open();
        let params = {
          page: data.type == 0 ? state.personalPage : state.platformPage,
          size: data.type == 0 ? state.personalSize : state.platformSize,
          type: data.type
        }
        plugin.axios.get('/user/message', {
          params: params
        }).then(function (res) {
          commit('SET_MESSAGE_LIST', {
            data: res.data.returnData.list,
            type: data.type
          })
          commit('SET_MESSAGE_LIST_TOTAL', {
            total: res.data.returnData.total,
            type: data.type
          })
          Indicator.close()
          resolve()
          for(let i in res.data.returnData.list){
            var datas = res.data.returnData.list[i];
            if(datas.is_read == 0){  //读取未读消息数
                dispatch('readMessage',datas.id)
            }
          }
        }).catch(function () {
          Indicator.close()
        })
    })
  },
  readMessage({state},id){
    plugin.axios.get('/user/read_mark?id=' + id)
  }

}

const getters = {
  getPersonalFirst(state) {
    return state.personalList[0]
  },
  getPlatformFirst(state) {
    return state.platformList[0]
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}
