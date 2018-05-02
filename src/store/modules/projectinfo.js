import * as types from '../mutation-types'

const state = {
  showPacket:false,
  allPay:false,  //是否满标
  projectInfo:{},  //投资项目详情
  packetList:[],
  investmentMoney:''
}

const mutations = {
  //显示或隐藏红包
  [types.CHANGE_PACKET](state,boolean) {
    state.showPacket = boolean
  },
  [types.SET_PROJECT_INFO_ALLPAY](state,data){
    state.allPay = data
  },
  [types.SET_PROJECTINFO_INFO](state,data){
    state.projectInfo = data
  },
  [types.SET_PACKET](state,data){
    state.packetList = data
  },
  [types.SELECT_PACKET](state,num){
    state.packetList[num].check = true;
  },
  [types.CANCEL_PACKET](state,num){
    state.packetList[num].check = false;
  },
  [types.SET_PROJECTINFO_MONEY](state,data){
    state.investmentMoney = data;
  },
  [types.CLEAR_CHOOSE_PACKET](state){
    for(var i in state.packetList){
      state.packetList[i].check = false;
    }
  }
}

const actions = {
  changePacket({commit},boolean){
    commit(types.CHANGE_PACKET,boolean)
  }
}

const getters = {
  showPacket(state){
    return state.showPacket
  },
  surplus(state){  //剩余可投
    return state.projectInfo.money - state.projectInfo.have_money
  },
  sold(state){  //已售
    return ((state.projectInfo.have_money / state.projectInfo.money)*100).toFixed(1)
  },
  checkedPacket(state){  //返回选中的红包
    return state.packetList.filter(packetList => packetList.check)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
