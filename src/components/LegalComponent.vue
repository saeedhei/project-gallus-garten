<template>
  <SectionSimple>
    <RowSimple class="bg-gray-200">
      <ColumnSimple class="columns-1">
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
      </ColumnSimple>
    </RowSimple>
  </SectionSimple>
</template>

<script setup lang="ts"></script>

<style scoped></style>
