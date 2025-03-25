<template>
  <div class="w-[80vw] mt-8 flex flex-col gap-2 m-2">
    <div
      ref="scrollContainer"
      class="scrollable-container flex items-center gap-2 overflow-x-auto min-h-14 bg-white shadow rounded-lg p-2"
    >
      <!-- List of Categories -->
      <button
        v-for="category in Category"
        :key="category"
        @click="selectCategory(category)"
        :class="[
          'px-4 py-2 text-sm md:text-base rounded-lg focus:outline-none whitespace-nowrap',
          selectedCategory === category
            ? 'bg-green-500 text-white font-bold'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        ]"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

// **Reactive Variables**
const Category = ref<string[]>([])
const selectedCategory = ref<string | null>(null)
const scrollContainer = ref<HTMLElement | null>(null)

// **Emit Event for Category Selection**
const emit = defineEmits(['filterChanged'])

// **Fetch Categories from CouchDB API**
const fetchCategory = async () => {
  try {
    const response = await api.get<{ categories: string[] }>('/categories');

    if (response.data && Array.isArray(response.data.categories)) {
      Category.value = [...new Set(response.data.categories)];
    } else {
      Category.value = [];
    }

    if (Category.value.length > 0) {
      selectedCategory.value = Category.value[0]; // Select the first category by default
    }
    emit('filterChanged', selectedCategory.value);
  } catch (error) {
    console.error('Error fetching categories:', error);
    Category.value = [];
  }
};

// **Handle Category Selection**
const selectCategory = (category: string | null) => {
  if (selectedCategory.value === category) return;
  selectedCategory.value = category;
  emit('filterChanged', category);
};

// **Drag-to-Scroll Logic**
let isDragging = false
let startX: number
let scrollLeft: number

const handleMouseDown = (event: MouseEvent) => {
  isDragging = true
  startX = event.pageX - (scrollContainer.value?.offsetLeft || 0)
  scrollLeft = scrollContainer.value?.scrollLeft || 0
  scrollContainer.value?.classList.add('dragging')
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging) return
  event.preventDefault()
  const x = event.pageX - (scrollContainer.value?.offsetLeft || 0)
  const walk = x - startX
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft = scrollLeft - walk
  }
}

const handleMouseUp = () => {
  isDragging = false
  scrollContainer.value?.classList.remove('dragging')
}

// **Lifecycle Hook**
onMounted(() => {
  fetchCategory()
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('mousedown', handleMouseDown)
    scrollContainer.value.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }
})
</script>

<style scoped>
.scrollable-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  cursor: grab;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollable-container::-webkit-scrollbar {
  display: none;
}

.scrollable-container.dragging {
  cursor: grabbing;
  user-select: none;
}
</style>
