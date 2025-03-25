import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LegalView from '../components/LegalComponent.vue'
import LegalViewImpressum from '../components/Legal-Impressum.vue'
import LegalViewDatenschutz from '../components/Legal-Datenschutz.vue'
import AdminMainLogin from '@/components/gallery/adminLoginPage.vue'
import AdminPanelPage from '@/components/gallery/adminPanelDashboard.vue'
import jwtDecode from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin-panel-login',
      name: 'Login',
      component: AdminMainLogin,
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
      component: () => import('@/views/BilderGalerie.vue'),
    },
    {
      path: '/a',
      name: 'a',
      component: () => import('@/views/AboutView.vue'),
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
    {
      path: '/werkzeuge',
      name: 'Werkzeuge',
      component: () => import('@/views/WerkzeugeView.vue'),
    },
    {
      path: '/werkzeuge/quittung',
      name: 'Quittung',
      component: () => import('@/views/WerkzeugeQuittung.vue'),
    },
  ],
})

// 🚀 Protect Routes by Checking JWT Token Expiry
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')

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
  } else {
    next() // Allow access to routes that don't require authentication
  }
})

export default router
