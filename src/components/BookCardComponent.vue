<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { defineProps, PropType } from 'vue';
import Book from '../models/Book';
defineProps({
  book: {
    type:Object as PropType<Book>,
    required: true
  }
});
</script>
<template>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>{{ book.author }}</ion-card-subtitle>
      <ion-card-title>{{ book.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ book.description }}</p>
    </ion-card-content>
  </ion-card>
</template>
