<script setup lang="ts">
import { defineEmits, defineProps, PropType } from 'vue';
import CardBookComponent from './CardBookComponent.vue';
import Book from '@/models/Book';
defineProps({
  books: {
    type: Array as PropType<Book[]>,
    required: true
  }
});
const emit = defineEmits(['onClick']);
</script>
<template>
  <CardBookComponent
    v-for="(book, index) in books"
    @click="emit('onClick', book)"
    :key="index"
    :book="book"
  />
</template>