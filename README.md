
# 权限设计  #
后端返回一系列的id数组,如下 mock
```
// 查询用户信息
export function getInfo(token) {
    return new Promise(resolve => {
        resolve({
            data: {
                roles: [0,1,2,3,4,5,6,7,8,9,10]
            }
        })
    })
}
```
按钮权限
```
<span v-permission='11'>批次管理</span>
```
# 命名规范: #

**views 下的文件夹命名**

1. 以场境名称命名
1. 由名词组成 (car、order、cart)
1. 单词尽量有一个 (good: car order cart) (bad: carInfo carpage)
1. 尽量是名词 (good: car) (bad: greet good)
1. 以小写开头 (good: car) (bad: Car)
1. 由两个以上的单词组成，以"_"分隔

**views 下的 vue 文件命名**

1. 统一用大驼峰命名法，仅入口文件index.vue采用小写
1. 尽量是名词
1. 大写开头，开头的单词就是所属模块名字CarDetail、CarEdit、CarList）


> 常用结尾单词有 (Detail、Edit、List、Info、Report)
> 

>camelCase vs. kebab-case
>HTML 特性是不区分大小写的。所以，当使用的不是字符串模板时，camelCase (驼峰式命名) 的 prop 需要转换为相对应的 kebab-case (短横线分隔式命名)：

**自定义方法命名**

1. 驼峰命名(good: getListData) (bad: get_list_data、getlistData)
1. 动宾短语(good：jumpPage、openCarInfoDialog) (bad：go、nextPage、show、open、login)
1. ajax 方法以 get、post 开头，以 data 结尾(good：getListData、postFormData) (bad：takeData、confirmData、getList、postForm)
1. 事件方法以 on 开头(onTypeChange、onUsernameInput)
1. init、refresh 单词除外
1. 尽量使用常用单词开头 (set、get、open、close、jump)

# vue 方法放置顺序 #
1. components
1. props
1. data
1. created
1. mounted
1. activited
1. update
1. beforeRouteUpdate
1. metods
1. filter
1. computed
1. watch
 

# 关于vuex的注意事项 #
**目录结构**
>Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

>你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

![](https://vuex.vuejs.org/zh-cn/images/vuex.png)

    store
    	modules
			user.js
			...
    	getters.js
   		index.js

----------

    const store = new Vuex.Store({
	    state: {
	   		count:0
	    },
	    mutations: {
		    INCREMENT(state) {
		    	state.count++;
		    },
		    DECREMENT(state) {
		    	state.count--
		    }
	    },
	    actions: {
		    increment(context) {
		    	context.commit("INCREMENT");
		    },
		    decrement({commit}) {
		    	commit("DECREMENT");
		    }
	    }
    })


----------

    const getters = {
      sidebar: state => state.app.sidebar,
	  ...
    }
    export default getters

---------
	