<template>
    <div class="tab-wrapper">
    <el-menu
      default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      :background-color="menuStyle.bgColor"
      :text-color="menuStyle.textColor"
      :active-text-color="menuStyle.actTextColor"
    >
      <el-menu-item
        :index="index+1+''"
        v-for="(item,index) in menuData"
        :key="index"
        @click="navbarClick(item)"
      >
        {{item.name}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { getMenuCookie } from "@/utils/auth";
import { mapGetters } from 'vuex';
export default {
  name: "Header",
  data() {
    return {
      menuData: [],
      menuStyle: {
        bgColor: "#12384e",
          textColor: "#fff",
          actTextColor: "#ffd04b"
      }
    };
  },
  computed: {
    ...mapGetters([
      'originRouter',
      'currentNavBar'
    ])
  },
  created(){
    this.menuData = this.originRouter.map(item => {
      return {
        name: item.title,
        path: `${item.path}`
      };
    });
  },
  methods: {
    navbarClick(data){
       this.$store.dispatch("ToggleNavBar", data.path).then(res=>{
         this.$store.dispatch('CurrentRouter',res);
         this.$store.dispatch('removeVisitedViews').then(res=>{
            this.$router.push({
              path:data.path
          })
         })
       });
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tab-wrapper{
     position: fixed!important;
  width: 100%;
  top: 0;
  z-index: 99;
  height: 60px;
  line-height: 50px;
}
</style>

