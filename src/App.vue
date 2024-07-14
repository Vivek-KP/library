<template>
  <div>
    <SideBar @navigate="navigation"/>
    <div class="header">
    </div>
    <div class="page-content pt-4 ps-4 pe-4">
      <component :is="component"/>
    </div>

  </div>
</template>

<script>
import { markRaw } from 'vue';
import SideBar from './components/SideBar.vue'
import MemberList from './components/MemberList.vue'
import BookList from "./components/BookList.vue";
import DashboardHome from './components/DashboardHome.vue';

export default {
  name: 'App',
  components: {
    SideBar,
    MemberList,
    DashboardHome,
    BookList

  },
  data(){
    return{
      component: markRaw(DashboardHome),
      componentsAvailable: {
        DashboardHome: markRaw(DashboardHome),
        MemberList: markRaw(MemberList),
        BookList: markRaw(BookList)
      },
    }
  },
  methods:{
    navigation(type){
      switch (type) {
        case 'BOOK':
          this.component = this.componentsAvailable.BookList
          break;
        case 'MEMBER':
          this.component = this.componentsAvailable.MemberList
          break;
        default:
        this.component = this.componentsAvailable.DashboardHome
          break;
      }
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


.header {
  border-bottom: 1px solid rgb(221, 221, 221);
  height: 60px;
  margin-left: 80px;
  position: sticky;
  /* Make it sticky */
  top: 0;
  /* Stick it to the top */
  z-index: 1000;
  background-color: white
}

.page-content {
  margin-left: 80px;
}

.update-stock-button:hover{
color: white !important;
}
</style>
