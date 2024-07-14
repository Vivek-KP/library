<template>
         <div  class="modal fade" id="bookModel" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <h5 class="modal-title ps-2" >{{ type }} BOOK</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body border-0 ">
                            <form class=" w-100 pe-2 ps-2">
                                <div class="d-flex"> 
                                    <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                        menu_book
                                    </span>
                                    <input class="inputField form-control w-100 border-1 " id="name" type="text"
                                        v-model="userEmail" placeholder="Enter title"><br>
                                </div>
                                <div class="d-flex mt-4">
                                    <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                        person
                                    </span>
                                    <input class="inputField form-control w-100 border-1 " id="name" type="text"
                                        v-model="userEmail" placeholder="Enter author"><br>
                                </div>
                                <div class="d-flex mt-4" v-if="type!=='IMPORT'">
                                    <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                        calendar_month
                                    </span>
                                    <input class="inputField form-control w-100 border-1 " id="name" type="date"
                                        v-model="userEmail" placeholder="Enter publication date"><br>
                                </div>
                                <div class="d-flex mt-4">
                                    <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                        publish
                                    </span>
                                    <input class="inputField form-control w-100 border-1" id="email" type="text"
                                        v-model="userEmail" placeholder="Enter publisher"><br>

                                </div>
                                <div class="d-flex mt-4" v-if="type==='IMPORT'">
                                    <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                        book
                                    </span>
                                    <input class="inputField form-control w-100 border-1" id="email" type="text"
                                        v-model="userEmail" placeholder="Enter isbn"><br>

                                </div>
                                <div class="d-flex mt-4" v-if="type==='IMPORT'">
                                    <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                        pin
                                    </span>
                                    <input class="inputField form-control w-100 border-1" id="email" type="text"
                                        v-model="userEmail" placeholder="Enter no. of books want to import"><br>

                                </div>
                                <div class="d-flex mt-4" v-if="type!=='IMPORT'">
                                    <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                        star_half
                                    </span>
                                    <input class="inputField form-control w-100 border-1" id="email" type="text"
                                        v-model="userEmail" placeholder="Enter Rating"><br>

                                </div>
                                <div class="d-flex mt-4"  v-if="type!=='IMPORT'">
                                    <span class="material-symbols-outlined me-2 pt-2 text-primary">
                                        stacks
                                    </span>
                                    <input class="inputField form-control w-100 border-1" id="email" type="number"
                                        v-model="userEmail" placeholder="Enter stock"><br>

                                </div>

                            </form>
                        </div>
                        <div class="modal-footer  border-0">
                            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">
                                <div class="d-flex">
                                    <span class="material-symbols-outlined fs-5">
                                        close
                                    </span>
                                    <span>Close</span>
                                </div>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary">
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

<script>

export default {
    name:'BookModel',
    props:{
        type:String
    },
    data(){
        return{
            userEmail:''
        }
    }
}
</script>

<style>
</style>