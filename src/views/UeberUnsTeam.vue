<template>
  <SectionSimple>
    <RowSimple class="bg-gray-200">
      <ColumnSimple class="columns-1">
        <h1 class="text-3xl font-bold mb-4">GallusGarten Team:</h1>
        <nav class="mb-6">
          <router-link
            to="/ueber-uns/team/saeed-heidarizarei"
            class="text-blue-500 hover:underline mr-4"
            >Saeed</router-link
          >
          <router-link to="/ueber-uns/team/ralf-harth" class="text-blue-500 hover:underline mr-4"
            >Ralf</router-link
          >
        </nav>
      </ColumnSimple>
    </RowSimple>
  </SectionSimple>
</template>

<script setup lang="ts"></script>

<style scoped>
.legal {
  margin: 20px;
}
</style>
