import { createRouter, createWebHistory } from 'vue-router';
import DashboardHome from '../src/components/DashboardHome.vue';
import MemberList from '../src/components/MemberList.vue';
import BookList from './components/BookList.vue';

const routes = [
    { path: '/', name: 'HOME', component: DashboardHome },
    { path: '/members', name: 'MEMBER', component: MemberList },
    { path: '/books', name: 'BOOK', component: BookList }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  export default router;