<template>
  <div class="min-h-screen">
    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Profile Card -->
        <div class="w-full lg:w-1/3">
          <div class="profile-card bg-white rounded-xl overflow-hidden shadow-md">
            <div class="relative h-48 bg-green-600 flex items-center justify-center leaf-bg">
              <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <img
                  :src="boardMember.image"
                  :alt="boardMember.name"
                  class="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>
            </div>
            <div class="p-6 text-center">
              <h2 class="text-2xl font-bold text-gray-800">{{ boardMember.name }}</h2>
              <p class="text-green-600 font-medium">{{ boardMember.position }}</p>
              <p class="text-gray-500 mt-2">{{ boardMember.location }}</p>

              <div class="flex justify-center space-x-4 mt-4">
                <a
                  v-if="boardMember.social.email"
                  :href="'mailto:' + boardMember.social.email"
                  class="text-gray-500 hover:text-green-600 transition"
                >
                  <i class="fas fa-envelope text-xl"></i>
                  <!-- <font-awesome-icon :icon="['far', 'envelope']" /> -->
                </a>
                <a
                  v-if="boardMember.social.linkedin"
                  :href="boardMember.social.linkedin"
                  class="text-gray-500 hover:text-green-600 transition"
                >
                  <i class="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  v-if="boardMember.social.twitter"
                  :href="boardMember.social.twitter"
                  class="text-gray-500 hover:text-green-600 transition"
                >
                  <i class="fab fa-twitter text-xl"></i>
                </a>
              </div>

              <div class="mt-6 bg-green-50 rounded-lg p-4">
                <h3 class="font-semibold text-green-700 mb-2">Membership Details</h3>
                <p class="text-sm text-gray-600">
                  <i class="fas fa-calendar-alt mr-2 text-green-600"></i>
                  Member since {{ formatDate(boardMember.memberSince) }}
                </p>
                <p v-if="boardMember.committees" class="text-sm text-gray-600 mt-1">
                  <i class="fas fa-users mr-2 text-green-600"></i>
                  Committees: {{ boardMember.committees.join(', ') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Details -->
        <div class="w-full lg:w-2/3">
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <!-- Tabs -->
            <div class="border-b border-gray-200">
              <nav class="flex -mb-px">
                <button
                  @click="activeTab = 'about'"
                  :class="{
                    'border-green-600 text-green-600': activeTab === 'about',
                    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
                      activeTab !== 'about',
                  }"
                  class="whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm"
                >
                  About
                </button>
                <button
                  @click="activeTab = 'timeline'"
                  :class="{
                    'border-green-600 text-green-600': activeTab === 'timeline',
                    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
                      activeTab !== 'timeline',
                  }"
                  class="whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm"
                >
                  Timeline
                </button>
                <button
                  @click="activeTab = 'projects'"
                  :class="{
                    'border-green-600 text-green-600': activeTab === 'projects',
                    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
                      activeTab !== 'projects',
                  }"
                  class="whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm"
                >
                  Projects
                </button>
              </nav>
            </div>

            <!-- Tab Content -->
            <div class="p-6">
              <!-- About Tab -->
              <div v-if="activeTab === 'about'" class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-800">Biografie</h3>
                <p class="text-gray-600">{{ boardMember.bio }}</p>

                <div v-if="boardMember.education" class="mt-6">
                  <h4 class="font-semibold text-gray-800 mb-2">Akademische Ausbildung</h4>
                  <ul class="space-y-2">
                    <li
                      v-for="(edu, index) in boardMember.education"
                      :key="index"
                      class="flex items-start"
                    >
                      <i class="fas fa-graduation-cap text-green-600 mt-1 mr-3"></i>
                      <div>
                        <p class="font-medium">{{ edu.degree }}</p>
                        <p class="text-sm text-gray-500 italic">{{ edu.institution }}</p>
                        <p class="font-bold text-sm text-gray-500">
                          Abgeschlossen im Jahr {{ edu.year }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div v-if="boardMember.expertise" class="mt-6">
                  <h4 class="font-semibold text-gray-800 mb-2">Areas of Expertise</h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(skill, index) in boardMember.expertise"
                      :key="index"
                      class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Timeline Tab -->
              <div v-if="activeTab === 'timeline'" class="space-y-8">
                <h3 class="text-xl font-semibold text-gray-800">Involvement with GallusGarten</h3>

                <div class="relative">
                  <div
                    v-for="(item, index) in boardMember.timeline"
                    :key="index"
                    class="timeline-item relative pl-10 pb-6"
                  >
                    <div
                      class="absolute left-0 top-0 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center"
                    >
                      <!-- <i :class="item.icon" class="text-lg"></i> -->
                      <font-awesome-icon class="text-lg" :icon="item.icon" />
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                      <h4 class="font-semibold text-gray-800">{{ item.title }}</h4>
                      <p class="text-sm text-green-600 mb-2">{{ formatDate(item.date) }}</p>
                      <p class="text-gray-600">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Projects Tab -->
              <div v-if="activeTab === 'projects'" class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-800">Projects & Initiatives</h3>

                <div
                  v-for="(project, index) in boardMember.projects"
                  :key="index"
                  class="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div class="bg-green-50 px-4 py-3 border-b border-gray-200">
                    <h4 class="font-semibold text-gray-800">{{ project.name }}</h4>
                    <p class="text-sm text-gray-500">{{ project.period }}</p>
                  </div>
                  <div class="p-4">
                    <p class="text-gray-600 mb-3">{{ project.description }}</p>
                    <div
                      v-if="project.outcomes"
                      class="bg-white border border-green-100 rounded p-3"
                    >
                      <h5 class="font-medium text-green-700 mb-2">Key Outcomes</h5>
                      <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li v-for="(outcome, i) in project.outcomes" :key="i">{{ outcome }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Garden Contribution -->
          <div class="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
            <div class="bg-green-600 px-4 py-3">
              <h3 class="text-white font-semibold">Favorite Garden Spot</h3>
            </div>
            <div class="p-4">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="md:w-1/3">
                  <img
                    :src="boardMember.favoriteSpot.image"
                    :alt="boardMember.favoriteSpot.name"
                    class="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div class="md:w-2/3">
                  <h4 class="font-semibold text-gray-800">{{ boardMember.favoriteSpot.name }}</h4>
                  <p class="text-gray-600 mt-2">{{ boardMember.favoriteSpot.description }}</p>
                  <div class="mt-3 flex items-center text-sm text-gray-500">
                    <i class="fas fa-map-marker-alt mr-2 text-green-600"></i>
                    {{ boardMember.favoriteSpot.location }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Education {
  degree: string
  institution: string
  year: string
}

interface Social {
  email?: string
  linkedin?: string
  twitter?: string
}

interface TimelineItem {
  title: string
  date: string
  description: string
  icon: string[]
}

interface Project {
  name: string
  period: string
  description: string
  outcomes: string[]
}

interface FavoriteSpot {
  name: string
  description: string
  location: string
  image: string
}

interface BoardMember {
  name: string
  position: string
  location: string
  image: string
  memberSince: string
  bio: string
  education: Education[]
  expertise: string[]
  social: Social
  committees: string[]
  timeline: TimelineItem[]
  projects: Project[]
  favoriteSpot: FavoriteSpot
}

const activeTab = ref<'about' | 'timeline' | 'projects'>('about')

const boardMember = ref<BoardMember>({
  name: 'Saeed Heidarizarei',
  position: 'Vorstand',
  location: 'Frankfurt, Germany',
  image: '/images/team/Saeed-Heidarizarei.webp',
  memberSince: '2025-02-04',
  bio: 'Saeed Heidarizarei ist seit über 10 Jahren leidenschaftlicher Softwareentwickler, Gründer von Start-ups und auch engagierter Lehrer. Mit einem fundierten Hintergrund in der Full-Stack-JavaScript-Entwicklung hat er mehrere innovative Webanwendungen erfolgreich umgesetzt. Saeed glaubt an die Kraft der Technologie, reale Probleme zu lösen, und strebt stets danach, skalierbare und benutzerfreundliche Produkte zu schaffen. Seine Leidenschaft fürs Programmieren wird durch sein Engagement für die Betreuung von Junior-Entwicklern, seinen Beitrag zur Tech-Community und seine Tätigkeit als Lehrer ergänzt.',
  education: [
    {
      degree: 'Studium der Informatik (B.Sc.)',
      institution: 'Hochschule für Angewandte Wissenschaften, Iran',
      year: '2006',
    },
  ],
  expertise: [
    'Urban Gardening',
    'Sustainability',
    'Community Engagement',
    'Grant Writing',
    'Public Policy',
  ],
  social: {
    email: 'anna.mueller@gallusgarten.de',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  committees: ['Executive', 'Fundraising', 'Education'],
  timeline: [
    {
      title: 'Joined GallusGarten',
      date: '2015-06-15',
      description:
        'Became a regular volunteer at GallusGarten, helping with weekend gardening activities.',
      icon: ['fas', 'fa-seedling'],
    },
    {
      title: 'Elected to Board',
      date: '2017-03-10',
      description: 'Elected as a board member responsible for community outreach programs.',
      icon: ['fas', 'fa-users'],
    },
    {
      title: 'Launched Education Program',
      date: '2018-09-05',
      description:
        "Developed and launched the garden's school education program which now serves over 500 students annually.",
      icon: ['fas', 'fa-book-open'],
    },
    {
      title: 'Became Chairperson',
      date: '2020-01-20',
      description:
        "Elected as Chairperson of GallusGarten, leading the board's strategic direction.",
      icon: ['fas', 'envelope'],
    },
  ],
  projects: [
    {
      name: 'Community Composting Initiative',
      period: '2019 - Present',
      description:
        'Developed a neighborhood composting program that diverts over 2 tons of organic waste from landfills each month while producing high-quality compost for the garden.',
      outcomes: [
        "Reduced garden's fertilizer costs by 40%",
        'Engaged 200+ households in composting',
        'Won 2021 Frankfurt Sustainability Award',
      ],
    },
    {
      name: 'Accessible Garden Pathways',
      period: '2020 - 2021',
      description:
        'Led the redesign and reconstruction of garden pathways to be fully wheelchair accessible, making the garden more inclusive for visitors with mobility challenges.',
      outcomes: [
        'Installed 1.2km of accessible pathways',
        'Increased visits by seniors by 35%',
        "Featured in 'Inclusive Frankfurt' city guide",
      ],
    },
  ],
  favoriteSpot: {
    name: 'The Herb Circle',
    description:
      'A circular garden featuring over 50 varieties of medicinal and culinary herbs, with benches for visitors to sit and enjoy the fragrances. This spot represents the perfect blend of beauty and utility that defines GallusGarten.',
    location: 'Northwest corner near the fountain',
    image:
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  },
})

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('de-DE', options)
}
</script>

<style scoped>
.profile-card {
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 20px;
  top: 30px;
  height: calc(100% - 30px);
  width: 2px;
  background-color: #4ade80;
}
.leaf-bg {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%234ade8080"><path d="M50 0 Q75 20 50 50 Q25 80 50 100 Q75 80 50 50 Q25 20 50 0" /></svg>');
  background-size: 200px;
  opacity: 0.85;
}
</style>
