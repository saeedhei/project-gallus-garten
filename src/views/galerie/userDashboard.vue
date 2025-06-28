<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Welcome, user!</h1>
    <button @click="logout" class="mt-4 bg-red-500 text-white p-2">Logout</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('userToken')
  router.push('/user-login')
}
</script>
