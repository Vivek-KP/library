<template>

    <div class="d-flex justify-content-between flex-wrap col-md-12  mb-3">
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
            <button type="button" class="btn btn-primary btn-sm" @click="Slider('ADD')">
                <div class="d-flex">
                    <span class="material-symbols-outlined fs-5 pe-1">library_books</span>
                    <span> Add Book</span>

                </div>
            </button>
            <!-- Modal -->
            <BookModel :actionType="type" :showSlider="showSlider" :bookId="bookId" @onSave="onSave"
                @onClose="onClose" />
            <DeleteSlider :deleteSlider="deleteSlider" type="BOOK" :bookId="bookId" @on-close="onClose"
                @on-delete="onSave" />

        </div>

    </div>
    <div class="card p-2 shadow-sm">
        <div class="card ">
            <div class=" table-responsive" style="max-height: 70vh;">
                <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th class="td-style"><input type="checkbox" v-model="rowChecked"></th>
                            <th width="3%" class="td-style mobile-display-none">Sl no</th>
                            <th align="left" class="td-style" width="23%"> Title</th>
                            <th align="left" width="15%" class="td-style">Author</th>
                            <th class="td-style">Publication Date</th>
                            <th class="td-style">Publisher</th>
                            <th class="td-style">Rating</th>
                            <th class="td-style">Stock</th>
                            <th class="td-style">Update</th>
                            <th class="td-style">Delete</th>
                        </tr>
                    </thead>
                    <tbody v-if="filterBook.length">
                        <BookRow v-for="(book, index) in filterBook" :row-checked="rowChecked" :key="book.id" :index="index" :book="book"
                            @onEdit="onEdit" @onDelete="decideDelete" @onRowSeleted ="onRowSeleted"/>
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
import { computed, onMounted, ref, watch } from 'vue';
import BookModel from '../sliderModel/BookModel.vue'
import BookRow from './BookRow.vue'
import axios from 'axios';
import DeleteSlider from '../sliderModel/BookDeleteSlider.vue'


const type = ref('')
const showSlider = ref(false)
const bookId = ref(0)
const bookList = ref([])
const searchBook = ref("")
const rowChecked = ref(false)
const idGoingToDelete = ref([])

const filterBook = computed({
    get() {
        if (searchBook.value != '') {

            return bookList.value.filter(book => (book.title.toLowerCase().includes(searchBook.value) || book.author.toLowerCase().includes(searchBook.value)))
        } else {
            return bookList.value

        }
    }

})


const getAllBooks = () => {
    console.log("mlkjn");
    axios.get(`${process.env.VUE_APP_API_BASE_URL}/book`).then((response) => {
        const responseData = response.data
        bookList.value = responseData.data
    }).catch(() => {

    })

}

const Slider = (value) => {
    bookId.value = 0
    showSlider.value = true
    type.value = value
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

const onRowSeleted = (bookId,selected)=>{
    console.log(bookId,selected);
    
    if(selected && !rowChecked.value){
        idGoingToDelete.value.push(bookId)
        console.log(idGoingToDelete.value);
        
    }else{
        const index = idGoingToDelete.value.indexOf(bookId)
        if(index!== -1){
            idGoingToDelete.value.splice(index,1)

        }
    }
}

watch(()=>rowChecked.value , (newVal)=>{
    console.log("watch this" ,newVal);
    
    if(newVal){
        bookList.value.forEach((book)=>{
            if(!idGoingToDelete.value.includes(book.id)){
                idGoingToDelete.value.push(book.id)
            }
          
        })
        console.log(idGoingToDelete.value);
        
    }else{

    idGoingToDelete.value = []
    }

})

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

.input-container {
    border: 1px solid #6d6d6e;
    border-left: 0;
    border-right: 0;
    border-top: 0;
}
</style>