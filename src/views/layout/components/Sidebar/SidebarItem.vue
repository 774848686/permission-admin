<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <el-submenu
        v-if="!item.hidden&&item.children"
        :index="item.name||item.path"
        :key="item.name"
      >
        <template slot="title">
          <router-link :to="item.path">
            <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
          </router-link>
        </template>
        <template v-if="!child.hidden" v-for="child in item.children">
          <sidebar-item
            class="nest-menu"
            v-if="child.children&&child.children.length>0"
            :routes="[child]"
            :key="child.path"
          ></sidebar-item>
          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";

export default {
  name: "SidebarItem",
  data() {
    return {};
  },
  props: {
    routes: {
      type: Array
    }
  },
  created() {
  },
  methods: {
    
  }
};
</script>
