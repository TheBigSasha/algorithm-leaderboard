import Vue from "vue";
import VueRouter from "vue-router";
import LeaderboardView from "../views/LeaderboardView";
import UserView from "../views/UserView";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Leaderboard",
        component: LeaderboardView,
        props: {test:4}
    },
    {
        path: "/:test",
        name: "Custom Leaderboard",
        component: LeaderboardView,
        props: true
    },
    {
        path: "/history/:user",
        name: "My Assignment",
        component: UserView,
        props: true
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
