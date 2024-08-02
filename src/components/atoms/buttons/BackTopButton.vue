<template>
<div class="progress-wrap" ref="progressWrap" @click="scrollToTop">
  <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
    <path ref="progressPath" d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
  </svg>
  <span class="arrow"><svg id="i-chevron-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
    <path d="M30 20 L16 8 2 20" />
</svg></span>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const progressPath = ref<SVGPathElement | null>(null);
const progressWrap = ref<HTMLDivElement | null>(null);

const updateProgress = () => {
  if (progressPath.value) {
    const pathLength = progressPath.value.getTotalLength();
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength / height);
    progressPath.value.style.strokeDashoffset = `${progress}`;
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  if (progressPath.value) {
    const pathLength = progressPath.value.getTotalLength();
    progressPath.value.style.transition = progressPath.value.style.webkitTransition = 'none';
    progressPath.value.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.value.style.strokeDashoffset = `${pathLength}`;
    progressPath.value.getBoundingClientRect();
    progressPath.value.style.transition = progressPath.value.style.webkitTransition = 'stroke-dashoffset 10ms linear';

    updateProgress();
    window.addEventListener('scroll', updateProgress);

    const offset = 300;

    window.addEventListener('scroll', () => {
      if (progressWrap.value) {
        if (window.scrollY > offset) {
          progressWrap.value.classList.add('active-progress');
        } else {
          progressWrap.value.classList.remove('active-progress');
        }
      }
    });
  }
});
</script>

<style scoped>
body{
	background-color: white;
}

.blok:nth-of-type(odd) {
background-color:white;
}
    
.blok:nth-of-type(even) {
background-color:black;
}

@keyframes border-transform{
    0%,100% { border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%; } 
	14% { border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%; } 
	28% { border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%; } 
	42% { border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%; } 
	56% { border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%; } 
	70% { border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%; } 
	84% { border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%; } 
}

/* #Progress
================================================== */

.progress-wrap {
	position: fixed;
	right: 30px;
	bottom: 30px;
	height: 46px;
	width: 46px;
	cursor: pointer;
	display: block;
	border-radius: 50px;
	box-shadow: inset  0 0 0 2px rgba(80, 158, 73,0.2);
	z-index: 10000;
	opacity: 0;
	visibility: hidden;
	transform: translateY(15px);
	-webkit-transition: all 200ms linear;
    transition: all 200ms linear;
    background-color: white;
}
.progress-wrap .arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px; /* Adjust the font size as needed */
  color: rgb(80, 158, 73); /* Change the color as needed */
  pointer-events: none; /* Ensure the arrow does not interfere with click events */
}
.progress-wrap.active-progress {
	opacity: 1;
	visibility: visible;
	transform: translateY(0);
}
/* .progress-wrap::after {
	position: absolute;
	font-family: 'unicons';
	content: '\e84b';
	text-align: center;
	line-height: 46px;
	font-size: 24px;
	color: rgba(0, 0, 0, 0.3); 
	left: 0;
	top: 0;
	height: 46px;
	width: 46px;
	cursor: pointer;
	display: block;
	z-index: 1;
	-webkit-transition: all 200ms linear;
    transition: all 200ms linear;
} */
.progress-wrap:hover::after {
	opacity: 0;
}
/* .progress-wrap::before {
	position: absolute;
	font-family: 'unicons';
	content: '\e84b';
	text-align: center;
	line-height: 46px;
	font-size: 24px;
	opacity: 0;
	background: black; 
  background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	left: 0;
	top: 0;
	height: 46px;
	width: 46px;
	cursor: pointer;
	display: block;
	z-index: 2;
	-webkit-transition: all 200ms linear;
    transition: all 200ms linear;
} */
.progress-wrap:hover::before {
	opacity: 1;
}
.progress-wrap svg path { 
	fill: none; 
}
.progress-wrap svg.progress-circle path {
	stroke: rgba(80, 158, 73, 0.8); /* --- Lijn progres kleur --- */
	stroke-width: 4;
	box-sizing:border-box;
	-webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
</style>
<!-- <template>
  <button v-show="isVisible" @click="scrollToTop" class="back-to-top">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      class="arrow-icon"
    >
      <path d="M12 4l-8 8h6v8h4v-8h6z"/>
    </svg>
    <span>Top</span>
    
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isVisible = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  isVisible.value = window.scrollY > 300;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: rgb(80, 158, 73);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style> -->
