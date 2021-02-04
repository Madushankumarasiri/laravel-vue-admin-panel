/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import moment from 'moment';
import {
    Form,
    HasError,
    AlertError
} from 'vform'

import Swal from 'sweetalert2'

window.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

window.Toast = Toast;

Window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router'
import vueProgressbar from 'vue-progressbar';

Vue.use(VueRouter)

Vue.use(vueProgressbar, {
    color: "#00FA9A",
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
})

const routes = [{
        path: '/dashboard',
        component: require('./components/Dashboard.vue').default
    },
    {
        path: '/employee',
        component: require('./components/Employees.vue').default
    },
    {
        path: '/users',
        component: require('./components/Users.vue').default
    },
    {
        path: '/products',
        component: require('./components/Products.vue').default
    },
    {
        path: '/categories',
        component: require('./components/Categories.vue').default
    },
    
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

Vue.filter("upText", function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter("myDate", function (created) {
    return moment(created).format('MMMM Do YYYY, h:mm a');
});

//Fire is a new instance of vue
//by "window" we can use that instance anywhere of the app
window.Fire = new Vue();


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
