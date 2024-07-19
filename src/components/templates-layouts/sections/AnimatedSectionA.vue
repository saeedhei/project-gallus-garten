<template>
  <div class="about-section">
    <!-- <h2>{{ title }}</h2> -->
    <!-- Your content here -->
    <!-- <transition name="fade">
      <div v-if="showFace" class="face" :style="{ opacity: faceOpacity }">
        <slot />
      </div>
    </transition> -->
  </div>
</template>

<!-- <script>
export default {
  props: {
    title: String
  },
  data() {
    return {
      showFace: false,
      faceOpacity: 0,
      lastScrollTop: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const st = window.pageYOffset || document.documentElement.scrollTop
      if (st > this.lastScrollTop) {
        // Downscroll code
        const rect = this.$el.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0
        if (isVisible) {
          this.showFace = true
          if (this.faceOpacity < 1) {
            this.faceOpacity += 0.1 // Adjust increment value for speed
          }
        }
      } else {
        // Upscroll code
        if (this.faceOpacity > 0) {
          // this.faceOpacity -= 0.1 // Adjust decrement value for speed
          this.faceOpacity -= 0.3 // Adjust decrement value for speed
        }
        if (this.faceOpacity <= 0) {
          this.showFace = false
        }
      }
      this.lastScrollTop = st <= 0 ? 0 : st
    }
  }
}
</script> -->

<style scoped>
/* Your styles here */
.face {
  /* width: 100px;
    height: 100px; */
  /* background-color: yellow; */
}

.fade-enter-active,
.fade-leave-active {
  /* transition: opacity 1s; */
  transition: opacity 3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
