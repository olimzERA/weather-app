import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/RegisterPage.vue';
import Login from '../views/LoginPage.vue'; 
import App from '../App.vue'; 
import Error from '../components/Error.vue';



const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: App, 
  },
  {
    path: '/error',
    name: 'Error',
    component: Error,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

