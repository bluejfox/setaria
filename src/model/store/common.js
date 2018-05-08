import * as types from './types'
import auth from './auth'

const name = types.MODULE_SETARIA_STORE

// initial state
const state = {
  _setaria_direction: '',
  _setaria_loading: 0,
  _setaria_routeHistory: {
    currentIndex: null,
    history: []
  }
}

// getters
const getters = {
  [types._GET_ROUTE_HISTORY]: state => state._setaria_routeHistory,
  [types._GET_ROUTE_CURRENT_INDEX]: state => state._setaria_routeHistory.currentIndex,
  [types._GET_IS_LOADING]: state => state._setaria_loading !== 0,
  [types._GET_LOADING_COUNT]: state => state._setaria_loading,
  [types._GET_DIRECTION]: state => state._setaria_direction
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types._SET_DIRECTION] (stateObj, val) {
    const s = stateObj
    s._setaria_direction = val
  },
  [types._ADD_LOADING_COUNT] (stateObj) {
    const s = stateObj
    s._setaria_loading += 1
  },
  [types._SUB_LOADING_COUNT] (stateObj) {
    const s = stateObj
    if (s._setaria_loading > 0) {
      s._setaria_loading -= 1
    }
  },
  [types._UPDATE_DIRECTION] (stateObj, { current, next }) {
    let direction = stateObj._setaria_direction
    const routeHistory = stateObj._setaria_routeHistory
    if (direction !== 'forward' && direction !== 'back') {
      if (routeHistory.history.length > 0) {
        // 当前游标处于最末尾
        if (routeHistory.currentIndex === routeHistory.history.length - 1) {
          direction = 'back'
        } else {
          let path = null
          // 判断目标画面是否为前画面
          if (routeHistory.currentIndex !== 0) {
            path = routeHistory.history[routeHistory.currentIndex - 1]
            if (path === next) {
              direction = 'back'
            }
          }
          // 判断目标画面是否为次画面
          if (direction === '') {
            path = routeHistory.history[routeHistory.currentIndex + 1]
            if (path === next) {
              direction = 'forward'
            }
          }
        }
      } else {
        direction = 'forward'
      }
      if (direction !== 'forward' && direction !== 'back') {
        direction = 'forward'
      }
      // 保存跳转方向
      stateObj._setaria_direction = direction
    }
  },
  [types._UPDATE_ROUTE_HISTORY] (stateObj, { current, next }) {
    const direction = stateObj._setaria_direction
    const routeHistory = stateObj._setaria_routeHistory
    // 更新浏览历史
    if (direction === 'back') {
      if (routeHistory.currentIndex === 0) {
        routeHistory.currentIndex = null
      } else {
        routeHistory.history[routeHistory.currentIndex] = current
        routeHistory.currentIndex -= 1
      }
    } else if (direction === 'forward') {
      // if (!isExistForwardPage) {
      //   if (routeHistory.currentIndex < history.length - 1) {
      //     let index = history.length - 1
      //     for (index; index > routeHistory.currentIndex; index -= 1) {
      //       history.splice(index, 1)
      //     }
      //   }
      //   history.push(currentPageFullPath)
      // } else {
      // }
      if (routeHistory.currentIndex === null) {
        routeHistory.currentIndex = 0
      } else {
        // 如果未处于队列末尾,则删除当前游标后的数据
        if (routeHistory.currentIndex < routeHistory.history.length - 1) {
          const history = routeHistory.history.splice(0, routeHistory.currentIndex + 1)
          routeHistory.history = history
        }
        routeHistory.currentIndex += 1
      }
      routeHistory.history.push(next)
    }
  }
}

const modules = {
  [auth.name]: auth
}

export default {
  namespaced: true,
  name,
  state,
  getters,
  actions,
  mutations,
  modules
}
