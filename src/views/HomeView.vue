<script setup lang="ts">
import DataForm from '../components/DataForm.vue'
import ChooseVorlage from '../components/ChooseVorlage.vue'
import GallusHeader from '../components/GallusHeader.vue'
import GallusVorschau from '../components/GallusVorschau.vue'
import LiveView from '../components/LiveView.vue'
</script>

<template>
  <main>
    <GallusHeader />
    <div id="edit">
    <DataForm msg="You did it!" />
    <ChooseVorlage />
  </div>
  <GallusVorschau />
  <LiveView />
  </main>
</template>

<style scoped>
#edit{
  width: 700px;
  margin: 0 auto;
}
</style>
