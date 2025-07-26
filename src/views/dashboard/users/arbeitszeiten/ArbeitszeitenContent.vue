<template>
  <div class="p-6 bg-gray-50 min-h-screen space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">Arbeitszeiten von {{ userName }}</h2>

    <!-- جدول فعالیت‌ها -->
    <table class="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
      <thead class="bg-gray-200 text-gray-600 text-sm">
        <tr>
          <th class="px-4 py-2 text-left">Datum</th>
          <th class="px-4 py-2 text-left">Startzeit</th>
          <th class="px-4 py-2 text-left">Endzeit</th>
          <th class="px-4 py-2 text-left">Aktivität</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(activity, index) in activities"
          :key="index"
          :class="['text-sm', index !== activities.length - 1 ? 'border-b text-gray-700' : '']"
        >
          <td class="px-4 py-2">{{ activity.date }}</td>
          <td class="px-4 py-2">{{ activity.startTime }}</td>
          <td class="px-4 py-2">{{ activity.endTime }}</td>
          <td class="px-4 py-2">{{ activity.activityType }}</td>
        </tr>
      </tbody>
    </table>

    <!-- فرم افزودن فعالیت جدید -->
    <div class="bg-white p-6 rounded-2xl shadow space-y-6">
      <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
        ➕ Neue Aktivität hinzufügen
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Datum -->
        <div class="flex flex-col space-y-1">
          <label for="date" class="text-sm text-gray-600">Datum der Aktivität</label>
          <input
            id="date"
            v-model="form.date"
            type="date"
            class="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <!-- Aktivitätstyp -->
        <div class="flex flex-col space-y-1">
          <label for="activityType" class="text-sm text-gray-600">Art der Aktivität</label>
          <input
            id="activityType"
            v-model="form.activityType"
            type="text"
            placeholder="z.B. Gartenarbeit"
            class="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <!-- Startzeit -->
        <div class="flex flex-col space-y-1">
          <label for="startTime" class="text-sm text-gray-600">Von (Startzeit)</label>
          <input
            id="startTime"
            v-model="form.startTime"
            type="time"
            class="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <!-- Endzeit -->
        <div class="flex flex-col space-y-1">
          <label for="endTime" class="text-sm text-gray-600">Bis (Endzeit)</label>
          <input
            id="endTime"
            v-model="form.endTime"
            type="time"
            class="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>

      <div class="pt-2">
        <button
          @click="submitActivity"
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm shadow"
        >
          Aktivität speichern
        </button>

        <p v-if="feedback" class="text-green-600 text-sm mt-2">{{ feedback }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import api from '@/services/api';

interface Activity {
  date: string;
  startTime: string;
  endTime: string;
  activityType: string;
}

const route = useRoute();

const activities = ref<Activity[]>([]);
const userName = ref<string>('Benutzer');
const userId = ref<number | null>(null);
const feedback = ref('');

const form = ref<Activity>({
  date: '',
  startTime: '',
  endTime: '',
  activityType: '',
});

onMounted(() => {
  const raw = route.query.activities as string;
  const id = route.query.id as string;
  if (id) userId.value = parseInt(id);

  if (raw) {
    try {
      activities.value = JSON.parse(raw);
    } catch (err) {
      console.error('Fehler beim Parsen der Aktivitäten:', err);
    }
  }

  if (route.query.name) {
    userName.value = route.query.name as string;
  }
});

const submitActivity = async () => {
  if (!userId.value) {
    feedback.value = 'Fehlende Benutzer-ID';
    return;
  }

  try {
    await api.post(`/v3/dashboard/users/${userId.value}/add-activity`, form.value);

    // به لیست اضافه کن
    activities.value.push({ ...form.value });

    feedback.value = 'Aktivität erfolgreich gespeichert!';
    form.value = { date: '', startTime: '', endTime: '', activityType: '' };
  } catch (error) {
    console.error('Fehler beim Speichern der Aktivität:', error);
    feedback.value = 'Fehler beim Speichern';
  }
};
</script>
