<template>
    <div ref="returnModel" class="modal fade" data-bs-backdrop="static" id="exampleModal" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-color">
                <div class="modal-header ">
                    <h5 class="modal-title font-color fs-5" id="exampleModalLabel">Return Book</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"
                        @click="onClose"></button>
                </div>
                <div class="modal-body font-color align-self-baseline pb-0">
                    <span v-if="assignedFee > 0">
                        Member has a rental fee of amount {{ assignedFee }}/- Rupees.Is the payment successfull?
                    </span>
                    <span v-else>
                        Are you sure want to continue?
                    </span>
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
                    <button type="button" class="btn btn-sm btn-primary" @click="onDelete">
                        <div v-if="assignedFee > 0" class="d-flex">
                            <span class="material-symbols-outlined fs-5 pe-1">check</span>
                            <span>Paid</span>
                        </div>
                        <div v-else>
                            <div class="d-flex">
                                <span class="material-symbols-outlined fs-5 pe-1">autorenew</span>
                                <span>Return</span>
                            </div>
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
    issueId: Number,
    returnSlider: {
        Boolean,
        default: false
    },
    assignedFee: Number

})

const emit = defineEmits(['onClose', 'onDelete'])
let modalInstance = ref(null)
const returnModel = ref(null)

watch(() => props.returnSlider, (newVal) => {
    if (newVal) {
        modalInstance.value.show();
    } else {
        modalInstance.value.hide();
    }
});

const onClose = () => {
    modalInstance.value.hide();
    emit('onClose')
}

const onDelete = () => {
    axios.delete(`${process.env.VUE_APP_API_BASE_URL}/issue?id=${props.issueId}`).then((response) => {
        // modalInstance.value.hide()
        const responseData = response.data
        if (responseData.status === 'SUCCESS') {
            emit('onDelete')
            toast.success('Book Returned Successfully');
        } else {
            toast.info(responseData.message);
        }
    }).catch(() => {
        toast.error('Something went wrong');
    })
}
onMounted(() => {
    modalInstance.value = new bootstrapBundleMin.Modal(returnModel.value);

})
</script>