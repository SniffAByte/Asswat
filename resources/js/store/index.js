import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './Modules/Auth';
import Message from './Modules/Message';


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
    },
    getters: {

    },
    mutations: {

    },
    actions: {
    },
    modules: {
        Auth,
        Message
    }
});