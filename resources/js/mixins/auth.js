import { mapGetters } from 'vuex';

export const Auth = {
    computed: mapGetters('Auth', ['authenticated'])
}