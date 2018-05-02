import * as types from '../mutation-types'

const state = {
  card:{}
}

const mutations = {
  [types.SET_CHANGE_CARD](state,data){
    state.card = data;
  }
}


export default {
  state,
  mutations,
}
