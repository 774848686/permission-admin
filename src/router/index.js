import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
    { path: '/login', name: "login", component: _import('login/index'), hidden: true },
    { path: '/404', component: _import('404'), hidden: true },
]
export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})


