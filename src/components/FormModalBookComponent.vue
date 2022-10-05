<script setup lang="ts">
import { PropType, defineProps, ref, onMounted } from 'vue';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  modalController
} from '@ionic/vue';
import Book from '../models/Book';
const props = defineProps({
  book: {
    type: Object as PropType<Book>,
    required: false
  }
});
const bookForm = ref({
  name: '',
  author: '',
  description: ''
});
const closeModal = () => {
  modalController.dismiss();
};
onMounted(() => {
  if (props.book) {
    bookForm.value = props.book;
  }
});
</script>
<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="closeModal">Cancel</ion-button>
      </ion-buttons>
      <ion-title>{{ props.book ? 'Update' : 'New' }} book</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="closeModal">Send</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label position="stacked">Name</ion-label>
      <ion-input v-model="bookForm.name" placeholder="Book's name"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Author</ion-label>
      <ion-input v-model="bookForm.author" placeholder="Book's author"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Description</ion-label>
      <ion-input v-model="bookForm.description" placeholder="Book's description"></ion-input>
    </ion-item>
  </ion-content>
</template>
