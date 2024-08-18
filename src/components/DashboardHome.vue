<template>
  <div class="ps-5">
    <div class="d-flex justify-content-evenly pb-5 mb-5">
      <div class="card card1">
        <div class="card-title pt-2">
          <p>Total Books</p>
        </div>
        <div class="card-body p-0">
          <span class="material-symbols-outlined icon-style">
            book_2
          </span>
          <p>{{ dashboardData.bookCount }}</p>
        </div>
      </div>

      <div class="card card2 ">
        <div class="card-title pt-2">
          <p>Total Members</p>
        </div>
        <div class="card-body p-0">
          <span class="material-symbols-outlined icon-style">
            group
          </span>
          <p>{{ dashboardData.memberCount }}</p>
        </div>
      </div>

      <div class="card card3 ">
        <div class="card-title pt-2">
          <p>Issued Books</p>
        </div>
        <div class="card-body p-0">
          <span class="material-symbols-outlined icon-style">
            how_to_reg
          </span>
          <p>{{ dashboardData.issuedBookCount }}</p>
        </div>
      </div>

      <div class="card card4 ">
        <div class="card-title pt-2">
          <p>Overdue Books</p>
        </div>
        <div class="card-body p-0">
          <span class="material-symbols-outlined icon-style">
            cycle
          </span>
          <p>{{ dashboardData.overDuebookCount }}</p>
        </div>
      </div>

    </div>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-primary btn-sm" @click="Slider">
        <div class="d-flex">
          <span class="material-symbols-outlined fs-5 pe-1">send</span>
          <span> Issue a Book</span>
        </div>
      </button>
    </div>
    <div>
      <h4 class="font-color">Issued Book Details</h4>
    </div>
    <div class="card shadow-sm mt-4">
      <div class="card-body table-responsive">
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th class="td-style">Sl No.</th>
              <th width="20%" class="td-style">Issued Book</th>
              <th class="td-style">Member Name</th>
              <th class="td-style">Issued Date</th>
              <th class="td-style">Return Date  </th>
              <th class="td-style">Generated Fee</th>
              <th class="td-style">Renew/Return</th>
            </tr>
          </thead>
          <tbody>
              <IssueRow v-for="(issuedData,index) in issuedBookDetails" :key="issuedData.id" :issuedData='issuedData' :index='index+1'/>
          </tbody>
        </table>
      </div>
      <IssueModel  :showSlider="showSlider"   @onSave="onSave" @onClose="onClose"/>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import IssueModel from '@/sliderModel/IssueModel.vue';
import IssueRow from './IssueRow.vue';


const dashboardData = ref('')
const getDashboardData = () => {
  axios.get('http://127.0.0.1:5000/dashboard').then(res => {
    const response = res.data
    dashboardData.value = response.data
  }).catch(() => {

  })
}
onMounted(getDashboardData)


const issuedBookDetails = ref([])
const getIssuedBookDetail = ()=>{
  axios.get('http://127.0.0.1:5000/issue').then(res=>{
    const responsData = res.data
    issuedBookDetails.value = responsData.data
  }).catch(()=>{

  })
}
onMounted(getIssuedBookDetail)


const showSlider = ref(false)
const Slider = () => {
  showSlider.value = true
}

const onClose = () => {
  console.log('close');
  showSlider.value = false
  // memberId.value=''

}
const onSave = () => {
  getIssuedBookDetail()
  getDashboardData()
  onClose()

}
</script>

<style scoped>
.card {
  min-width: 15%;
  border: none;

}

.card1 {
  color: #00ac37;
  background-color: rgba(0, 172, 55, 0.130);
}

.card2 {
  color: #266cec;
  background-color: rgba(38, 107, 236, 0.130);
}

.card3 {
  color: #f2be3b;
  background-color: rgba(245, 197, 75, 0.130);

}

.card4 {
  color: #b4486b;
  background-color: rgba(180, 72, 107, 0.130);

}

.icon-style {
  font-size: xxx-large;
}

.card {
    background-color: #1f1e2f;
    border: none;
}
</style>