import * as types from '../mutation-types'
import plugin from "../../server";

const state = {
  bannerList:[]
}

const mutations = {
  [types.SET_WELCOME_BANNER](state,data){
    state.bannerList = data;
  }
}

const actions = {
    getWelcomeBanner({commit}){
        plugin.axios.get('/common/banner?type=3')
            .then(function(res){
                commit('SET_WELCOME_BANNER',res.data.returnData.list)
                console.log(res.data.returnData.list)
            })
    }
}

export default {
  state,
  mutations,
  actions
}
