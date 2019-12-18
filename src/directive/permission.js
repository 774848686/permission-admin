  
  import Vue from 'vue';
  import store from '@/store';
  /**权限指令**/
  const hasPermision = Vue.directive('permission', {
    inserted: function (el, binding, vnode) {
        // 获取页面按钮权限
        if (!store.getters.roles.includes(binding.value)) {
            el.parentNode.removeChild(el);
        }
    }
});
export default hasPermision;