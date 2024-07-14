<template>
    <tr>
        <td>{{ index + 1 }}</td>
        <td>{{ member.name }}</td>
        <td>{{ member.email }}</td>
        <td>{{ member.joined }}</td>
        <td><a href="#" class="card-refresh" data-toggle="refresh" @click="onEdit"><span
                    class="material-symbols-outlined fs-5 text-primary">
                    edit
                </span></a></td>
        <td><a href="#" class="card-close" data-toggle="close" @click="onDelete"><span
                    class="material-symbols-outlined fs-5 ps-1 text-danger">
                    delete
                </span></a></td>
    </tr>
</template>


<script setup>
import { defineProps,defineEmits } from 'vue';

const props =  defineProps({
    member: Object,
    index: Number
})
const emit = defineEmits(['onEdit', 'onDelete'])
const onEdit = () => {
    emit('onEdit', props.member.id)
}
const onDelete = () => {
    emit('onDelete', props.member.value.id)
}

</script>