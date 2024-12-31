<template>
  <div class="py-2 px-6 flex flex-col justify-evenly  bg-white rounded-lg shadow-md">
    <img :src="img" :alt="alt" class="rounded-full w-40 h-40 mx-auto mb-4" />
    <h2 class="text-center text-xl font-bold text-gray-800 mb-1">{{ name }}</h2>
    <h4 class="text-center text-md text-gray-500 mb-2">{{ title }}</h4>
    <p class="text-gray-700 text-center mb-2">
      {{ description }}
    </p>
    <div class="flex justify-center space-x-4 mb-2">
      <!-- Email Icon -->
      <a v-if="email" :href="`mailto:${email}`" class="hover:text-gray-700" aria-label="Email">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 fill-current text-gray-500 hover:text-gray-700"
          viewBox="0 0 24 24"
        >
          <path
            d="M2 5a2 2 0 012-2h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm18 0H4v.01L12 12l8-6.99V5zm-8 7L4 6.99V19h16V6.99L12 12z"
          />
        </svg>
      </a>
      <!-- Phone Icon -->
      <a v-if="phone" :href="`tel:${phone}`" class="hover:text-gray-700" aria-label="Phone">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 fill-current text-gray-500 hover:text-gray-700"
          viewBox="0 0 24 24"
        >
          <path
            d="M2.01 4.66A3 3 0 015.63 3a14.89 14.89 0 001.92.08c1.06-.05 2.05-.3 2.88-.7.65-.3 1.33-.2 1.75.3l1.67 1.9a2 2 0 01-.4 3.06l-2.14.8a1.1 1.1 0 00-.54 1.64A8.78 8.78 0 0015 15.1c.74.38 1.45-.14 1.65-.5l.7-2.12a2 2 0 012.94-.4l1.88 1.61a2 2 0 01.33 1.68 14.72 14.72 0 01-1.7 3.3 3 3 0 01-3.38 1.17 19.64 19.64 0 01-9.48-5.7 19.7 19.7 0 01-4.47-8A3 3 0 012 4.67z"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  img: { type: String, required: true },
  alt: { type: String, default: "Personal image" },
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, default: null },
  phone: { type: String, default: null },
});
</script>
