<template>
    <div class="ps-5">
        <div class="d-flex justify-content-between  mb-3">
            <div class="d-flex input-container">
                <span class="material-symbols-outlined font-color p-1">search</span>
                <input class=" border-0 search-field text-white" placeholder=" Search Book or Author " type="text"
                    v-model="searchBook">
            </div>
            <div class=" ps-3  d-flex justify-content-end ">
                <button type="button" class="btn btn-success btn-sm me-2" @click="Slider('IMPORT')">
                    <div class="d-flex">
                        <span class="material-symbols-outlined fs-5 pe-1">download</span>
                        <span> Import Book</span>

                    </div>
                </button>
                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" @click="Slider('ADD')"
                    data-bs-target="#bookModel">
                    <div class="d-flex">
                        <span class="material-symbols-outlined fs-5 pe-1">library_books</span>
                        <span> Add Book</span>

                    </div>
                </button>
                <!-- Modal -->
                <BookModel :type="type" :showSlider="showSlider" :bookId="bookId" @onSave="onSave" @onClose="onClose" />

            </div>

        </div>
        <div class="card shadow-sm">
            <div class="card-body table-responsive">
                <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th class="td-style">Sl no</th>
                            <th class="td-style" width="19%"> Title</th>
                            <th class="td-style">Author</th>
                            <th class="td-style">Publication Date</th>
                            <th class="td-style">Publisher</th>
                            <th class="td-style">Rating</th>
                            <th class="td-style">Stock</th>
                            <th class="td-style">Update</th>
                            <th class="td-style">Delete</th>
                        </tr>
                    </thead>
                    <tbody v-if="filterBook.length">
                        <BookRow v-for="(book, index) in filterBook" :key="book.id" :index="index" :book="book"
                            @onEdit="onEdit" @onDelete="decideDelete" />
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td align="center" class="p-5 text-secondary td-style" colspan="10"><span
                                    class="material-symbols-outlined">
                                    hourglass_empty
                                </span>
                                <h5>No books to show try importing or add one</h5>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>

    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import BookModel from '../sliderModel/BookModel.vue'
import BookRow from './BookRow.vue'
import axios from 'axios';

const type = ref('')
const showSlider = ref(false)
const bookId = ref(0)
const bookList = ref([])
const searchBook = ref("")

const filterBook = computed({
    get(){
      if(searchBook.value != ''){

        return bookList.value.filter(book=>(book.title.toLowerCase().includes(searchBook.value) || book.author.toLowerCase().includes(searchBook.value)))
      }else{
        return bookList.value

      }
    }
  
})


const getAllBooks = () => {
    console.log("mlkjn");
    axios.get('http://127.0.0.1:5000/book').then((response) => {
        const responseData = response.data
        bookList.value = responseData.data
    }).catch(() => {

    })

}

const Slider = (value) => {
    bookId.value = 0
    type.value = value
    showSlider.value = true
}

const onClose = () => {
    showSlider.value = false
    deleteSlider.value = false
    bookId.value = ''

}

const onSave = () => {
    getAllBooks()
    onClose()

}

const onEdit = (book_Id) => {
    showSlider.value = true
    bookId.value = book_Id
    type.value = 'EDIT'

}

const deleteSlider = ref(false)

const decideDelete = (book_Id) => {
    deleteSlider.value = true
    bookId.value = book_Id

}

onMounted(getAllBooks)
</script>

<style scoped>
.update-stock-button:hover {
    color: white !important;
}

.card {
    background-color: #1f1e2f;
    border: none;
}

.input-container{
  border: 1px solid  #6d6d6e;
  border-left: 0;
  border-right: 0;
  border-top: 0;
}
</style>