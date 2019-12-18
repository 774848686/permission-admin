const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)){
        state.visitedViews = state.visitedViews.map(item=>{
          if(item.path === view.path){
            item = {
              name: view.name,
              path: view.path,
              query:view.query,
              title: (view.query.tagName ? view.query.tagName : view.meta.title) || 'no-name',
            }
          }
          return item;
        })
        return;
      };
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        query:view.query,
        title: (view.query.tagName ? view.query.tagName : view.meta.title) || 'no-name',
      })
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    REMOVE_ALL_VIEWS:(state)=>{
      state.visitedViews = [];
      state.cachedViews = [];
    }
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    removeVisitedViews:({ commit })=>{
      return new Promise((resolve) => {
        commit('REMOVE_ALL_VIEWS')
        resolve()
      })
    }
  }
}

export default tagsView
