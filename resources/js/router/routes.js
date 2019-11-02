import Index from '../pages/Index.vue';
import LoginPage from '../pages/auth/Login.vue';
import RegisterPage from '../pages/auth/Register.vue';
import Dashboard from '../pages/user/Dashboard.vue';

export const routes = [
    {
        path: '/',
        component: Index,
        name: 'index'
    },
    {
        path: '/auth/login',
        component: LoginPage,
        name: 'auth.login',
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/auth/register',
        component: RegisterPage,
        name: 'auth.register',
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/messages',
        component: Dashboard,
        name: 'user.dashboard',
        meta: {
            requiresAuth: true
        }
    }
];