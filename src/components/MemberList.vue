<template>

  <div class="">
    <div class="d-flex flex-wrap justify-content-between col-md-12  mb-3">
      <div class="d-flex input-container">
        <span class="material-symbols-outlined font-color p-1">search</span>
        <input class=" border-0 search-field text-white" placeholder=" Search Member " type="text"
          v-model="searchMember">
      </div>
      <div>
        <button type="button" class="btn btn-primary btn-sm" @click="Slider">
          <div class="d-flex">
            <span class="material-symbols-outlined fs-5 pe-1">person_add</span>
            <span> Add Member</span>
          </div>
        </button>
      </div>
      <!-- Modal -->
      <MemberModel :type="type" :showSlider="showSlider" :memberId="memberId" @onSave="onSave" @onClose="onClose" />
      <DeleteSlider :deleteSlider="deleteSlider" type="MEMBER" :memberId="memberId" @on-close="onClose"
        @on-delete="onSave" />
    </div>
    <div class="card p-2 shadow-sm">
      <div class="card">
        <div class="table-responsive" style="max-height: 70vh;">
          <table class="table table-hover table-dark ">
            <thead>
              <tr style="background-color:#1f1e2f;">
                <th class="td-style mobile-display-none">Sl no</th>
                <th class="td-style"> Member Name</th>
                <th class="td-style">Email</th>
                <th class="td-style">Joined Date</th>
                <th class="td-style">Total Fee</th>
                <th class="td-style">Edit</th>
                <th class="td-style">Delete</th>
  
              </tr>
            </thead>
            <tbody v-if="filterMember.length">
              <MemberRow v-for="(member, index) in filterMember" :key="member.id" :index="index" :member="member"
                @onEdit="onEdit" @onDelete="decideDelete" />
            </tbody>
            <tbody v-else>
              <tr>
                <td align="center" class="p-5 text-secondary td-style" colspan="7"><span
                    class="material-symbols-outlined">
                    hourglass_empty
                  </span>
                  <h5>No Members Yet</h5>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>

  </div>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import MemberModel from '../sliderModel/MemberModel.vue'
import MemberRow from '../components/MemberRow.vue';
import DeleteSlider from '../sliderModel/MemberDeleteSlider.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';

const type = ref('')
const showSlider = ref(false)
const memberId = ref(0)
const memberList = ref([])
const searchMember = ref('')

const filterMember = computed({
  get() {
    if (searchMember.value != '') {

      return memberList.value.filter(mem => mem.name.toLowerCase().includes(searchMember.value))
    } else {
      return memberList.value

    }
  }

})
const getAllMembers = () => {
  axios.get(`${process.env.VUE_APP_API_BASE_URL}/member`).then((response) => {
    const responseData = response.data
    memberList.value = responseData.data

  }).catch(() => {
    toast.error('Something went wrong');
  })

}
const Slider = () => {
  memberId.value = 0
  type.value = 'ADD'
  showSlider.value = true
}
const onClose = () => {
  showSlider.value = false
  deleteSlider.value = false
  memberId.value = ''

}
const onSave = () => {
  getAllMembers()
  onClose()

}
const onEdit = (member_Id) => {
  showSlider.value = true
  memberId.value = member_Id
  type.value = 'EDIT'

}

const deleteSlider = ref(false)

const decideDelete = (member_Id) => {

  deleteSlider.value = true
  memberId.value = member_Id
}



onMounted(getAllMembers)

</script>

<style scoped>
.card {
  background-color: #1f1e2f;
  border: none;
  border-radius: 12px;
}

.input-container {
  border: 1px solid #6d6d6e;
  border-left: 0;
  border-right: 0;
  border-top: 0;
}
</style>