<script setup lang="ts">
import CardBookComponent from '@/components/book/CardBookComponent.vue';
import NoRecordsMessageComponent from '@/components/shared/NoRecordsMessageComponent.vue';
import { useUi } from '@/hooks/useUi';
import Book from '@/models/Book';
import { defineEmits, defineProps, PropType } from 'vue';
defineProps({
  books: {
    type: Array as PropType<Book[]>,
    required: true
  }
});
const emit = defineEmits(['onClick', 'onDelete', 'onUpdate']);
const { loading } = useUi();
</script>
<template>
  <NoRecordsMessageComponent entity="books" v-if="(books.length===0)&&(!loading.show)" />
  <CardBookComponent
    v-else
    v-for="(book, index) in books"
    @onClick="emit('onClick', book)"
    @onDelete="emit('onDelete', book.id)"
    @onUpdate="emit('onUpdate', book)"
    :key="index"
    :book="book"
  />
</template>
