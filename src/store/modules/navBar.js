const navBar = {
  state: {
      currentNavBar:null,
      isToggle:false
  },
  mutations: {
    TOGGLE_NAVBAR:(state,path) => {
      state.currentNavBar = path;
      state.isToggle = !state.isToggle;
    }
  },
  actions: {
    ToggleNavBar: ({ commit,state },path) => {
      return new Promise(resolve=>{
        commit('TOGGLE_NAVBAR',path);
        resolve(path);
      })
    }
  }
}

export default navBar;
