<template>
    <tr>
        <td class="td-style mobile-display-none">{{ index + 1 }}</td>
        <td data-label="Name" class="td-style">{{ member.name }}</td>
        <td data-label="Email" class="td-style">{{ member.email }}</td>
        <td data-label="Joined" class="td-style">{{ member.joined }}</td>
        <td data-label="Fee" class="td-style">{{ member.fee }}</td>
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
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    member: Object,
    index: Number
})
const emit = defineEmits(['onEdit', 'onDelete'])
const onEdit = () => {
    emit('onEdit', props.member.id)
}
const onDelete = () => {
    emit('onDelete', props.member.id)
}

</script>

<style></style>