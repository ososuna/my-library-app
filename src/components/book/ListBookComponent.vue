<script setup lang="ts">
import { defineEmits, defineProps, PropType } from 'vue';
import { IonText } from '@ionic/vue';
import CardBookComponent from '@/components/book/CardBookComponent.vue';
import Book from '@/models/Book';
defineProps({
  books: {
    type: Array as PropType<Book[]>,
    required: true
  }
});
const emit = defineEmits(['onClick', 'onDelete', 'onUpdate']);
</script>
<template>
  <div v-if="books.length===0" class="ion-text-center">
    <ion-text color="medium">
      <h4 color="medium">No books registered</h4>
    </ion-text>
  </div>
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
