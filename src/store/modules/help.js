import * as types from '../mutation-types'

const state = {
  showInfo:false,  
  showCommonInfo:false,
  showContactInfo:false
}

const mutations = {
  [types.SHOW_HELP_INFO](state,data){
    state.showInfo = data;
  },
  [types.SHOW_COMMON_INFO](state,data){
    state.showCommonInfo = data;
  },
  [types.SHOW_CONTACT_INFO](state,data){
    state.showContactInfo = data;
  }
}


export default {
  state,
  // actions,
  mutations,
  // getters
}
