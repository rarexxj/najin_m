import Vue from 'vue'
import Router from 'vue-router'

const asyncComponent = (name) => {
  return resolve => require([`@/components/${name}`], resolve)
}
const Index = asyncComponent('Index/Index')
const Register = asyncComponent('Register/Register')
const Login = asyncComponent('Login/Login')
const Forget = asyncComponent('Forget/Forget')
const Projects = asyncComponent('Projects/Projects')
const News = asyncComponent('News/News')
const ProjectInfo = asyncComponent('ProjectInfo/ProjectInfo')
const InvestmentList = asyncComponent('ProjectInfo/InvestmentList')
const ProjectBuy = asyncComponent('ProjectInfo/Buy')
const CreditorInfo = asyncComponent('CreditorInfo/CreditorInfo')
const NewsInfo = asyncComponent('News/NewsInfo')
const Success = asyncComponent('Success/Success')
const Error = asyncComponent('Success/Error')
// const Agreement = asyncComponent('Common/Agreement')
const Center = asyncComponent('Center/Center')
const Account = asyncComponent('Account/Account')
const Safe = asyncComponent('Safe/Safe')
const Card = asyncComponent('Card/Card')
const CardChange = asyncComponent('Card/CardChange')
const Password = asyncComponent('Password/Password')
const Record = asyncComponent('Record/Record')
const Investment = asyncComponent('Record/Investment')
const Gain = asyncComponent('Gain/Gain')
const AssignList = asyncComponent('AssignList/AssignList')
const AssignInfo = asyncComponent('AssignList/AssignInfo')
const Packet = asyncComponent('Packet/Packet')
const Invite = asyncComponent('Invite/Invite')
const InviteList = asyncComponent('Invite/InviteList')
const Help = asyncComponent('Help/Help')
const CommonQuestion = asyncComponent('Help/CommonQuestion')
const Contact = asyncComponent('Contact/Contact')
const Recharge = asyncComponent('Recharge/Recharge')
const RechargeList = asyncComponent('Recharge/RechargeList')
const Withdrawals = asyncComponent('Withdrawals/Withdrawals')
const WithdrawalsList = asyncComponent('Withdrawals/WithdrawalsList')
const Message = asyncComponent('Message/Message')
const Platform = asyncComponent('Message/Platform')
const Personal = asyncComponent('Message/Personal')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/login/forget',
      name: 'forget',
      component: Forget,
      meta:{
        requireLogin:false
      },
    },

    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/projects/info',
      name: 'projectinfo',
      component: ProjectInfo,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/projects/info/investmentlist',
      name: 'investmentlist',
      component: InvestmentList,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/projects/info/buy',
      name: 'projectbuy',
      component: ProjectBuy,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/creditor/info',
      name: 'creditorinfo',
      component: CreditorInfo,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/news/info',
      name: 'newsinfo',
      component: NewsInfo,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/success',
      name: 'success',
      component: Success,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
      meta:{
        requireLogin:false
      },
    },
    // {
    //   path: '/agreement',
    //   name: 'agreement',
    //   component: Agreement,
    //   meta:{
    //     requireLogin:false
    //   },
    // },
    {
      path: '/center',
      name: 'center',
      component: Center,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/account',
      name: 'account',
      component: Account,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/account/safe',
      name: 'safe',
      component: Safe,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/account/card',
      name: 'card',
      component: Card,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/account/card/change',
      name: 'cardchange',
      component: CardChange,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/account/password',
      name: 'password',
      component: Password,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/record',
      name: 'record',
      component: Record,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/record/investment',
      name: 'investment',
      component: Investment,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/gain',
      name: 'gain',
      component: Gain,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/assignlist',
      name: 'assignlist',
      component: AssignList,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/assignlist/info',
      name: 'assigninfo',
      component: AssignInfo,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/packet',
      name: 'packet',
      component: Packet,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/invite',
      name: 'invite',
      component: Invite,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/center/invite/list',
      name: 'invitelist',
      component: InviteList,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/help',
      name: 'help',
      component: Help,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/center/help/common',
      name: 'helpcommon',
      component: CommonQuestion,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/center/contact',
      name: 'contact',
      component: Contact,
      meta:{
        requireLogin:false
      },
    },
    {
      path: '/center/recharge',
      name: 'recharge',
      component: Recharge,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/recharge/list',
      name: 'rechargelist',
      component: RechargeList,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/withdrawals',
      name: 'withdrawals',
      component: Withdrawals,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/withdrawals/list',
      name: 'withdrawalslist',
      component: WithdrawalsList,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/message',
      name: 'message',
      component: Message,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/message/platform',
      name: 'platform',
      component: Platform,
      meta:{
        requireLogin:true
      },
    },
    {
      path: '/center/message/personal',
      name: 'personal',
      component: Personal,
      meta:{
        requireLogin:true
      },
    },

    { path: '/help', redirect: '/center/help'},
    { path: '/contact', redirect: '/center/contact' },
    { path: '/login/register', redirect: '/register' },
    {path:'/center/safe',redirect: '/center/account/safe'},
    {path:'/center/card',redirect: '/center/account/card'},
    {path:'/center/investment',redirect: '/center/record/investment'}
  ]
})
