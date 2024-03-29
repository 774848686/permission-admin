import { postLogin, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken,setuserName } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        postLogin(username, userInfo.password).then(response => {
          const data = response.returnValue;
          setToken(data.token);
          setuserName(data.realName || '地球人');
          commit('SET_TOKEN', data.token);
          commit('SET_NAME', data.realName+"");
          resolve();
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.roles)
          resolve(data.roles)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        removeToken()
    }
  }
}

export default user
