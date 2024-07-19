<template>
  <div class="about-section">
    <h2>About Us</h2>
    <!-- Your content here -->
    <transition name="fade">
      <!-- <div v-if="showFace" class="face" :style="{ opacity: faceOpacity }">
        <p>fddfdfsdfsdfasf dfdfsdfdfdfsdfdfdfsdfdfdfsdfdfdfsdfdfdfsdfdfdfsdfUs</p>
      </div> -->
    </transition>
  </div>
</template>

<!-- <script>
export default {
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
          this.faceOpacity -= 0.1 // Adjust decrement value for speed
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
  background-color: yellow;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>

<!-- <template>
    <div>
      <button @click="isVisible = !isVisible">Toggle</button>
      <transition name="fade">
        <div v-if="isVisible">This element fades in/out.</div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: true,
      };
    },
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  
  .fade-enter-to, .fade-leave-to {
    opacity: 1;
  }
  </style> -->
