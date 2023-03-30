import { createRouter, createWebHistory} from "vue-router"
import { routeNames } from "./routeNames"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/auth",
            name: routeNames.Auth,
            component: {template: "<h1>test</h1>"}
        },
        {
            path: "/layout",
            name: routeNames.Layout,
            component: () => import("../pages/Main.vue"),
            children: [
                {
                    path:"/",
                    name: routeNames.Home,
                    component: () => import("../pages/Home.vue"),
                },
                {
                    path:"/games/:gameId",
                    name: routeNames.GamePage,
                    component: () => import("../pages/GamePage.vue"),
                }
            ]
        }
    ]
})

export default router