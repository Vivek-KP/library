<template>
    <tr>
        <td class="td-style">{{ index + 1 }}</td>
        <td  class="td-style">{{ member.name }}</td>
        <td  class="td-style">{{ member.email }}</td>
        <td  class="td-style">{{ member.joined }}</td>
        <td  class="td-style">{{ member.fee }}</td>
        <td  class="td-style"><a href="#" class="card-refresh" data-toggle="refresh" @click="onEdit"><span
                    class="material-symbols-outlined fs-5 text-primary">
                    edit
                </span></a></td>
        <td  class="td-style"><a href="#" class="card-close" data-toggle="close" @click="onDelete"><span
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
    emit('onDelete', props.member.id)
}

</script>

<style>
 .td-style{
  background-color: #1f1e2f !important;
  color: #9499a4 !important;

}
</style>