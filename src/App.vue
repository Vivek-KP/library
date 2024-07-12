<template>
  <div>
    <SideBar />
    <div class="header">
    </div>
    <div class="page-content pt-4 ps-4 pe-4">
      <div class="ps-5">
        <div class=" ps-3  d-flex justify-content-end  mb-3">
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
            <div class="d-flex">
              <span class="material-symbols-outlined fs-5 pe-1">person_add</span>
              <span> Add Member</span>

            </div>
          </button>

          <!-- Modal -->
          <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <h5 class="modal-title" id="exampleModalLongTitle">Add New Member</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body border-0 ">
                  <form class=" w-100 p-2">
                    <div class="d-flex">
                      <span class="material-symbols-outlined pt-2 text-primary">
                        person
                      </span>
                      <input class="inputField w-100 border-1  border-end-0 border-start-0 border-top-0" id="name" type="text" v-model="userEmail"
                        placeholder="Enter name"><br>
                        </div>
                        <div class="d-flex mt-4">
                      <span class="material-symbols-outlined pt-2 text-primary">
                        email
                      </span>
                      <input class="inputField w-100 border-1 border-end-0 border-start-0 border-top-0" id="email" type="email" v-model="userEmail"
                        placeholder="Enter email address"><br>

                    </div>

                    </form>
                </div>
                <div class="modal-footer  border-0">
                  <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">
                    <div class="d-flex">
                      <span class="material-symbols-outlined fs-5">
                          close
                        </span>
                      <span>Close</span>
                    </div>
                    </button>
                  <button type="button" class="btn btn-sm btn-outline-primary"><div class="d-flex">
              <span class="material-symbols-outlined fs-5 pe-1">check</span>
              <span>Save</span>

            </div></button>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="card shadow-sm">
          <div class="card-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Sl no</th>
                  <th> Member Name</th>
                  <th>Email</th>
                  <th>Joined Date</th>
                  <th>Edit</th>
                  <th>Delete</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="i in 10" :key="i">
                  <td>{{ i }}</td>
                  <td>name</td>
                  <td>name@linways</td>
                  <td>20/11/22</td>
                  <td><a href="#" class="card-refresh" data-toggle="refresh"><span
                        class="material-symbols-outlined fs-5 text-black">
                        edit
                      </span></a></td>
                  <td><a href="#" class="card-close" data-toggle="close"><span
                        class="material-symbols-outlined fs-5 ps-1 text-danger">
                        delete
                      </span></a></td>
                </tr>
              </tbody>
            </table>

          </div>
          <!-- <div v-for="i in 10" :key="i" class="card mb-4 me-4" style="max-width: 18rem;">
            <div class="card-header">
              <div class="head-title">
                Header
              </div>
              <div class="card-controls pt-1">
                <ul>
                  <li><a href="#" class="card-refresh" data-toggle="refresh"><span
                        class="material-symbols-outlined fs-5 text-black">
                        edit
                      </span></a>
                  </li>
                  <li><a href="#" class="card-close" data-toggle="close"><span
                        class="material-symbols-outlined fs-5 ps-1 text-danger">
                        delete
                      </span></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body d-flex">
              <div class="d-flex justify-content-center align-items-center bg-primary rounded-circle user-icon-card me-3">
                <span class="material-symbols-outlined fs-3 text-light">
                  person
                </span>
              </div>
              <div class="d-flex flex-column align-items-start">
                <h6 class="m-0">VIVEK</h6>
                <p class="mb-0">vivek@gmail.com</p>
              </div>
            </div>
          </div> -->
          <!-- <div id="card-linear" class="card card-default">
            <div class="card-header  ">
              <div class="card-title">Portlet Title
              </div>
              <div class="card-controls">
                <ul>  
                  <li><a href="#" class="card-refresh" data-toggle="refresh"><span class="material-symbols-outlined">
                        edit
                      </span></a>
                  </li>
                  <li><a href="#" class="card-close" data-toggle="close"><span class="material-symbols-outlined">
                        delete
                      </span></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <h3>
                <span class="semi-bold">Linear</span> Progress
              </h3>
              <p>Click on the refresh icon to simulate an AJAX call and to see an animated progress bar indicator above
                the portlet. These progress bars come in seven dif!~ferent colors that are available in the Pages
                contextual color scheme.
              </p>
            </div>
          </div> -->

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'

export default {
  name: 'App',
  components: {
    SideBar
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

.card-controls {
  float: right;
  margin-top: -3px;

}

.head-title {
  float: left;
}

ul {
  margin: 0;
  padding: 0;
}

ul li {
  padding-left: 0px;
  display: inline-block;
  list-style: none;
  line-height: 0;
}

.card-body {
  float: right;
}

.user-icon-card {
  border-radius: 10px;
  width: 40px;
  height: 40px;
  background-color: #406ff3;
}

.inputField {
    border: none;
    border-bottom: 1px solid rgb(107, 107, 107);
    outline: none;
    font-size: 16px;


}

.inputField::placeholder{
  font-size: 14px;
  padding-left: 4px;
}
</style>
