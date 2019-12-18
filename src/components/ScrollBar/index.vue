<template>
  <div class="scroll-container" ref="scrollContainer" @mousewheel="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <div class="cms-title">图书订购平台</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
const delta = 15
export default {
  name: 'scrollBar',
  data() {
    return {
      top: 0
    }
  },
  methods: {
    handleScroll(e) {
      e.preventDefault()
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      if (e.wheelDelta > 0) {
        this.top = Math.min(0, this.top + e.wheelDelta)
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top
          } else {
            this.top = Math.max(this.top + e.wheelDelta, $containerHeight - $wrapperHeight - delta)
          }
        } else {
          this.top = 0
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  padding-top:60px;
  box-sizing: 100%;
  .scroll-wrapper {
    position: absolute;
     width: 100%!important;
     .cms-title{
       height:60px;
       line-height: 60px;
       text-align: center;
       color:#ffffff;
       background:$navBg;
       font-size:22px;
     }
  }
}
</style>
