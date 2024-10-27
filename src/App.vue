<template>
  <div>
    <Transition name="slide">
      <SideBar @navigate="navigation" v-if="isSidebarVisible" />

    </Transition>
    <div class="header d-flex justify-content-between" :class="contentClass">
      <div>
        <button class="btn" @click="toggleSidebar"
          :style="{ transform: isSidebarVisible ? 'rotate(0deg)' : 'rotate(180deg)' }"><span
            class="material-symbols-outlined font-color">
            arrow_back
          </span></button>
      </div>
      <div class="pt-3 pe-3">
        <span class="material-symbols-outlined fs-1 " style="color: #4e74f3;">
          account_circle
        </span>

      </div>
    </div>
    <div :class="contentClass" class="view-container">
      <router-view />
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import SideBar from './components/SideBar.vue'
import { computed, onMounted, ref } from 'vue';

const isSidebarVisible = ref(true)
const router = useRouter();
const navigation = (route) => {
  router.push({ name: route });
}

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}

const contentClass = computed({
  get() {
    return isSidebarVisible.value ? 'content-shifted' : 'content-full'

  }
})

onMounted(() => {
  if (window.innerWidth <= 768) {
    isSidebarVisible.value = false;
  }

})


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
  position: sticky;
  /* Make it sticky */
  top: 0;
  /* Stick it to the top */
  z-index: 1000;
  background-color: #171626;

}



.update-stock-button:hover {
  color: white !important;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter,
.slide-leave-to

/* .slide-leave-active in <2.1.8 */
  {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave

/* initial state when appearing */
  {
  transform: translateX(0);
  opacity: 1;
}

.content-full {
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

.content-shifted {
  margin-left: 80px;
  /* Adjust to the width of the sidebar */
  transition: margin-left 0.3s ease;
}

.btn {
  transition: transform 0.9s ease;
}

.view-container {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 30px;
}
</style>
