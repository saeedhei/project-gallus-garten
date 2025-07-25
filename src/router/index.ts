import { createRouter, createWebHistory } from 'vue-router';
import HomeLayout from '@/layouts/HomeLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

import HomeView from '../views/HomeView.vue';
import LegalView from '../components/LegalComponent.vue';
import LegalViewImpressum from '../components/Legal-Impressum.vue';
import LegalViewDatenschutz from '../components/Legal-Datenschutz.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home Page with HomeLayout
    {
      path: '/',
      component: HomeLayout,
      children: [{ path: '', name: 'Home', component: HomeView }],
    },
    // DefaultLayout
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/login/LoginView.vue'),
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/dashboard/DashboardView.vue'),
        },
        {
          path: '/bildergalerie',
          name: 'Bildergalerie',
          component: () => import('@/views/galerie/BilderGalerie.vue'),
          meta: { title: 'BilderGalerie' },
        },
        {
          path: '/projekte',
          name: 'Projekte',
          component: () => import('@/views/project/ProjekteView.vue'),
        },
        {
          path: '/ueber-uns',
          name: 'über-uns',
          component: () => import('@/views/ueber-uns/UeberUns.vue'),
          meta: { title: 'Über Uns' },
        },
        {
          path: '/ueber-uns/team',
          name: 'TeamView',
          component: () => import('@/views/ueber-uns/team/TeamView.vue'),
          meta: { title: 'Das Führungsteam' },
        },
        {
          path: '/ueber-uns/team/saeed-heidarizarei',
          name: 'Team',
          component: () => import('@/views/ueber-uns/team/saeed-heidarizarei/SaeedView.vue'),
          meta: { title: 'Saeed Heidarizarei' },
        },
        {
          path: '/ueber-uns/team/ralf-harth',
          name: 'RalfHarth',
          component: () => import('@/views/ueber-uns/team/ralf-harth/UeberUnsTeamRalf.vue'),
        },
        {
          path: '/werkzeuge',
          name: 'Werkzeuge',
          component: () => import('@/views/werkzeuge/WerkzeugeView.vue'),
        },
        {
          path: '/werkzeuge/quittung',
          name: 'Quittung',
          component: () => import('@/views/werkzeuge/WerkzeugeQuittung.vue'),
        },
        {
          path: '/legal',
          name: 'legal',
          component: LegalView,
        },
        {
          path: '/legal/impressum',
          name: 'Impressum',
          component: LegalViewImpressum,
        },
        {
          path: '/legal/datenschutz',
          name: 'Datenschutz',
          component: LegalViewDatenschutz,
        },
        {
          path: '/legal/datenschutzeinstellungen',
          name: 'Datenschutzeinstellungen',
          component: () => import('../components/organisms/WelcomeCookie.vue'),
        },
      ],
    },
    // ohne Layout
    {
      path: '/lageplan',
      name: 'Lageplan',
      component: () => import('@/views/lage/LagePlan.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (to.name === 'Dashboard' && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
