import { createRouter, createWebHistory } from 'vue-router'
import { useUserAccountStore } from '../store'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/Login.vue'),
    },
    {
        path: '/activation',
        name: 'activate',
        component: () => import('./views/AccountActivation.vue'),
    },
    {
        path: '/',
        name: 'dashboard',
        component: () => import('./layouts/DashboardLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('./views/Dashboard.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Global guards, always check if the user is authenticated or not,
// redirect to login if user is not authenticated
router.beforeEach(async (to, from) => {
    const userStore = useUserAccountStore()
    if (!userStore.isUserAuthenticated() && to.name !== 'login') {
        return {
            name: 'login',
        }
    } else if (userStore.isUserAuthenticated() && to.name === 'login') {
        return {
            name: 'dashboard',
        }
    }
})

export default router
