<template>
    <tr>
        <td class="td-style">{{ index + 1 }}</td>
        <td class="td-style">{{ book.title }}</td>
        <td class="td-style">{{ book.author }}</td>
        <td class="td-style">{{ book.publicationDate }}</td>
        <td class="td-style">{{ book.publisher }}</td>
        <td  class="td-style">{{ book.averageRating }}</td>
        <td class="td-style">{{ book.stock }}</td>
        <td class="td-style"><a href="#" class="card-refresh" data-toggle="refresh" @click="onEdit"><span
                    class="material-symbols-outlined fs-5 text-primary">
                    edit
                </span></a></td>
        <td class="td-style"><a href="#" class="card-close" data-toggle="close" @click="onDelete"><span
                    class="material-symbols-outlined fs-5 ps-1 text-danger">
                    delete
                </span></a></td>
    </tr>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    book: Object,
    index: Number
})
const emit = defineEmits(['onEdit', 'onDelete'])
const onEdit = () => {
    emit('onEdit', props.book.id)
}
const onDelete = () => {
    emit('onDelete', props.book.id)
}

</script>

<style scoped>


</style>