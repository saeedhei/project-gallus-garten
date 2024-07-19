<script setup lang="ts">
// import DataForm from '../components/DataForm.vue'
import ChooseVorlage from '../components/ChooseVorlage.vue'
import GallusHeader from '../components/GallusHeader.vue'
import GallusVorschau from '../components/GallusVorschau.vue'
import LiveView from '../components/LiveView.vue'
<<<<<<< HEAD
import { storeToRefs } from 'pinia'
=======
import { storeToRefs } from 'pinia';
>>>>>>> 182cd04a80d1dfe6147e1cdd64ccade794a2f5b5
import { useLiveStore } from '@/stores/live'
const liveStore = useLiveStore()
const { updateString } = liveStore
const { livestring } = storeToRefs(liveStore) // to keep reactivity
</script>

<template>
  <div class="div">My</div>
  <div>
    <div>{{ livestring }}</div>
    <button @click="updateString('Hey')">Update</button>
  </div>
  <main>
    <GallusHeader />
    <div id="edit">
      <!-- <DataForm msg="You did it!" /> -->
      <ChooseVorlage />
    </div>
    <GallusVorschau />
    <LiveView />
  </main>
</template>

<style scoped>
#edit {
  width: 700px;
  margin: 0 auto;
}
</style>
