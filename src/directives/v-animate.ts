import type { DirectiveBinding } from 'vue'
import { gsap } from 'gsap'

// Define the animation functions
const animations: { [key: string]: (element: HTMLElement, duration: number) => void } = {
  fadeIn: (el, duration) => gsap.from(el, { opacity: 0, duration }),
  fadeOut: (el, duration) => gsap.to(el, { opacity: 0, duration }),
  slideInFromTop: (el, duration) => gsap.from(el, { y: -50, opacity: 0, duration }),
  slideInFromBottom: (el, duration) => gsap.from(el, { y: 50, opacity: 0, duration }),
  slideInFromLeft: (el, duration) => gsap.from(el, { x: -50, opacity: 0, duration }),
  slideInFromRight: (el, duration) => gsap.from(el, { x: 50, opacity: 0, duration }),
  slideOutToTop: (el, duration) => gsap.to(el, { y: -50, opacity: 0, duration }),
  slideOutToBottom: (el, duration) => gsap.to(el, { y: 50, opacity: 0, duration }),
  slideOutToLeft: (el, duration) => gsap.to(el, { x: -50, opacity: 0, duration }),
  slideOutToRight: (el, duration) => gsap.to(el, { x: 50, opacity: 0, duration }),
  scaleUp: (el, duration) => gsap.from(el, { scale: 0, duration }),
  scaleDown: (el, duration) => gsap.to(el, { scale: 0, duration }),
  rotateIn: (el, duration) => gsap.from(el, { rotation: -180, opacity: 0, duration }),
  rotateOut: (el, duration) => gsap.to(el, { rotation: 180, opacity: 0, duration }),
  bounceIn: (el, duration) =>
    gsap.from(el, { scale: 0.5, opacity: 0, ease: 'bounce.out', duration }),
  bounceOut: (el, duration) => gsap.to(el, { scale: 0.5, opacity: 0, ease: 'bounce.in', duration }),
  zoomIn: (el, duration) => gsap.from(el, { scale: 0.5, opacity: 0, duration }),
  zoomOut: (el, duration) => gsap.to(el, { scale: 0.5, opacity: 0, duration }),
  flipInX: (el, duration) => gsap.from(el, { rotationX: -90, opacity: 0, duration }),
  flipInY: (el, duration) => gsap.from(el, { rotationY: -90, opacity: 0, duration }),
  flipOutX: (el, duration) => gsap.to(el, { rotationX: 90, opacity: 0, duration }),
  flipOutY: (el, duration) => gsap.to(el, { rotationY: 90, opacity: 0, duration }),
  flash: (el, duration) =>
    gsap.to(el, { opacity: 0, repeat: 3, yoyo: true, duration: duration / 3 }),
  pulse: (el, duration) =>
    gsap.to(el, { scale: 1.1, repeat: 3, yoyo: true, duration: duration / 3 }),
  swing: (el, duration) =>
    gsap.to(el, { x: 20, rotation: 15, repeat: 3, yoyo: true, duration: duration / 3 }),
  tada: (el, duration) =>
    gsap.to(el, { scale: 1.1, rotation: 15, repeat: 3, yoyo: true, duration: duration / 3 }),
  wobble: (el, duration) =>
    gsap.to(el, { x: 20, rotation: -5, repeat: 5, yoyo: true, duration: duration / 5 }),
  jello: (el, duration) =>
    gsap.to(el, { x: 20, skewX: 10, repeat: 5, yoyo: true, duration: duration / 5 }),
  rubberBand: (el, duration) =>
    gsap.to(el, { scaleX: 1.25, scaleY: 0.75, repeat: 3, yoyo: true, duration: duration / 3 }),
  shakeX: (el, duration) => gsap.to(el, { x: 20, repeat: 5, yoyo: true, duration: duration / 5 }),
  shakeY: (el, duration) => gsap.to(el, { y: 20, repeat: 5, yoyo: true, duration: duration / 5 })
}

const vAnimate = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value, arg } = binding
    const duration = typeof value === 'number' ? value : 1
    if (arg && animations[arg]) {
      animations[arg](el, duration)
    }
  }
}

export default vAnimate

// <h1 v-animate:fadeIn="2">fadeIn Animation</h1>
// <h1 v-animate:fadeOut="2">fadeOut Animation</h1>
// <h1 v-animate:slideInFromTop="2">slideInFromTop Animation</h1>
// <h1 v-animate:slideInFromBottom="2">slideInFromBottom Animation</h1>
// <h1 v-animate:slideInFromLeft="2">slideInFromLeft Animation</h1>
// <h1 v-animate:slideInFromRight="2">slideInFromRight Animation</h1>
// <h1 v-animate:slideOutToTop="2">slideOutToTop Animation</h1>
// <h1 v-animate:slideOutToBottom="2">slideOutToBottom Animation</h1>
// <h1 v-animate:slideOutToLeft="2">slideOutToLeft Animation</h1>
// <h1 v-animate:slideOutToRight="2">slideOutToRight Animation</h1>
// <h1 v-animate:scaleUp="2">scaleUp Animation</h1>
// <h1 v-animate:scaleDown="2">scaleDown Animation</h1>
// <h1 v-animate:rotateIn="2">rotateIn Animation</h1>
// <h1 v-animate:rotateOut="2">rotateOut Animation</h1>
// <h1 v-animate:bounceIn="2">bounceIn Animation</h1>
// <h1 v-animate:bounceOut="2">bounceOut Animation</h1>
// <h1 v-animate:zoomIn="2">zoomIn Animation</h1>
// <h1 v-animate:zoomOut="2">zoomOut Animation</h1>
// <h1 v-animate:flipInX="2">flipInX Animation</h1>
// <h1 v-animate:flipInY="2">flipInY Animation</h1>
// <h1 v-animate:flipOutX="2">flipOutX Animation</h1>
// <h1 v-animate:flipOutY="2">flipOutY Animation</h1>
// <h1 v-animate:flash="2">flash Animation</h1>
// <h1 v-animate:pulse="2">pulse Animation</h1>
// <h1 v-animate:swing="2">swing Animation</h1>
// <h1 v-animate:tada="2">tada Animation</h1>
// <h1 v-animate:wobble="2">wobble Animation</h1>
// <h1 v-animate:jello="2">jello Animation</h1>
// <h1 v-animate:rubberBand="2">rubberBand Animation</h1>
// <h1 v-animate:shakeX="2">shakeX Animation</h1>
// <h1 v-animate:shakeY="2">shakeY Animation</h1>
