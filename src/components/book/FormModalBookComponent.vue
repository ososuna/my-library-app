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
import Book from '@/models/Book';
import { useBook } from '@/hooks/useBook';
import { useUi } from '@/hooks/useUi';
import { useAuth } from '@/hooks/useAuth';

const { createBook, updateBook } = useBook();
const { setAlertMessage } = useUi();
const { loggedUserId } = useAuth();

const props = defineProps({
  book: {
    type: Object as PropType<Book>,
    required: false
  },
  onSave: {
    type: Function as PropType<() => void>,
    required: false
  }
});
const bookForm = ref({
  name: '',
  author: '',
  description: '',
  userId: loggedUserId.value
});
const closeModal = () => {
  modalController.dismiss();
};
const saveBook = async () => {
  const { ok, message } = props.book
    ? await updateBook(props.book.id, bookForm.value)
    : await createBook(bookForm.value);
  if (ok) {
    closeModal();
    setAlertMessage(message);
    props.onSave && props.onSave();
  }
};
onMounted(() => {
  if (props.book) bookForm.value = props.book;
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
        <ion-button @click="saveBook">Send</ion-button>
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
