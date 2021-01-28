import VueRouter from "vue-router";
import Vue from "vue";

import search from "@/components/search";
import result from "@/components/result";

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/',
            name: 'search',
            component:search
        },
        {
            path:'/search',
            name: 'search',
            component:search
        },
        {
            path: '/result',
            name: 'result',
            component: result
        }
    ]
})

export default router