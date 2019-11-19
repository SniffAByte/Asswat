import Vue from 'vue';
import { router } from '../../router/router';

const Message = {
    namespaced: true,
    state: {
        messages: {},
        receiver: {},
        errors: {},
        message: '',
        recorded: false,
        blob: null,
        url: null
    },
    getters: {
        user(state) {
            return state.receiver;
        },
        errors(state) {
            return state.errors;
        },
        message(state) {
            return state.message;
        },
        recorded(state) {
            return state.recorded;
        },
        url(state) {
            return state.url;
        },
        messages(state) {
            return state.messages;
        }
    },
    mutations: {
        setReceiver(state, receiver) {
            state.receiver = receiver;
        },
        updateMessage(state, $event) {
            state.message = $event.target.value;
        },
        setRecorded(state, value) {
            state.recorded = value;
        },
        setBlob(state, blob) {
            state.blob = blob;
        },
        setUrl(state, url) {
            state.url = url;
        }
    },
    actions: {
        // Fetch User
        async fetchReceiver({ commit }, username) {
            await Vue.http
                .get(`${username}`)
                .then(response => response.json())
                .then(user => commit('setReceiver', user))
                .catch(() => {
                    // Abort 404
                    return router.push({ name: "404" });
                });
        },
        async fetchMessages({ state, rootState }) {
            const access_token = rootState.Auth.access_token;
            await Vue.http
                .get(`messages`, {
                    headers: {
                        Authorization: "Bearer " + access_token
                    }
                })
                .then(response => response.json())
                .then(messages => {
                    state.messages = messages;
                })
                .catch(error => console.log(error));
        },
        async SendMessage({ state }, type) {
            // Reset Errors
            state.errors = {};
            // Prepare Data To Send
            if (type === 'record') {
                var fd = new FormData();
                fd.append('record', state.blob, new Date().toISOString());
            }
            let data = (type === 'message') ? { message: state.message } : fd;
            // Send Request
            Vue.http.post(`${state.receiver.username}/send`, data).then(response => {
                // Sucess Message
                alertify.notify("Your message has been sent.", "success");
                // Reset Values
                state.message = "";
                state.recorded = false;
            }).catch(error => {
                // On Failure
                state.errors = error.data.errors;
                alertify.notify("Your message couldn\'t be sent!.", "error");
            });

        },
        async deleteMsg({ dispatch }, id) {
            await Vue.http.post(`messages/${id}/delete`).then(response => {
                alertify.notify("Message has been deleted.", "success");
                dispatch('fetchMessages');
            }).catch(err => {
                alertify.notify("An error happened while deleting this message.", "error");
            });
        }
    }
}

export default Message;