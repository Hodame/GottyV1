import { createRouter, createWebHashHistory} from "vue-router"
import { routeNames } from "./routeNames"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/auth",
            name: routeNames.Auth,
        },
        {
            path: "/layout",
            name: routeNames.Layout,
            component: () => import("../pages/Main.vue"),
            redirect: { name: routeNames.Home },
            children: [
                {
                    path:"/",
                    name: routeNames.Home,
                    component: () => import("../pages/Home.vue"),
                }
            ]
        }
    ]
})

export default router