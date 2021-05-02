import Vue from "vue";
import VueRouter from "vue-router";
import LeaderboardView from "../views/LeaderboardView";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Board",
        component: LeaderboardView,
        props: {test:4}
    },
    {
        path: "/:test",
        name: "Board",
        component: LeaderboardView,
        props: true
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
