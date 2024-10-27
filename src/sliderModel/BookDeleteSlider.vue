<template>
    <div ref="deleteModel" class="modal fade" data-bs-backdrop="static" id="exampleModal" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-color">
                <div class="modal-header ">
                    <h5 class="modal-title font-color fs-5" id="exampleModalLabel">Delete Book</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"
                        @click="onClose"></button>
                </div>
                <div class="modal-body font-color align-self-baseline pb-0">
                    You are going to delete a Book. Are you sure?
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-sm btn-success" data-bs-dismiss="modal" @click="onClose">
                        <div class="d-flex">
                            <span class="material-symbols-outlined fs-5">
                                close
                            </span>
                            <span>Close</span>
                        </div>
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" @click="onDelete">
                        <div class="d-flex">
                            <span class="material-symbols-outlined fs-5 pe-1">delete</span>
                            <span>Delete</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min';
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
import { toast } from 'vue3-toastify'


const props = defineProps({
    type: String,
    bookId: Number,
    deleteSlider: {
        Boolean,
        default: false
    }

})

const emit = defineEmits(['onClose', 'onDelete'])
let modalInstance = ref(null)
const deleteModel = ref(null)

watch(() => props.deleteSlider, (newVal) => {
    if (newVal) {
        console.log("true");
        modalInstance.value.show();
    } else {
        console.log("false");
        modalInstance.value.hide();
    }
});

const onClose = () => {
    modalInstance.value.hide();
    emit('onClose')
}

const onDelete = () => {
    axios.delete(`${process.env.VUE_APP_API_BASE_URL}/book?id=${props.bookId}`).then((response) => {
        const responseData = response.data
        if (responseData.status === 'SUCCESS') {
            emit('onDelete')
            toast.success('Book Deleted Successfully');
        } else {
            toast.info(responseData.message);
        }
    }).catch(() => {
        toast.error('Something went wrong');
    })
}
onMounted(() => {
    modalInstance.value = new bootstrapBundleMin.Modal(deleteModel.value);

})
</script>