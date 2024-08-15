<template>
  <div class="text-container">
    <span class="text"><slot></slot>{{ displayedText }}</span>
    <span class="cursor"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'

// Define types for the props
type Props = {
  sentences: string[]
}

// Define props with type safety
const props = defineProps<Props>()

const currentSentenceIndex = ref<number>(0)
const displayedText = ref<string>('')
const typingSpeed = 120
const erasingSpeed = 60


function typeWriter(text: string) {
  let i = 0
  displayedText.value = ''
  const typingInterval = setInterval(() => {
    if (i < text.length) {
      displayedText.value += text[i]
      i++
    } else {
      clearInterval(typingInterval)
      eraseAndTypeNext()
    }
  }, typingSpeed)
}

function eraseAndTypeNext() {
  let i = displayedText.value.length
  const erasingInterval = setInterval(() => {
    if (i > 0) {
      displayedText.value = displayedText.value.substring(0, i - 1)
      i--
    } else {
      clearInterval(erasingInterval)
      currentSentenceIndex.value = (currentSentenceIndex.value + 1) % props.sentences.length
      typeWriter(props.sentences[currentSentenceIndex.value])
    }
  }, erasingSpeed)
}

onMounted(() => {
  if (props.sentences.length > 0) {
    typeWriter(props.sentences[currentSentenceIndex.value])
  }
})
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Anonymous+Pro);
.text-container {
  /* padding: 2em; */
  position: relative; /* Add relative positioning to contain the cursor */
  color: rgb(255, 255, 255);
  font-family: 'Anonymous Pro', monospace;
  /* background-color: rgb(25, 25, 25); */
}

.text {
  display: inline;
}

.cursor {
  position: absolute;
 /* right: 0;  Adjust if necessary */
  width: 2px;
  height: 1.2em; /* Adjust based on the font size */
  background-color: rgba(255, 255, 255, 0.75);
  animation: blink 1s step-start infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
