import plus from '../public.js'

export default {
  indexConfig:{},
  needSilde:false,
  // userInfo:plus.cook.get('userInfo')?plus.base64decode(plus.cook.get('userInfo')):{}, //个人信息
  userInfo:window.localStorage.getItem('userInfo')?plus.base64decode(window.localStorage.getItem('userInfo')):{},
  showLoginBox:false, //是否显示登录窗口
  showForgetBox:false, //是否显示忘记密码窗口
  loginChoose:0, //登录窗口显示 登录或者注册
  assets:{}, // 账户余额
  showRegisterAgreement:false, // 是否显示全局注册协议
}
