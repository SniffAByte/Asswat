import Index from '../pages/Index.vue';
import LoginPage from '../pages/auth/Login.vue';

export const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/auth/login',
        component: LoginPage,
        name: 'auth.login'
    }
];