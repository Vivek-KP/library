<template>
    <tr>
        <td class="td-style">{{ index }}</td>
        <td class="td-style">{{ issuedData.book.title }}</td>
        <td class="td-style">{{ issuedData.member.name }}</td>
        <td class="td-style">{{ issuedData.issuedDate }}</td>
        <td class="td-style">{{ issuedData.returnDate }}</td>
        <td class="td-style">{{ issuedData.fee }}</td>
        <td class="td-style"><a href="#" class="card-close" data-toggle="close"><span
                    class="material-symbols-outlined  ps-1 text-success">
                    autorenew
                </span></a></td>
    </tr>
</template>

<script setup>
import { defineProps } from 'vue';


 defineProps({
    issuedData:Object,
     index:Number
     })

</script>