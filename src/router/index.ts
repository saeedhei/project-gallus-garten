import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: {
        title: '👮 Gallus Garten Briefträger',
        metaTags: [
          {
            name: 'description',
            content: 'The about page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The dddddd'
          },
          {
            name: 'viewport',
            content: ''
          }
        ]
      }
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

// Define a type for meta tags
interface MetaTag {
  [key: string]: string
}

// This callback runs before every route change, including on page load.
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
    // `/nested`'s will be chosen.
    const nearestWithTitle = to.matched
      .slice()
      .reverse()
      .find((r) => r.meta && r.meta.title)

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched
      .slice()
      .reverse()
      .find((r) => r.meta && r.meta.metaTags)

    const previousNearestWithMeta = from.matched
      .slice()
      .reverse()
      .find((r) => r.meta && r.meta.metaTags)

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) {
      document.title = nearestWithTitle.meta.title as string
    } else if (previousNearestWithMeta) {
      document.title = previousNearestWithMeta.meta.title as string
    }

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
      (el) => el.parentNode?.removeChild(el)
    )

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta)
      return next()

      // Turn the meta tag definitions into actual elements in the head.
    ;(nearestWithMeta.meta.metaTags as MetaTag[])
      .map((tagDef) => {
        const tag = document.createElement('meta')

        Object.entries(tagDef).forEach(([key, value]) => {
          tag.setAttribute(key, value)
        })

        // We use this to track which meta tags we create so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '')

        return tag
      })
      // Add the meta tags to the document head.
      .forEach((tag) => document.head.appendChild(tag))

    next()
  }
)

export default router
