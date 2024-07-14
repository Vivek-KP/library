<template>

  <div class="ps-5">
    <div class=" ps-3  d-flex justify-content-end  mb-3">
      <button type="button" class="btn btn-primary btn-sm" @click="Slider">
        <div class="d-flex">
          <span class="material-symbols-outlined fs-5 pe-1">person_add</span>
          <span> Add Member</span>

        </div>
      </button>

      <!-- Modal -->
      <MemberModel :type="type" :showSlider="showSlider" :memberId="memberId" @saved="save" @onClose="onClose" />

    </div>
    <div class="card shadow-sm">
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Sl no</th>
              <th> Member Name</th>
              <th>Email</th>
              <th>Joined Date</th>
              <th>Edit</th>
              <th>Delete</th>

            </tr>
          </thead>
          <tbody v-if="memberList.length">
            <MemberRow v-for="(member, index) in memberList" :key="member.id" :index="index" :member="member"
              @onEdit="onEdit" @onDelete="onDelete" />
          </tbody>
          <tbody v-else>
            <tr>
              <td align="center" class="p-5 text-secondary" colspan="6"><span class="material-symbols-outlined">
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

</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import MemberModel from '../sliderModel/MemberModel.vue'
import MemberRow from '../components/MemberRow.vue';



const type = ref('')
const showSlider = ref(false)
const memberId = ref(0)
const memberList = ref([])


const getAllMembers = () => {
  console.log("mlkjn");
  axios.get('http://127.0.0.1:5000/member').then((response) => {
    const responseData = response.data
    memberList.value = responseData.data
  }).catch(() => {

  })

}
const Slider = () => {
  memberId.value = 0
  type.value = 'ADD'
  showSlider.value = true
}
const onClose = () => {
  console.log('close');
  showSlider.value = false
}
const save = () => {
  getAllMembers()

}
const onEdit = (member_Id) => {
  showSlider.value = true
  memberId.value = member_Id
  type.value = 'EDIT'

}
const onDelete = () => {
  alert('Your message')
    .then(() => {
      console.log("Alert dialog closed.");
    });


}

onMounted(getAllMembers)

</script>

<style scoped>
.inputField {
  border: none;
  border-bottom: 1px solid rgb(107, 107, 107);
  outline: none;
  font-size: 16px;


}

.inputField::placeholder {
  font-size: 14px;
  padding-left: 4px;
}
</style>