<template>
  <div class="scene" ref="scene"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'SnowComponent',
  setup() {
    const scene = ref<HTMLDivElement | null>(null)
    const snowflakeCount = 50

    const createSnowflake = (): HTMLElement => {
      const snowflake = document.createElement('div')
      snowflake.classList.add('snowflake', 'snowflake--small', 'snowflake--air')

      // Add rays
      for (let i = 0; i < 3; i++) {
        const ray = document.createElement('div')
        ray.classList.add('snowflake__ray')

        // Add small branches to each ray
        const before = document.createElement('div')
        const after = document.createElement('div')
        before.classList.add('ray-branch')
        after.classList.add('ray-branch')

        ray.appendChild(before)
        ray.appendChild(after)
        snowflake.appendChild(ray)
      }

      // Add center
      const center = document.createElement('div')
      center.classList.add('snowflake__center')
      snowflake.appendChild(center)

      // Randomize position and animation delay
      snowflake.style.left = Math.random() * 100 + '%'
      snowflake.style.animationDelay = Math.random() * 10 + 's'
      snowflake.style.animationDuration = 8 + Math.random() * 5 + 's' // Random duration for variety

      return snowflake
    }

    onMounted(() => {
      if (scene.value) {
        for (let i = 0; i < snowflakeCount; i++) {
          const snowflake = createSnowflake()
          scene.value.appendChild(snowflake)
        }
      }
    })

    return { scene }
  },
})
</script>

<style scoped>
/* Variables */
:root {
  --snow: #fff;
  --brown: #754f44;
  --red: #f25f5c;
  --orange: #ff6f59;
  --green: #254441;
  --blue: #0b132b;
}

.scene {
  position: relative;
  height: 100vh;
  background: var(--blue)
    radial-gradient(
      circle farthest-side at 50% 100%,
      desaturate(lighten(var(--blue), 45%), 30%),
      var(--blue)
    )
    no-repeat;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 0 5px var(--snow));
}

.snowflake--small {
  transform: scale(0.3);
}

.snowflake--air {
  top: -60px;
  animation: fall 10s ease-in-out infinite;
}

.snowflake__ray {
  position: absolute;
  top: calc(50% - 2.5%);
  width: 100%;
  height: 5%;
  background-color: var(--snow);
  border-radius: 50%;
}

.snowflake__ray:first-child {
  transform: rotate(90deg);
}

.snowflake__ray:nth-child(2) {
  transform: rotate(150deg);
}

.snowflake__ray:nth-child(3) {
  transform: rotate(210deg);
}

.snowflake__ray::before,
.snowflake__ray::after {
  content: '';
  position: absolute;
  top: 45%;
  width: 20%;
  height: 400%;
  border-left: 3px solid var(--snow);
  border-top: 3px solid var(--snow);
  border-radius: 25%;
  filter: drop-shadow(10px 10px 0 var(--snow));
}

.snowflake__ray::before {
  left: 20%;
  transform-origin: top left;
  transform: rotate(135deg);
}

.snowflake__ray::after {
  right: 0;
  transform-origin: top left;
  transform: rotate(315deg);
}

.snowflake__center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25%;
  height: 25%;
  background-color: var(--snow);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  clip-path: polygon(
    0% 33%,
    50% 0%,
    100% 33%,
    100% 66%,
    50% 100%,
    0% 66%,
    10% 66%,
    50% 90%,
    90% 66%,
    90% 33%,
    50% 10%,
    10% 33%,
    10% 66%,
    0% 66%,
    0% 33%
  );
}

@keyframes fall {
  0% {
    transform: translate(0, -100%) scale(0.3);
  }
  20% {
    transform: translate(100px, 50px) scale(0.3);
  }
  40% {
    transform: translate(-100px, 200px) scale(0.3);
  }
  60% {
    opacity: 1;
    transform: translate(100px, 350px) scale(0.3);
  }
  80% {
    transform: translate(-100px, 550px) scale(0.3);
  }
  100% {
    opacity: 0;
    transform: translate(100px, 700px) scale(0.3);
  }
}
</style>
