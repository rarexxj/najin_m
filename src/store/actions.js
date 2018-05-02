import * as types from './mutation-types'
import plugin from "../server";
import plus from '../public'
//登录
export const UpdateUserInfo = ({commit}) => {  //更新用户信息
  plugin.axios.get('/user/info')
    .then(function (res) {
      commit('SET_USERINFO',res.data.returnData);
      // plus.cook.set('userInfo',plus.base64encode(res.data.returnData))
      window.localStorage.setItem('userInfo',plus.base64encode(res.data.returnData))
    })
}

export const getBalance = ({commit}) =>{  //获取余额
  var _this = this;
  plugin.axios.get('funds/assets')
    .then(function (res) {
      commit('SET_ACCOUNT_BALANCE',res.data.returnData)
    })
}