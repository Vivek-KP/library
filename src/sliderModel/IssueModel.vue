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
                                <select class=" form-select text-white form-control w-100 border-1 input-field" id="name" type="text"
                                v-model="issueeBookDetails.book" placeholder="Select Book">
                                <option value="" disabled selected>Select Book</option>
                                    <option  v-for="book in bookList" :key="book.id" :value="book.id">{{ book.title }}</option>
                                </select><br>
                            </div>
                            <!-- <span v-if="v$.issueeBookDetails.book.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* Book is required</p>
                            </span> -->
                            <div class="d-flex mt-4">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    person
                                </span>
                                <select class=" form-select text-white form-control w-100 border-1 input-field" id="name" type="text"
                                    v-model="issueeBookDetails.member" placeholder="Select Book">
                                    <option value="" disabled selected>Select Member</option>
                                    <option  v-for="member in memberList" :key="member.id" :value="member.id">{{ member.name }}</option>
                                </select><br>
                            </div>
                            <!-- <span v-if="v$.issueeBookDetails.member.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* Member is required</p>
                            </span> -->
                            <div class="d-flex mt-4" v-if="type !== 'IMPORT'">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    event
                                </span>
                                <Flatpicker class="text-white form-control w-100 border-1 input-field" 
                                v-model="issueeBookDetails.issueDate" :config="config" placeholder="Enter Issueing date" ></Flatpicker><br>
                            </div>
                            <div class="d-flex mt-4" v-if="type !== 'IMPORT'">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    event_upcoming
                                </span>
                                <Flatpicker class="text-white form-control w-100 border-1 input-field" 
                                v-model="issueeBookDetails.returnDate" :config="config" placeholder="Enter Return date" ></Flatpicker><br>
                            </div>
   
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
import { defineProps, defineEmits, ref, watch, onMounted } from 'vue';
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
const issueeBookDetails = ref({
    member: '',
    book : '',
    issueDate :   '',
    returnDate : ''
})
const config = ref({
        altFormat: 'M j, Y',
        dateFormat: 'd-m-Y',       
    });

const modal = ref(null)
const rules = {
    issueeBookDetails: {
        book:  { required },
    author :  { required },
    issueDate :  { required },
    returnDate :  { required },
    }

}

const v$ = useVuelidate(rules, { issueeBookDetails })

onMounted(() => {
    modalInstance.value = new bootstrap.Modal(modal.value);

})
const memberList = ref([])
const getAllMembers = () => {
  console.log("mlkjn");
  axios.get('http://127.0.0.1:5000/member').then((response) => {
    const responseData = response.data
    memberList.value = responseData.data
  }).catch(() => {

  })

}
onMounted(getAllMembers)

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

const bookList = ref([])
const getAllbooks = () => {
    axios.get(`http://127.0.0.1:5000/book`).then((response) => {
        const responseData = response.data
        bookList.value = responseData.data
    }).catch(() => {

    })
}

onMounted(getAllbooks)

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
        id: issueeBookDetails.value.id,
        name: issueeBookDetails.value.name,
        email: issueeBookDetails.value.email,
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
    axios.post('http://127.0.0.1:5000/book', issueeBookDetails.value).then((response) => {
        console.log(response);
        onClose();
        emit('onSave');
    }).catch(() => {
    });
}
const onClose = () => {
    issueeBookDetails.value = {}
    v$.value.$reset();
    emit('onClose')
    modalInstance.value.hide();
}
</script>

<style scoped>



</style>