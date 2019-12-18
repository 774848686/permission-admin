const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  originRouter:state=> state.permission.originRouter,
  currentRouter:state=>state.permission.currentRouter,
  currentNavBar:state =>state.navBar.currentNavBar,
  navBarIstoggle:state=>state.navBar.isToggle
}
export default getters
