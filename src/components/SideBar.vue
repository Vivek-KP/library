<template>
    <nav class="page-sidebar">
      <div class="sidebar-header">
        <h1>ibfn</h1>
      </div>
      <div class="sidebar-menu nav-bar p-3  nav flex-column nav-pills">
        <button class="btn btn-sm  mt-4" @click="pageNav('HOME')">
          <span class="material-symbols-outlined fs-2">
            home
          </span>
        </button>
        <button class="btn btn-sm  mt-5"  @click="pageNav('BOOK')">
          <span class="material-symbols-outlined fs-2">
            library_books
          </span>
        </button>
        <button class="btn btn-sm  mt-5"  @click="pageNav('MEMBER')">
          <span class="material-symbols-outlined fs-2">
            person
          </span>
        </button>
      </div>
    </nav>

</template>

<script>
export default {
  name: 'SideBar',

  methods:{
    pageNav(navType){
      this.$emit('navigate',navType)
    }
  }
 
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
  background-color: #1f1e2f;
  position: fixed;
  bottom: 0;
  top: 0;
  right: auto;
  overflow: hidden;
}

.sidebar-header{
  background-color: #1f1e2f;
  height: 60px;
}

.sidebar-menu {
  height: calc(100% - 50px);
  position: relative;
  width: 100%;
}



.icon-card {
  background-color: #1f222a;
  border-radius: 8px;

}

.material-symbols-outlined{
  color: #6f7480;
}

.material-symbols-outlined:hover{
  color: #4e74f3;
}

 
</style>
