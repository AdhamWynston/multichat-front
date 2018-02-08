import Vue from 'vue';
import Vuex from 'vuex';
import mutations from '../store/mutations';

Vue.use(Vuex);

//=======vuex store start===========
const store = new Vuex.Store({
    state: {
        preloader: true,
    },
    mutations
});
//=======vuex store end===========
export default store
