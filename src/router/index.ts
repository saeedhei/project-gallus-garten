import { createRouter, createWebHistory } from 'vue-router'
// import AdminView from '../views/AdminView.vue'
import HomeView from '../views/HomeView.vue'
import LegalView from '../components/LegalComponent.vue'
import LegalViewImpressum from '../components/Legal-Impressum.vue'
import LegalViewDatenschutz from '../components/Legal-Datenschutz.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ueber-uns',
      name: 'über-uns',
      component: () => import('@/views/UeberUns.vue'),
    },
    {
      path: '/ueber-uns/team',
      name: 'TeamView',
      component: () => import('@/views/UeberUnsTeam.vue'),
    },
    {
      path: '/ueber-uns/team/saeed-heidarizarei',
      name: 'Team',
      component: () => import('@/views/UeberUnsTeamSaeed.vue'),
    },
    {
      path: '/ueber-uns/team/ralf-harth',
      name: 'RalfHarth',
      component: () => import('@/views/UeberUnsTeamRalf.vue'),
    },
    {
      path: '/legal',
      component: LegalView,
      children: [
        {
          path: 'impressum',
          name: 'Impressum',
          component: LegalViewImpressum,
        },
        {
          path: 'datenschutz',
          name: 'Datenschutz',
          component: LegalViewDatenschutz,
        },
        {
          path: 'datenschutzeinstellungen',
          name: 'Datenschutzeinstellungen',
          component: () => import('../components/organisms/WelcomeCookie.vue'),
        },
      ],
    },
    {
      path: '/docs',
      component: () => import('@/views/DocsView.vue'),
      children: [
        {
          path: 'changelog',
          name: 'Changelog',
          component: () => import('@/views/DocsChangelogView.vue'),
        },
      ],
    },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: AdminView,
    // },
  ],
})

export default router
