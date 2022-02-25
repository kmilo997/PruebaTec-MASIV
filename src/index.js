import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify' // path to vuetify export
import axios from 'axios'
import VueAxios from 'vue-axios'


/*
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)*/

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

new Vue({
    vuetify: new Vuetify(),
    render: h => h(App)
}).$mount('#app');