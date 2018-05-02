import * as types from '../mutation-types'

const state = {
  creditorInfo: {}, //债权转让详情
}

const mutations = {
    [types.SET_CREDITOR_INFO](state,data){
        state.creditorInfo = data
    }
}

export default {
    state,
    // actions,
    mutations,
    // getters
  }