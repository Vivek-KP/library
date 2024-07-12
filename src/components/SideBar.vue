<template>
    <nav class="page-sidebar">
      <div class="sidebar-header">
        <h1>ibfn</h1>
      </div>
      <div class="sidebar-menu nav-bar p-3   nav flex-column nav-pills">
        <div class="card icon-card pt-2 pb-2 mb-4 mt-4">
          <span class="material-symbols-outlined">
            home
          </span>
        </div>
        <div class="card icon-card pt-2 pb-2 mb-4">
          <span class="material-symbols-outlined">
            library_books
          </span>
        </div>
        <div class="card icon-card pt-2 pb-2">
          <span class="material-symbols-outlined">
            person
          </span>
        </div>
      </div>
    </nav>

</template>

<script>
export default {
  name: 'SideBar',
 
}
</script>

<style scoped>


.nav-bar {
  height: 100vh;
} 


element.style {
  transform: translate3d(0px, 0px, 0px);
}

.page-sidebar {
  width: 80px;
  background-color: #2b303b;
  position: fixed;
  bottom: 0;
  top: 0;
  right: auto;
  overflow: hidden;
}

.sidebar-header{
  background-color: #272b35;
  height: 60px;
}

.sidebar-menu {
  height: calc(100% - 50px);
  position: relative;
  width: 100%;
}

.material-symbols-outlined {
  color: white;
}

.icon-card {
  background-color: #1f222a;
  border-radius: 8px;

}

 
</style>
