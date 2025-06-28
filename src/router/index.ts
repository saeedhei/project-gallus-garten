import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import HomeView from '../views/HomeView.vue'
import LegalView from '../components/LegalComponent.vue'
import LegalViewImpressum from '../components/Legal-Impressum.vue'
import LegalViewDatenschutz from '../components/Legal-Datenschutz.vue'
import AdminMainLogin from '@/views/galerie/adminLoginPage.vue'
import AdminPanelPage from '@/views/galerie/adminPanelDashboard.vue'
import jwtDecode from 'jwt-decode'

import UserLogin from '@/views/galerie/userLogin.vue'
import UserPanelPage from '@/views/galerie/userDashboard.vue'

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
          path: '/admin-panel-login',
          name: 'Login',
          component: AdminMainLogin,
        },
        {
          path: '/user-login',
          name: 'ULogin',
          component: UserLogin,
        },
        {
          path: '/user-dashboard',
          name: 'UDashboard',
          component: UserPanelPage,
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: AdminPanelPage,
          meta: { requiresAuth: true }, // Protected Route
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
          path: '/a',
          name: 'a',
          component: () => import('@/views/about/AboutView.vue'),
        },
        {
          path: '/ueber-uns',
          name: 'über-uns',
          component: () => import('@/views/about/UeberUns.vue'),
          meta: { title: 'Über Uns' },
        },
        {
          path: '/ueber-uns/team',
          name: 'TeamView',
          component: () => import('@/views/about/UeberUnsTeam.vue'),
        },
        {
          path: '/ueber-uns/team/saeed-heidarizarei',
          name: 'Team',
          component: () => import('@/views/about/UeberUnsTeamSaeed.vue'),
        },
        {
          path: '/ueber-uns/team/ralf-harth',
          name: 'RalfHarth',
          component: () => import('@/views/about/UeberUnsTeamRalf.vue'),
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
})

// 🚀 Protect Routes by Checking JWT Token Expiry
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')
  const userToken = localStorage.getItem('userToken')
  if (to.meta.requiresAuth) {
    if (!token) {
      console.log('❌ No token found. Redirecting to login.')
      return next('/admin-panel-login') // Redirect to login
    }

    try {
      const decoded = jwtDecode<{ exp: number }>(token)
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        console.log('⏳ Token expired. Redirecting to login.')
        localStorage.removeItem('authToken') // Remove expired token
        return next('/admin-panel-login') // Redirect to login
      }
      next()
    } catch (error) {
      console.error('❌ Token decoding error:', error)
      localStorage.removeItem('authToken') // Remove invalid token
      return next('/admin-panel-login') // Redirect to login
    }
  } else if (to.meta.requiresUserAuth) {
    if (!userToken) {
      console.log('❌ No user token found. Redirecting to user login.')
      return next('/user-login') // Redirect to user login
    }
    try {
      const decoded = jwtDecode<{ exp: number }>(userToken)
      if (decoded.exp < Date.now() / 1000) {
        console.log('⏳ User token expired. Redirecting to user login.')
        localStorage.removeItem('token')
        return next('/user-login') // Redirect to user login
      }
      next()
    } catch {
      localStorage.removeItem('token')
      return next('/user-login') // Redirect to user login
    }
  } else {
    next() // Allow access to routes that don't require authentication
  }
})

export default router
