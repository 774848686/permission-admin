<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="" text-color="rgba(0, 0, 0, 0.65)" active-text-color="#409EFF">
      <sidebar-item :routes="currentRouter"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'currentRouter'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
