<template>
    <tr>
        <td class="td-style"><input type="checkbox" :id="book.id" @click="onRowSelected" :name="book.id" v-model="checked"></td>
        <td class="td-style mobile-display-none">{{ index + 1 }}</td>
        <td align="left" data-label="Title" class="td-style ps-5">{{ book.title }}</td>
        <td align="left" data-label="Author" class="td-style ps-5">{{ book.author }}</td>
        <td data-label="Publication Date" class="td-style">{{ book.publicationDate }}</td>
        <td data-label="Publisher" class="td-style">{{ book.publisher }}</td>
        <td data-label="Rating" class="td-style">{{ book.averageRating }}</td>
        <td data-label="Stock" class="td-style">{{ book.stock }}</td>
        <td data-label="Edit" class="td-style"><a href="#" class="card-refresh" data-toggle="refresh"
                @click="onEdit"><span class="material-symbols-outlined fs-5 text-primary">
                    edit
                </span></a></td>
        <td data-label="Delete" class="td-style"><a href="#" class="card-close" data-toggle="close"
                @click="onDelete"><span class="material-symbols-outlined fs-5 ps-1 text-danger">
                    delete
                </span></a></td>
    </tr>
</template>


<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    book: Object,
    index: Number,
    rowChecked:{
        Boolean,
        default:false
    }
})

const checked = ref(props.rowChecked)
const emit = defineEmits(['onEdit', 'onDelete','onRowSeleted'])
const onEdit = () => {
    emit('onEdit', props.book.id)
}
const onDelete = () => {
    emit('onDelete', props.book.id)
}

watch(()=>checked.value,(newValue) =>{
    emit('onRowSeleted',props.book.id,newValue)
})

watch(()=>props.rowChecked,(newVal)=>{
    console.log("ujuhygfrde");
    checked.value=newVal
})

</script>

<style scoped></style>