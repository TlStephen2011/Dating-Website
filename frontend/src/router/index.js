import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard";
import Index from "@/views/Index";
import VerifyToken from "@/views/VerifyToken";
import Sorry from "@/views/Sorry";
import Profile from "@/views/Profile";
import Messages from "@/views/Messages";
import MyProfile from "@/views/MyProfile";
import Forgot from "@/views/Forgot";
import Reset from "@/views/Reset";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: '/token/:username',
    name: 'VerifyToken',
    component: VerifyToken
  },
  {
    path: '*',
    name: 'Sorry',
    component: Sorry
  },
  {
    path: "/profile/me",
    name: "MyProfile",
    component: MyProfile
  },
  {
    path: "/profile/:user",
    name: "Profile",
    component: Profile
  },
  {
    path: "/messages",
    name: "Messages",
    component: Messages
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: Forgot
  },
  {
    path: "/reset/:username",
    name: "Reset",
    component: Reset
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
