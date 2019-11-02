import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from '../store/index.js';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }

        if (savedPosition) {
            return savedPosition;
        }

        return {
            x: 0,
            y: 0
        }
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        return store.getters['Auth/authenticated'] ? next() : next({ name: 'auth.login' });
    } else if (to.meta.requiresGuest) {
        return store.getters['Auth/authenticated'] ? next({ name: 'user.dashboard' }) : next();
    }
    next();
});

export { router }