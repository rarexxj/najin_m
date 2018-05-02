import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import * as actions from './actions'
import * as getters from './getters'
import projects from './modules/projects'
import projectinfo from './modules/projectinfo'
import welcome from './modules/welcome'
import news from './modules/news'
import record from './modules/record'
import gain from './modules/gain'
import assignlist from './modules/assignlist'
import help from './modules/help'
import message from './modules/message'
import creditorinfo from './modules/creditorinfo'
import card from './modules/card'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters, // return
  actions,  //
  modules:{
    projects,
    projectinfo,
    welcome,
    news,
    record,
    gain,
    assignlist,
    help,
    message,
    creditorinfo,
    card
  }
})
