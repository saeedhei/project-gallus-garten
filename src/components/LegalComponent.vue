<template>
  <div class="mx-auto px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
    <div class="section mx-auto">
      <div class="row flex flex-wrap bg-gray-200">
        <div class="columns columns-1">
          <h1 class="text-3xl font-bold mb-4">Rechtliches</h1>
          <nav class="mb-6">
            <router-link to="/legal/impressum" class="text-blue-500 hover:underline mr-4"
              >Impressum</router-link
            >
            <router-link to="/legal/datenschutz" class="text-blue-500 hover:underline"
              >Datenschutz</router-link
            >
          </nav>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
