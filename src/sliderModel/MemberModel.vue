<template>
    <div ref="modal" class="modal fade" data-bs-backdrop="static" id="memberModel" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-color">
                <form @submit.prevent="decideProcess">
                    <div class="modal-header border-0">
                        <h5 class="modal-title font-color ps-2">{{ type }} MEMBER</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close" @click="onClose"></button>
                    </div>
                    <div class="modal-body border-0 ">
                        <div class=" w-100 pe-2 ps-2">
                            <div class="d-flex">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    person
                                </span>
                                <input class="text-white form-control w-100 border-1 input-field " id="name"
                                    type="text" v-model="member.name" placeholder="Enter name"><br>
                            </div>
                            <span v-if="v$.member.name.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* Name is required</p>
                            </span>
                            <div class="d-flex mt-3">
                                <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                    email
                                </span>
                                <input class="text-white form-control w-100 border-1 input-field " id="name"
                                    type="email" v-model="member.email" placeholder="Enter name"><br>
                            </div>
                            <span v-if="v$.member.email.$error" class="text-danger">
                                <p class="fs-6 text-start ps-4">* Email is required</p>
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer  border-0">
                        <button type="button" class="btn btn-sm btn-secondary" @click="onClose" data-bs-dismiss="modal">
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
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min';
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';

const props = defineProps({
    type: String,
    memberId: Number,
    showSlider: {
        Boolean,
        default: false
    }

})
const emit = defineEmits(['onClose', 'onSave'])

let modalInstance = ref(null)
const member = ref({
    name: '',
    email: ''
})
const modal = ref(null)
const rules = {
    member: {
        name: { required },
        email: { email, required }
    }

}

onMounted(() => {
    modalInstance.value = new bootstrapBundleMin.Modal(modal.value);

}),

    watch(() => props.showSlider, (newVal) => {
        if (newVal) {
            modalInstance.value.show();
        } else {
            // modalInstance.value = new bootstrapBundleMin.Modal(modal.value);
            modalInstance.value.hide();
        }
    });

watch(() => props.memberId, () => {
    if (props.memberId > 0 && props.type == 'EDIT') {
        getAllMembers()

    }
})



const v$ = useVuelidate(rules, { member })
const getAllMembers = () => {
    axios.get(`http://127.0.0.1:5000/member?id=${props.memberId}`).then((response) => {
        const responseData = response.data
        if(responseData.status === 'SUCCESS'){
            member.value = responseData.data

        }else{
            toast.error(responseData.message, {
            timeout: 500,
            theme: 'colored'
        });
        }
    }).catch(() => {
        toast.error("Something went wrong", {
            timeout: 500,
            theme: 'colored'
        });
    })
}

const decideProcess = () => {
    v$.value.$touch()
    if (!v$.value.$invalid) {
        if (props.memberId) {
            updateMeber();
        } else {
            createMember();
        }
    } else {
        return false


    }
}

const updateMeber = () => {
    const params = {
        id: member.value.id,
        name: member.value.name,
        email: member.value.email,
        fee: 0
    };
    axios.put('http://127.0.0.1:5000/member', params).then((response) => {
        const responseData = response.data
        if(responseData.status === 'SUCCESS'){
            toast.success('Member Updated Successfully', {
            timeout: 500,
            theme: 'colored'
        });
            emit('onSave');
        }else{
            toast.error(responseData.message, {
            timeout: 500,
            theme: 'colored'
        });
        }
        onClose()
    }).catch(() => {
        toast.error("Something went wrong", {
            timeout: 500,
            theme: 'colored'
        });
    });
}
const createMember = () => {
    const params = {
        name: member.value.name,
        email: member.value.email
    };
    axios.post('http://127.0.0.1:5000/member', params).then((response) => {
        const responseData = response.data
        if(responseData.status === 'SUCCESS'){
            toast.success('Member Created Successfully', {
            timeout: 500,
            theme: 'colored'
        });
        emit('onSave');
        }else{
            toast.error(responseData.message, {
            timeout: 500,
            theme: 'colored'
        });
        }
        onClose()
    }).catch(() => {
        toast.error("Something went wrong", {
            timeout: 500,
            theme: 'colored'
        });
    });
}
const onClose = () => {
    member.value = {}
    v$.value.$reset()
    emit('onClose')
    modalInstance.value.hide();
}

</script>