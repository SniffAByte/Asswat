import Vue from 'vue';

const Auth = {
    namespaced: true,
    state: {
        access_token: null,
        error: null
    },
    getters: {

    },
    mutations: {
        auth(state, authenticated) {
            state.access_token = authenticated.access_token
        },
        setError(state, error) {
            state.error = error;
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
            }).catch(err => {
                console.log('err', err);
            })
        },
        async login({ commit }, payload) {
            // Send the Request to the backend
            await Vue.http.post(`auth/login`, payload).then(response => response.json()).then(authenticated => {
                // Commit a mutation to store response in state
                commit('auth', authenticated);

                // Store token in localstorage
                localStorage.setItem('access_token', authenticated.access_token);
            }).catch(error => {
                commit('setError', error.data);
            });
        }
    }
}

export default Auth;