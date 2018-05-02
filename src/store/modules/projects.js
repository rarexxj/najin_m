import * as types from '../mutation-types'
import plugin from "../../server";
import {
  Indicator
} from 'mint-ui';
const state = {
  loadProjects: false, // 是否加载过投资项目
  loadCreditor: false, //是否加载过债权转让
  //项目状态
  projectsStatus: [{
    name: '全部',
    id: '-1'
  }, {
    name: '招标中',
    id: '1'
  }, {
    name: '还款中',
    id: '2'
  }, {
    name: '已还清',
    id: '3'
  }],
  chooseProjectsStatus: 0, //选中的状态
  projectsType: [], //产品分类
  chooseProjectsType: 0, //选中的分类
  projectsRate: [], //年华利率
  chooseProjectsRate: 0, //选中的年华利率
  projectsCycle: [], //投资期限
  chooseProjectsCycle: 0, //选中的投资期限
  projectsSort: [{
    name: '默认理财',
    id: '-1'
  }, {
    name: '年化利率',
    id: 'rate'
  }, {
    name: '投资期限',
    id: 'cycle'
  }, {
    name: '投标进度',
    id: 'percent'
  }],
  chooseProjectsSort: 0, //选中的排序
  projectsPage: 1, //投资项目页数
  projectsSize: 10, //投资项目每页条数
  projectsList: [], //投资项目列表
  projectTotal: 0, //投资项目总条数
  projectChoose: 0, //选中投资项目/债权转让
  creditorClass: [{
    name: '全部',
    id: '0'
  }, {
    name: '转让中',
    id: '1'
  }, {
    name: '已转让',
    id: '2'
  }],
  chooseCreditorClass: '0',
  creditorPage: 1, //债权转让页数
  creditorSize: 10, //债权转让每页条数
  creditorList: [], //债权转让列表
  creditorTotal: 0, //债权转让总条数
  showScreen: false, //是否显示筛选
}

const mutations = {
  [types.LOAD_PROJECTS](state) {
    if (!state.loadProjects) {
      state.loadProjects = true
    }
  },
  [types.LOAD_CREDITOR](state) {
    if (!state.loadCreditor) {
      state.loadCreditor = true
    }
  },
  [types.SET_PROJECTS_TYPE](state, data) {
    state.projectsType = data
  },
  [types.SET_PROJECTS_RATE](state, data) {
    state.projectsRate = data
  },
  [types.SET_PROJECTS_CYCLE](state, data) {
    state.projectsCycle = data
  },
  [types.CHOOSE_PROJECTS_STATUS](state, data) {
    state.chooseProjectsStatus = data
  },
  [types.CHOOSE_PROJECTS_TYPE](state, data) {
    state.chooseProjectsType = data
  },
  [types.CHOOSE_PROJECTS_RATE](state, data) {
    state.chooseProjectsRate = data
  },
  [types.CHOOSE_PROJECTS_CYCLE](state, data) {
    state.chooseProjectsCycle = data
  },
  [types.CHOOSE_PROJECTS_SORT](state, data) {
    state.chooseProjectsSort = data
  },
  [types.SET_PROJECTS_LIST](state, data) {
    if (state.projectsPage == 1) { //页码为1时，清空列表，不为1，列表累加
      state.projectsList = data
    } else {
      state.projectsList = state.projectsList.concat(data)
    }

  },
  [types.SET_PROJECTS_TOTAL](state, data) {
    state.projectTotal = data.total
  },
  [types.CHANGE_PROJECTS_PAGE](state, data) {
    if (data) {
      state.projectsPage = data
    } else {
      state.projectsPage++
    }
  },
  [types.TAB_PROJECTS](state, data) {
    state.projectChoose = data;
  },
  [types.CHOOSE_CREDITOR_CLASS](state, data) {
    state.chooseCreditorClass = data;
  },
  [types.SET_CREDITOR_LIST](state, data) {
    if (state.creditorPage == 1) { //页码为1时，清空列表，不为1，列表累加
      state.creditorList = data
    } else {
      state.creditorList = state.creditorList.concat(data)
    }
  },
  [types.SET_CREDITOR_TOTAL](state, data) {
    state.creditorTotal = data.total
  },
  [types.CHANGE_CREDITOR_PAGE](state, data) {
    if (data) {
      state.creditorPage = data
    } else {
      state.creditorPage++
    }
  },
  [types.SET_PROJECTS_SCREEN](state, data) {
    state.showScreen = data
  }
}

const actions = {
  //获取投资项目列表
  getProjectsList({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      Indicator.open();
      plugin.axios.get('/project/list', {
        params: {
          type: state.projectsType[state.chooseProjectsType].id,
          page: state.projectsPage,
          size: state.projectsSize,
          status: state.projectsStatus[state.chooseProjectsStatus].id,
          rate: state.projectsRate[state.chooseProjectsRate].id,
          cycle: state.projectsCycle[state.chooseProjectsCycle].id,
          sort: state.projectsSort[state.chooseProjectsSort].id,
        }
      }).then(function (res) {
        commit('SET_PROJECTS_LIST', res.data.returnData.list);
        commit('SET_PROJECTS_TOTAL', {
          total: res.data.returnData.total ? Number(res.data.returnData.total) : 0
        })
        Indicator.close();
        resolve();
      }).catch(function () {
        Indicator.close()
      })
    })
  },
  //获取投资项目所有筛选条件
  getProjectsScreen({
    commit,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      Indicator.open();
      plugin.axios.get('/common/projectFilter?type=all')
        .then(function (res) {
          var data = res.data.returnData.list;
          data.type.unshift({
            id: '-1',
            name: '不限'
          });
          data.rate.unshift({
            id: '-1',
            name: '不限'
          });
          data.cycle.unshift({
            id: '-1',
            name: '不限'
          });
          commit('SET_PROJECTS_TYPE', data.type);
          commit('SET_PROJECTS_RATE', data.rate);
          commit('SET_PROJECTS_CYCLE', data.cycle);
          // 加载完筛选条件后，请求投资项目列表
          dispatch('getProjectsList')
            .then(function () {
              resolve()
            })
        })
    })
  },
  //投资项目排序
  changeProjectsSort({
    commit,
    dispatch
  }, data) {
    commit('CHANGE_PROJECTS_PAGE', 1) // 页码重置为1
    commit('CHOOSE_PROJECTS_SORT', data) //修改选中的排序
    commit('SET_PROJECTS_LIST', []) // 清空投资项目列表（防止mounted方法不会被调用）
    dispatch('getProjectsList') //请求投资项目列表
  },
  //切换投资项目的项目状态
  changeProjectsStatus({
    commit,
    dispatch
  }, data) {
    commit('CHANGE_PROJECTS_PAGE', 1) // 页码重置为1
    commit('SET_PROJECTS_LIST', []) // 清空投资项目列表（防止mounted方法不会被调用）
    commit('CHOOSE_PROJECTS_STATUS', data) //切换项目状态
    dispatch('getProjectsList') //请求投资项目列表
  },
  //切换投资项目的产品分类
  changeProjectsType({
    commit,
    dispatch
  }, data) {
    commit('CHANGE_PROJECTS_PAGE', 1) // 页码重置为1
    commit('SET_PROJECTS_LIST', []) // 清空投资项目列表（防止mounted方法不会被调用）
    commit('CHOOSE_PROJECTS_TYPE', data) //切换产品分类
    dispatch('getProjectsList') //请求投资项目列表
  },
  //切换投资项目的年利率
  changeProjectsRate({
    commit,
    dispatch
  }, data) {
    commit('CHANGE_PROJECTS_PAGE', 1) // 页码重置为1
    commit('SET_PROJECTS_LIST', []) // 清空投资项目列表（防止mounted方法不会被调用）
    commit('CHOOSE_PROJECTS_RATE', data) //切换年利率
    dispatch('getProjectsList') //请求投资项目列表
  },
  //切换投资项目的年利率
  changeProjectsCycle({
    commit,
    dispatch
  }, data) {
    commit('CHANGE_PROJECTS_PAGE', 1) // 页码重置为1
    commit('SET_PROJECTS_LIST', []) // 清空投资项目列表（防止mounted方法不会被调用）
    commit('CHOOSE_PROJECTS_CYCLE', data) //切换年利率
    dispatch('getProjectsList') //请求投资项目列表
  },

  //获取债权列表
  getCreditorList({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      Indicator.open();
      plugin.axios.get('/transfer/list', {
        params: {
          page: state.creditorPage,
          size: state.creditorSize,
          status: state.creditorClass[state.chooseCreditorClass].id,
        }
      }).then(function (res) {
        commit('SET_CREDITOR_LIST', res.data.returnData.list);
        commit('SET_CREDITOR_TOTAL', {
          total: res.data.returnData.total ? Number(res.data.returnData.total) : 0
        })
        Indicator.close();
        resolve()
      }).catch(function () {
        Indicator.close()
      })
    })

  },

  //切换债权转让筛选
  changeCreditorClass({
    commit,
    dispatch
  }, data) {
    commit('CHANGE_CREDITOR_PAGE', 1) // 页码重置为1
    commit('SET_CREDITOR_LIST', []) // 清空债权转让列表（防止mounted方法不会被调用）
    commit('CHOOSE_CREDITOR_CLASS', data) //切换年利率
    dispatch('getCreditorList') //请求投资项目列表
  }

}
export default {
  state,
  actions,
  mutations,
  // getters
}
