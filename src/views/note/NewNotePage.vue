<script setup lang="ts">
import { ref, onUpdated } from 'vue';
import {
  IonButtons,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonHeader,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonTextarea
} from '@ionic/vue';
import { arrowBack, save } from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router';
import { useNote } from '@/hooks/useNote';
import { useUi } from '@/hooks/useUi';
import NewNoteDto from '@/models/dto/NewNoteDto';

const route = useRoute();
const router = useRouter();
const { createNote } = useNote();
const { setAlertMessage } = useUi();

const newNoteForm = ref({
  name: '',
  description: '',
  bookId: Number(route.params['bookId'])
} as NewNoteDto);

const saveNote = async() => {
  if (newNoteForm.value.name.trim() === '') {
    setAlertMessage('Title is required');
    return;
  }
  const { ok, message } = await createNote(newNoteForm.value);
  setAlertMessage(message);
  if (ok) router.push({ name: 'note', params: { bookId: route.params['bookId'] }});
};

onUpdated(() => {
  newNoteForm.value = {
    name: '',
    description: '',
    bookId: Number(route.params['bookId'])
  };
});

</script>

<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-icon @click="router.push({ name: 'note', params: { bookId: route.params['bookId'] } })" slot="icon-only" :icon="arrowBack"></ion-icon>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-icon @click="saveNote" slot="icon-only" :icon="save" color="primary"></ion-icon>
        </ion-buttons>
        <ion-title>New note</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list class="ion-margin-top">
        <ion-item>
          <ion-label position="stacked">Title</ion-label>
          <ion-input placeholder="Note's title" v-model="newNoteForm.name"></ion-input>
        </ion-item>
      </ion-list>
      <ion-list class="ion-margin-top">
        <ion-item>
          <ion-label position="stacked">Content</ion-label>
          <ion-textarea :auto-grow="true" placeholder="Note's content" :rows="24" v-model="newNoteForm.description"></ion-textarea>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
