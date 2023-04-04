import { createRouter, createWebHistory } from "vue-router"
import { routeNames } from "./routeNames"
import { auth } from "../firebase/config"
import { onAuthStateChanged } from "firebase/auth"
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/auth",
            name: routeNames.Auth,
            component: () => import("../pages/Auth.vue"),
            meta: {
                requiresLoggedOut: true
            },
            redirect: {name: routeNames.Login},
            children: [
                {
                    path: "/login",
                    name: routeNames.Login,
                    component: () => import("../pages/Login.vue")
                },
                {
                    path: "/register",
                    name: routeNames.Register,
                    component: () => import("../pages/Register.vue")
                }
            ]
        },
        {
            path: "/layout",
            name: routeNames.Layout,
            component: () => import("../pages/Main.vue"),
            redirect: routeNames.Home,
            children: [
                {
                    path: "/",
                    name: routeNames.Home,
                    component: () => import("../pages/Home.vue"),
                },
                {
                    path: "/games/:gameId",
                    name: routeNames.GamePage,
                    component: () => import("../pages/GamePage.vue"),
                },
                {
                    path: "/profile",
                    name: routeNames.Profile,
                    component: () => import("../pages/Profile.vue"),
                    meta: {
                        requiresAuth: true
                    },
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

function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                unsubscribe()
                resolve(user)
            },
            reject
        )
    })
}

router.beforeEach(async (to) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const requiresLoggedOut = to.matched.some((record) => record.meta.requiresLoggedOut)
    if (requiresAuth && !(await getCurrentUser())) {
        return '/'
    }
    else if (requiresLoggedOut && (await getCurrentUser())) {
        return '/'
    }
})

export default router