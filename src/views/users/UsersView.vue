<template>
  <div class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div
      v-for="(user, key) in userRoles"
      :key="key"
      :class="`rounded-xl shadow-lg text-white ${user.bg}`"
      class="w-64 h-36 flex p-3"
    >
      <!-- عکس پروفایل -->
      <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-white mr-3">
        <img
          src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
          alt="Profilbild"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- متن کارت -->
      <div class="flex flex-col justify-between flex-1 text-sm">
        <div>
          <div class="font-bold text-base">{{ user.title }}</div>
          <div class="opacity-90">{{ user.description }}</div>
        </div>
        <div class="text-right text-lg">{{ user.stars }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UserRole {
  title: string;
  description: string;
  bg: string;
  stars: string;
}

const userRoles: Record<string, UserRole> = {
  passiv: {
    title: 'Passives Mitglied',
    description: 'Kein aktiver Beitrag, aber Teil der Gemeinschaft.',
    bg: 'bg-gray-500',
    stars: '',
  },
  bronze: {
    title: 'Bronze-Sponsor',
    description: 'Finanzielle Unterstützung auf Basisebene.',
    bg: 'bg-green-700',
    stars: '🟤',
  },
  silber: {
    title: 'Silber-Sponsor',
    description: 'Verlässlicher Sponsor mit mittlerem Beitrag.',
    bg: 'bg-green-600',
    stars: '⚪️',
  },
  gold: {
    title: 'Gold-Sponsor',
    description: 'Höchste Form der finanziellen Unterstützung.',
    bg: 'bg-green-500',
    stars: '🟡',
  },
  event: {
    title: 'Mitwirkende*r bei Aktionen',
    description: 'Teilnahme an Gemeinschaftsaktionen.',
    bg: 'bg-red-700',
    stars: '⭐',
  },
  mitarbeiter: {
    title: 'Projektmitarbeiter*in',
    description: 'Aktive Projektarbeit mit Verantwortung.',
    bg: 'bg-red-600',
    stars: '⭐⭐',
  },
  leiter: {
    title: 'Projektleiter*in',
    description: 'Leitet und koordiniert Projekte.',
    bg: 'bg-red-500',
    stars: '⭐⭐⭐',
  },
  aktiv: {
    title: 'Aktives Mitglied',
    description: 'Regelmäßige Beteiligung an Vereinsaktivitäten.',
    bg: 'bg-yellow-600',
    stars: '⭐',
  },
  vorstandnah: {
    title: 'Vorstandsnahes Mitglied',
    description: 'Unterstützt den Vorstand bei Entscheidungen.',
    bg: 'bg-yellow-500',
    stars: '⭐⭐',
  },
  vorstand: {
    title: 'Vorstand',
    description: 'Leitet den Verein strategisch und organisatorisch.',
    bg: 'bg-yellow-400',
    stars: '⭐⭐⭐',
  },
};
</script>

<style scoped>
/* اختیاری: فونت یا استایل بیشتر */
</style>
