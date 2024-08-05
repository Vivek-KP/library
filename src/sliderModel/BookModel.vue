<template>
    <div ref="modal" class="modal fade " data-bs-backdrop="static" id="bookModel" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-color">
                <form @submit.prevent="decideProcess">
                    <div class="modal-header border-0">
                        <h5 class="modal-title font-color ps-2">{{ type }} BOOK</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"  @click="onClose"></button>
                    </div>
                    <div class="modal-body border-0 ">
                        <form class=" w-100 pe-2 ps-2">
                            <div class="d-flex">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    menu_book
                                </span>
                                <input class="text-white form-control w-100 border-1 input-field" id="name" type="text"
                                    v-model="book.title" placeholder="Enter title"><br>
                            </div>
                            <span v-if="v$.book.title.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* Title is required</p>
                            </span>
                            <div class="d-flex mt-4">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    person
                                </span>
                                <input class="text-white form-control w-100 border-1 input-field" id="name" type="text"
                                    v-model="book.author" placeholder="Enter author"><br>
                            </div>
                            <span v-if="v$.book.author.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* Author is required</p>
                            </span>
                            <div class="d-flex mt-4" v-if="type !== 'IMPORT'">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    calendar_month
                                </span>
                                <Flatpicker class="text-white form-control w-100 border-1 input-field" 
                                v-model="book.publicationDate" :config="config" placeholder="Enter publication date" ></Flatpicker><br>
                            </div>
                            <div class="d-flex mt-4">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    publish
                                </span>
                                <input class="text-white form-control w-100 border-1 input-field" id="email" type="text"
                                    v-model="book.publisher" placeholder="Enter publisher"><br>

                            </div>
                            <div class="d-flex mt-4">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    book
                                </span>
                                <input class="text-white form-control w-100 border-1 input-field" id="email" type="text"
                                    v-model="book.isbn" placeholder="Enter isbn"><br>

                            </div>
                            <span v-if="v$.book.isbn.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* ISBN is required</p>
                            </span>
                            <div class="d-flex mt-4" v-if="type === 'IMPORT'">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    pin
                                </span>
                                <input class="text-white form-control w-100 border-1 input-field" id="email" type="text"
                                    v-model="userEmail" placeholder="Enter no. of books want to import"><br>

                            </div>
                            <div class="d-flex mt-4" v-if="type !== 'IMPORT'">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    star_half
                                </span>
                                <input class="text-white form-control w-100 border-1 input-field" id="email" type="number"
                                    v-model="book.averageRating" placeholder="Enter Rating"><br>

                            </div>
                            <div class="d-flex mt-4" v-if="type !== 'IMPORT'">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    stacks
                                </span>
                                <input class="text-white form-control w-100 border-1 input-field" id="email" type="number"
                                    v-model="book.stock" placeholder="Enter stock"><br>
                            </div>
                            <span v-if="v$.book.stock.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* Stock is required</p>
                            </span>
                        </form>
                    </div>
                    <div class="modal-footer  border-0">
                        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"  @click="onClose">
                            <div class="d-flex">
                                <span class="material-symbols-outlined fs-5">
                                    close
                                </span>
                                <span>Close</span>
                            </div>
                        </button>
                        <button type="submit" class="btn btn-sm btn-primary">
                            <div class="d-flex">
                                <span class="material-symbols-outlined fs-5 pe-1">check</span>
                                <span>Save</span>

                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import Flatpicker from 'vue-flatpickr-component'
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const props = defineProps({
    type: String,
    bookId: Number,
    showSlider: {
        Boolean,
        default: false
    }

})
const emit = defineEmits(['onClose', 'onSave'])

let modalInstance = ref(null)
// const modalInstanc = ref(null)
const book = ref({
    title: '',
    author : '',
    averageRating :  '',
    isbn :  '',
    numPages : 0,
    stock : '',
    publicationDate :   '',
    publisher : ''
})
const config = ref({
        altFormat: 'M j, Y',
        dateFormat: 'd-m-Y',       
    });

const modal = ref(null)
const rules = {
    book: {
    title:  { required },
    author :  { required },
    isbn :  { required },
    stock :  { required },
    }

}

const v$ = useVuelidate(rules, { book })

onMounted(() => {
    modalInstance.value = new bootstrap.Modal(modal.value);

}),

    watch(() => props.showSlider, (newVal) => {
        if (newVal) {
            console.log("true");
            modalInstance.value.show();
        } else {
            console.log("false");
            // modalInstance.value = new bootstrapBundleMin.Modal(modal.value);
            modalInstance.value.hide();
        }
    });

watch(() => props.bookId, () => {
    if (props.bookId > 0 && props.type == 'EDIT') {
        getAllbooks()

    }
})



// const v$ = useVuelidate(rules, { book })
const getAllbooks = () => {
    axios.get(`http://127.0.0.1:5000/book?id=${props.bookId}`).then((response) => {
        const responseData = response.data
        book.value = responseData.data
    }).catch(() => {

    })
}

const decideProcess = () => {
    console.log("yhuhbjbjhb");
    v$.value.$touch()
    if (!v$.value.$invalid) {
        if (props.bookId) {
            updateMeber();
        } else {
            createbook();
        }
    } else {
        return false
    }
}

const updateMeber = () => {
    const params = {
        id: book.value.id,
        name: book.value.name,
        email: book.value.email,
        fee: 0
    };
    axios.put('http://127.0.0.1:5000/book', params).then((response) => {
        console.log(response);
        onClose();
        emit('onSave');
    }).catch(() => {
    });
}
const createbook = () => {
    axios.post('http://127.0.0.1:5000/book', book.value).then((response) => {
        console.log(response);
        onClose();
        emit('onSave');
    }).catch(() => {
    });
}
const onClose = () => {
    book.value = {}
    v$.value.$reset();
    emit('onClose')
    modalInstance.value.hide();
}
</script>

<style scoped>



</style>