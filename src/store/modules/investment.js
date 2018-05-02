import * as types from '../mutation-types'

const state = {
  investmentInfo:{}
}

const mutations = {
  [types.SET_INVESTMENT_INFO](state,data){
    state.investmentInfo = data
  },
}

const getters = {
  agreement_downloadurl(state){
    return state.investmentInfo.agreement_downloadurl
  },
  all_interest(state){
    return state.investmentInfo.all_interest
  },
  buyer_count(state){
    return state.investmentInfo.buyer_count
  },
  create_at(state){
    return state.investmentInfo.create_at
  },
  detail(state){
    return state.investmentInfo.detail
  },
  have_interest(state){
    return state.investmentInfo.have_interest
  },
  have_money(state){
    return state.investmentInfo.have_money
  },
  loan_info(state){
    return state.investmentInfo.loan_info
  },
  measure(state){
    return state.investmentInfo.measure
  },
  status(state){
    return state.investmentInfo.status
  },
  note(state){
    return state.investmentInfo.note
  },
  title(state){
    return state.investmentInfo.title
  },
  repaymenttime(state){
    return state.investmentInfo.repaymenttime
  },
  agreement(state){
    return state.investmentInfo.agreement
  },
  // title(state){
  //   return state.investmentInfo.title
  // },
  // title(state){
  //   return state.investmentInfo.title
  // },
  // title(state){
  //   return state.investmentInfo.title
  // },
}

export default {
  state,
  // actions,
  mutations,
  getters
}

