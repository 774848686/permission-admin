import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
    Message
} from 'element-ui'
import {
    getToken
} from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        if (to.path === '/login') {
            next({
                path: '/'
            })
            NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        } else {
            if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetInfo').then(response => { // 拉取user_info
                    store.dispatch('GenerateRoutes', response).then(() => { // 生成可访问的路由表
                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        store.dispatch('ToggleNavBar', store.getters.originRouter[0].path).then(res => {
                            store.dispatch('CurrentRouter', res); // 初始化对应menu
                        }); //初始化一下navbar 的当前path
                        next({
                            ...to,
                            replace: true
                        }) // hack方法 确保addRoutes已完成 ,replace: true so the navigation will not leave a history record
                    }).catch(() => {

                    })
                }).catch(() => {
                    store.dispatch('LogOut')
                    next({
                        path: '/login'
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})
router.afterEach(() => {
    NProgress.done() // 结束Progress
})
