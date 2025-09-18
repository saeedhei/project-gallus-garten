import { createRouter, createWebHistory } from 'vue-router';
import HomeLayout from '@/layouts/HomeLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

import HomeView from '../views/HomeView.vue';
import LegalView from '../components/LegalComponent.vue';
import LegalViewImpressum from '../components/Legal-Impressum.vue';
import LegalViewDatenschutz from '../components/Legal-Datenschutz.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
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
          path: '/users',
          name: 'Users',
          component: () => import('@/views/users/UsersView.vue'),
        },
        {
          path: '/dashboard/arbeitszeiten',
          name: 'Arbeitszeiten',
          component: () => import('@/views/dashboard/users/arbeitszeiten/ArbeitszeitenContent.vue'),
        },
        {
          path: '/users/:slug',
          component: () => import('@/views/users/UserProfile.vue'),
          name: 'UserProfile',
        },
        {
          path: '/beitraege',
          name: 'Beitraege',
          component: () => import('@/views/beitraege/BeitraegeView.vue'),
        },
        {
          path: '/beitraege/:id',
          name: 'BeitragDetail',
          component: () => import('@/views/beitraege/BeitragDetailView.vue'),
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
          path: '/kontakt',
          name: 'Kontakt',
          component: () => import('@/views/kontakt/KontaktView.vue'),
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
          component: LegalViewDatenschutz,
        },
      ],
    },
    // ohne Layout
    {
      path: '/lageplan',
      name: 'Lageplan',
      component: () => import('@/views/lage/IndexPage.vue'),
    },
    {
      path: '/lageplan-aktuell',
      name: 'Lageplan Aktuell',
      component: () => import('@/views/lage/LagePlanAktuell.vue'),
    },
    {
      path: '/lageplan-zukunft',
      name: 'Lageplan Zukunft',
      component: () => import('@/views/lage/LagePlanZukunft.vue'),
    },
    {
      path: '/dashboard/ehrenamtsnachweis',
      name: 'Ehrenamtsnachweis',
      component: () =>
        import('@/views/dashboard/users/ehrenamtsnachweis/EhrenamtBescheinigung.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const protectedRoutes = ['Dashboard', 'Arbeitszeiten2'];

  if (protectedRoutes.includes(to.name as string) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
