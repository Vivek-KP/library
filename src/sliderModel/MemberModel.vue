<template>
    <div ref="modal" class="modal fade" id="memberModel" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title ps-2">{{ type }} MEMBER</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="onClose"></button>
                </div>
                <div class="modal-body border-0 ">
                    <form class=" w-100 pe-2 ps-2">
                        <div class="d-flex">
                            <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                person
                            </span>
                            <input class="inputField form-control w-100 border-1 " id="name" type="text"
                                v-model="member.name" placeholder="Enter name"><br>
                        </div>
                        <div class="d-flex mt-4">
                            <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                email
                            </span>
                            <input class="inputField form-control w-100 border-1 " id="name" type="email"
                                v-model="member.email" placeholder="Enter name"><br>
                        </div>


                    </form>
                </div>
                <div class="modal-footer  border-0">
                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="onClose"
                        data-bs-dismiss="modal">
                        <div class="d-flex">
                            <span class="material-symbols-outlined fs-5">
                                close
                            </span>
                            <span>Close</span>
                        </div>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-primary" @click="decideProcess">
                        <div class="d-flex">
                            <span class="material-symbols-outlined fs-5 pe-1">check</span>
                            <span>Save</span>

                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import axios from 'axios'
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min';
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';

const props = defineProps({
    type: String,
    memberId: Number,
    showSlider: {
        Boolean,
        default: false
    }

})
const emit = defineEmits(['onClose'])

let modalInstance = ref(null)
// const modalInstanc = ref(null)

const modal = ref(null)

// .swiper will only work if the ref swiper (Swiper element) has a property named swiper
// const swiperComputed = computed(() => modal.value)

onMounted(() => {

}),

    watch(() => props.showSlider, (newVal) => {
        if (newVal) {
            console.log("true");
            modalInstance.value = new bootstrapBundleMin.Modal(modal.value);
            modalInstance.value.show();
        } else {
            console.log("false");

            modalInstance.value = new bootstrapBundleMin.Modal(modal.value);
            modalInstance.value.hide();
        }
    });

watch(() => props.memberId, () => {
    if (props.memberId > 0 && props.type == 'EDIT') {
        getAllMembers()

    }
})



const member = ref({})
const getAllMembers = () => {
    axios.get(`http://127.0.0.1:5000/member?id=+${props.memberId}`).then((response) => {
        const responseData = response.data
        member.value = responseData.data
    }).catch(() => {

    })
}

const decideProcess = () => {
    if (props.memberId) {
        const params = {
            id: member.value.id,
            name: member.value.name,
            email: member.value.email,
            fee: 0
        }
        axios.put('http://127.0.0.1:5000/member', params).then((response) => {
            console.log(response);
            emit('onSaved')
            this.onClose()
        }).catch(() => {

        })
    } else {
        const params = {
            name: member.value.name,
            email: member.value.email
        }
        axios.post('http://127.0.0.1:5000/member', params).then((response) => {
            console.log(response);
            emit('onSaved')
            onClose

        }).catch(() => {

        })

    }
}
const onClose = () => {
    member.value = {}
    emit('onClose')
    // modalInstance.value.hide();
}

</script>