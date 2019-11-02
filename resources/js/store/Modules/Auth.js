import Vue from 'vue';
import { router } from '../../router/router';

const redirectTo = 'user.dashboard';

const Auth = {
    namespaced: true,
    state: {
        authenticated: false,
        access_token: null,
        error: null
    },
    getters: {
        authenticated(state) {
            return state.authenticated;
        }
    },
    mutations: {
        auth(state, authenticated) {
            state.authenticated = true;
            state.access_token = authenticated.access_token
        },
        setError(state, error) {
            state.error = error;
        },
        logout(state) {
            state.authenticated = false;
            state.access_token = null;
        }
    },
    actions: {
        async register({ commit }, payload) {
            // Send the Request to the backend
            await Vue.http.post(`auth/register`, payload).then(response => response.json()).then(authenticated => {
                // Commit a mutation to store response in state
                commit('auth', authenticated);

                // Store token in localstorage
                localStorage.setItem('access_token', authenticated.access_token);

                // Redirect to user dashboard
                router.push({ name: redirectTo });

            }).catch(error => {
                commit('setError', error.data);
            });
        },
        async login({ commit }, payload) {
            // Send the Request to the backend
            await Vue.http.post(`auth/login`, payload).then(response => response.json()).then(authenticated => {
                // Commit a mutation to store response in state
                commit('auth', authenticated);

                // Store token in localstorage
                localStorage.setItem('access_token', authenticated.access_token);

                // Redirect to user dashboard
                router.push({ name: redirectTo });

            }).catch(error => {
                commit('setError', error.data);
            });
        },
        async logout({ state, commit }) {
            await Vue.http.post(`auth/logout`, {}, {
                headers: {
                    Authorization: 'Bearer ' + state.access_token
                }
            }).then(response => {
                commit('logout');
                router.push({ name: 'auth.login' });
            }).catch(error => {
                console.log(error);
            });
        }
    }
}

export default Auth;