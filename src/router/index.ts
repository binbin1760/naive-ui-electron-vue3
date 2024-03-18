import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
    RouterHistory,
    RouterOptions,
} from "vue-router";

import { App } from "vue";

interface CustomRouterOptions extends RouterOptions {
    constantRoute?: RouteRecordRaw[];
}
const constantRoutes: Array<RouteRecordRaw> = [
    // {
    //     path: "/home",
    //     name: 'home-page',
    //     meta: {
    //         name: '主页'
    //     },
    //     component: () => import('@/views/home/index.vue')
    // },
    {
        path: '/work',
        name: 'work-page',
        meta: {
            name: '工作页'
        },
        component: () => import('@/views/work/index.vue')
    },
    {
        path: '/',
        meta: {
            name: '重定向中'
        },
        redirect: '/work'
    }
]


const routerHistory: RouterHistory = createWebHistory();
const customRouterOptions: CustomRouterOptions = {
    history: routerHistory,
    routes: constantRoutes,
};
const router = createRouter(customRouterOptions)

export function setupRouter(app: App) {
    app.use(router);
}

export default router