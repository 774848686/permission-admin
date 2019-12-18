import { constantRouterMap } from '@/router';
import {optionsRouterMap} from '@/router/optroute'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route) {
    return roles.some(role => route.id===role)
  } else {
    return true
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 所有的路由表
 * @param roles 权限id的集合
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    originRouter:[],
    currentRouter:[]
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_ROUTERS_ORIGIN:(state,res)=>{
      const {origin,roles} = res;
      let accessedRouters = filterAsyncRouter(origin,roles)
      state.originRouter = accessedRouters;
    },
    SET_ROUTERS_CURRENT:(state,router)=>{
      state.currentRouter = router;
    }
  },
  actions: {
    GenerateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        optionsRouterMap().then(res => {
          let accessedRouters = []
          accessedRouters = filterAsyncRouter(res.routers,roles);
          commit('SET_ROUTERS', accessedRouters)
          commit('SET_ROUTERS_ORIGIN',{origin:res.origin,roles})
          resolve()
        })
      })
    },
    CurrentRouter({ commit,state }, currentBar){
      const currentNavRouter = state.originRouter.filter(item=>item.path===currentBar);
      commit('SET_ROUTERS_CURRENT', currentNavRouter[0]['children'])
    }
  }
}

export default permission
