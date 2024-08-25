<template>
  <div>
    <SideBar @navigate="navigation" />
    <div class="header d-flex justify-content-between">
      <div>
      
      </div>
      <div class="pt-3 pe-3">
        <span class="material-symbols-outlined fs-1 " style="color: #4e74f3;">
          account_circle
        </span>
      
      </div>
    </div>
    <div class="page-content mt-4 pt-4 ps-4 pe-4">
      <router-view />
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import SideBar from './components/SideBar.vue'

const router = useRouter();
const navigation = (route) => {
  router.push({ name: route });
  // switch (type) {
  //   case 'BOOK':
  //     this.component = this.componentsAvailable.BookList
  //     break;
  //   case 'MEMBER':
  //     this.component = this.componentsAvailable.MemberList
  //     break;
  //   default:
  //   this.component = this.componentsAvailable.DashboardHome
  //     break;
  // }
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
  /* border-bottom: 1px solid rgb(221, 221, 221); */
  height: 60px;
  margin-left: 80px;
  position: sticky;
  /* Make it sticky */
  top: 0;
  /* Stick it to the top */
  z-index: 1000;
  background-color: #171626
}

.page-content {
  margin-left: 80px;
}

.update-stock-button:hover {
  color: white !important;
}


</style>
