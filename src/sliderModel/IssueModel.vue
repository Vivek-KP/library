<template>
    <div ref="modal" class="modal fade " data-bs-backdrop="static" id="bookModel" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-color">
                <form @submit.prevent="decideProcess">
                    <div class="modal-header border-0">
                        <h5 class="modal-title font-color ps-2">{{ type }} BOOK</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close" @click="onClose"></button>
                    </div>
                    <div class="modal-body border-0 ">
                        <form class=" w-100 pe-2 ps-2">
                            <div class="d-flex">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    menu_book
                                </span>
                                <select class=" form-select text-white form-control w-100 border-1 input-field"
                                    id="name" type="text" v-model="issueBookDetails.book.id" placeholder="Select Book">
                                    <option value="" disabled selected>Select Book</option>
                                    <option :title="book.title" v-for="book in bookList" :key="book.id"
                                        :disabled="book.stock == 0 ? true : false" :value="book.id">{{ truncate(book.title) }}
                                    </option>
                                </select><br>
                            </div>
                            <span v-if="v$.issueBookDetails.book.id.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* Select a book</p>
                            </span>
                            <div class="d-flex mt-4">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    person
                                </span>
                                <select class=" form-select text-white form-control w-100 border-1 input-field"
                                    id="name" type="text" v-model="issueBookDetails.member.id"
                                    placeholder="Select Book">
                                    <option value="" disabled selected>Select membr</option>
                                    <option v-for="member in memberList" :key="member.id" :value="member.id">{{
                                        member.name }}</option>
                                </select><br>
                            </div>
                            <span v-if="v$.issueBookDetails.member.id.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* Select a member</p>
                            </span>
                            <div class="d-flex mt-4" v-if="type !== 'IMPORT'">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    event
                                </span>
                                <Flatpicker class="text-white form-control w-100 border-1 input-field"
                                    v-model="issueBookDetails.issueDate" :config="config"
                                    placeholder="Enter Issueing date"></Flatpicker><br>
                            </div>
                            <span v-if="v$.issueBookDetails.issueDate.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* Pick Issued Date</p>
                            </span>
                            <div class="d-flex mt-4" v-if="type !== 'IMPORT'">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    event_upcoming
                                </span>
                                <Flatpicker class="text-white form-control w-100 border-1 input-field"
                                    v-model="issueBookDetails.returnDate" :config="config"
                                    placeholder="Enter Return date"></Flatpicker><br>
                            </div>
                            <span v-if="v$.issueBookDetails.returnDate.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* Pick a Return Date</p>
                            </span>
                        </form>
                    </div>
                    <div class="modal-footer  border-0">
                        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal" @click="onClose">
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
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';

const props = defineProps({
    bookId: Number,
    showSlider: {
        Boolean,
        default: false
    },
    issueType: String


})
const emit = defineEmits(['onClose', 'onSave'])

let modalInstance = ref(null)
// const modalInstanc = ref(null)
const issueBookDetails = ref({
    member: { id: '' },
    book: { id: '' },
    issueDate: '',
    returnDate: '',
    id: '',
    fee: 0
})
const config = ref({
    altFormat: 'M j, Y',
    dateFormat: 'd-m-Y',
});

const modal = ref(null)
const rules = {
    issueBookDetails: {
        book: {
            id: { required }
        },
        member: {
            id: { required }
        },
        issueDate: { required },
        returnDate: { required },
    }

}

const v$ = useVuelidate(rules, { issueBookDetails })

onMounted(() => {
    modalInstance.value = new bootstrap.Modal(modal.value);

})
const memberList = ref([])
const getAllMembers = () => {
    console.log('API Base URL:', process.env.VUE_APP_API_BASE_URL);
    axios.get(`${process.env.VUE_APP_API_BASE_URL}/member`).then((response) => {
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
    axios.get(`${process.env.VUE_APP_API_BASE_URL}/book`).then((response) => {
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
        const params = {
            id: issueBookDetails.value.id,
            bookId: issueBookDetails.value.book.id,
            memberId: issueBookDetails.value.member.id,
            dateOfIssue: issueBookDetails.value.issueDate,
            returnDate: issueBookDetails.value.returnDate
        };
        if (props.bookId) {
            updateIssuedDetails(params);
        } else {
            cretaeBookIssue(params);
        }
    } else {
        return false
    }
}

const updateIssuedDetails = (params) => {
    axios.put(`${process.env.VUE_APP_API_BASE_URL}/book`, params).then((response) => {
        const responseData = response.data
        if (responseData.status === 'SUCCESS') {
            toast.success('Book Issued Successfully');
            emit('onSave');
        } else {
            toast.info(responseData.message);
        }
        onClose();
    }).catch(() => {
        toast.error("Something went wrong", {
            timeout: 500,
            theme: 'colored'
        });
    });
}
const cretaeBookIssue = (params) => {
    console.log(params);

    axios.post(`${process.env.VUE_APP_API_BASE_URL}/issue`, params).then((response) => {
        const responseData = response.data
        if (responseData.status === 'SUCCESS') {
            toast.success('Book Issued Successfully');
            emit('onSave');
        } else {
            toast.info(responseData.message);
        }
        onClose();
    }).catch(() => {
        toast.error("Something went wrong", {
            timeout: 500,
            theme: 'colored'
        });
    });
}
const onClose = () => {
    issueBookDetails.value.id = ""
    issueBookDetails.value.book.id = ""
    issueBookDetails.value.member.id = ""
    issueBookDetails.value.issueDate = ""
    issueBookDetails.value.returnDate
    v$.value.$reset();

    emit('onClose')
    modalInstance.value.hide();
}

const truncate = (text) => {
    if (text.length >= 50) {
        return text.slice(0, 50) + '...'
    } else {
        return text
    }
}
</script>

<style scoped></style>