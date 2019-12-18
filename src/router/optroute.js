/**
 * 管理路由
 */
/* Layout */
import Layout from '../views/layout/Layout'
import { response } from './response'
const routers = response();

/**
 * 路由进行Map
 */
const routerMap = list => {
return list.map(item=>{
    return item.children;
  });
}
export const optionsRouterMap = () => {
  return new Promise(reslove => {
    routers().then(res => {
      const router = routerMap(res).flat();
      const redirect = `${res[0].path}`;
      reslove({
        routers:[
        {
          id:0,
          path:'/',
          component: Layout,
          redirect
        },
        ...router],
        origin:res
      })
    })
  })
}