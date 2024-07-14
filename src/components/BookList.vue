<template>
    <div class="ps-5">
        <div class=" ps-3  d-flex justify-content-end  mb-3">
            <button type="button" class="btn btn-success btn-sm me-2" data-bs-toggle="modal"
                data-bs-target="#bookModel" @click="type='IMPORT'">
                <div class="d-flex">
                    <span class="material-symbols-outlined fs-5 pe-1">download</span>
                    <span> Import Book</span>

                </div>
            </button>
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" @click="type='CREATE'"
                data-bs-target="#bookModel">
                <div class="d-flex">
                    <span class="material-symbols-outlined fs-5 pe-1">library_books</span>
                    <span> Add Book</span>

                </div>
            </button>
            <!-- Modal -->
            <BookModel :type="type"/>

        </div>
        <div class="card shadow-sm">
            <div class="card-body">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Sl no</th>
                            <th width="11%"> Title</th>
                            <th>Author</th>
                            <th>Publication Date</th>
                            <th>Publisher</th>
                            <th>Rating</th>
                            <th>Stock</th>
                            <th>Update Stock</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in 10" :key="i">
                            <td>{{ i }}</td>
                            <td>name</td>
                            <td>name@linways</td>
                            <td>20/11/22</td>
                            <td>DC Books</td>
                            <td>3.5</td>
                            <td>10</td>
                            <td><a href="#" class="card-refresh" data-toggle="refresh"><span
                                        class="material-symbols-outlined update-stock-button fs-5 text-success btn btn-outline-success btn-sm ps-2 pe-2 pt-0 pb-0">
                                        add
                                    </span></a>
                                <a href="#" class="card-refresh ps-1" data-toggle="refresh"><span
                                        class="material-symbols-outlined fs-5 update-stock-button text-danger btn btn-outline-danger btn-sm ps-2 pe-2 pt-0 pb-0">
                                        remove
                                    </span></a>
                            </td>
                            <td><a href="#" class="card-refresh" data-toggle="refresh"><span
                                        class="material-symbols-outlined fs-5 text-primary">
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

        </div>

    </div>
</template>

<script>
import BookModel from '../sliderModel/BookModel.vue'

export default {
  name: 'BookList',
  components:
  {BookModel
  },
  data(){
    return{
        type:''
    }
  }
}
</script>

<style>
.update-stock-button:hover{
color: white !important;
}
</style>