import Home from "./views/Home.vue"

export const routes = [
    {path: "/:path(.*)", component: ()=>import('./views/NotFound.vue') },
    {path:"/", name:'home', component: Home},
]