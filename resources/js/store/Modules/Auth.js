import Vue from 'vue';

const Auth = {
    namespaced: true,
    state: {
        access_token: ''
    },
    getters: {

    },
    mutations: {
        auth(state, authenticated) {
            state.access_token = authenticated.access_token
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
        }
    }
}

export default Auth;