import * as types from './mutation-types'
export default {
  [types.SET_SLIDE](state, data) {
    state.needSilde = data;
  },
  [types.SET_USERINFO](state, data) {
    state.userInfo = data;
  },
  [types.SET_ANALOG_USER](state) {
    state.userInfo.account = 'Analog'
  },
  [types.TAB_LOGIN_CHOOSE](state, data) {
    state.loginChoose = data;
  },
  [types.SHOW_GLOBAL_LOGIN](state, data) {
    state.showLoginBox = data;
  },
  [types.SHOW_GLOBAL_FORGET](state, data) {
    state.showForgetBox = data;
  },
  [types.SET_INDEXCONFIG](state, data) {
    state.indexConfig = data
  },
  [types.SET_ACCOUNT_BALANCE](state, data){
    state.assets = data
  },
  [types.SET_USERINFO_AVATAR](state, data){
    state.userInfo.thumb = data.url;
  },
  [types.SET_REGISET_ARGREEMENT](state,data){
    state.showRegisterAgreement = data
  }
}
