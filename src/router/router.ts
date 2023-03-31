import { createRouter, createWebHistory} from "vue-router"
import { routeNames } from "./routeNames"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/auth",
            name: routeNames.Auth,
            component: {template: "<h1>test</h1>"},
            children: [
                
            ]
        },
        {
            path: "/layout",
            name: routeNames.Layout,
            component: () => import("../pages/Main.vue"),
            redirect: routeNames.Home,
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
                },
                {
                    path: "/profile",
                    name: routeNames.Profile,
                    component: () => import("../pages/Profile.vue"),
                    redirect: "/profile/games",
                    children: [
                        {
                            path: "/profile/games",
                            name: routeNames.UserGames,
                            component: () => import("../components/UserGames.vue")
                        }
                    ]
                }
            ]
        }
    ]
})

export default router