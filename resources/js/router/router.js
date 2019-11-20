import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from '../store/index.js';
import { routes } from './routes';

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
    // CLEAR ERRORS
    store.commit('Auth/clearErrors');
    store.dispatch('Auth/refresh').then((authenticated) => {
        if (to.meta.requiresAuth) { // If this route requires authentication
            if (!authenticated) {
                return next({ name: 'auth.login' });
            }
        } else if (to.meta.requiresGuest) { // If this route requires to be guest
            if (authenticated) {
                return next({ name: 'user.dashboard' });
            }
        }
        return next();
    });
});

export { router }