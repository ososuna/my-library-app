<script setup lang="ts">
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
import { ref, onUpdated } from 'vue';
import { useNote } from '@/hooks/useNote';
import { useUi } from '@/hooks/useUi';
import UpdateNoteDto from '@/models/dto/UpdateNoteDto';

const { updateNote } = useNote();
const route = useRoute();
const router = useRouter();
const { setAlertMessage } = useUi();

const updateNoteForm = ref({
  name: '',
  description: ''
} as UpdateNoteDto);

const saveNote = async() => {
  const { ok, message } = await updateNote(Number(route.params['id']), updateNoteForm.value);
  setAlertMessage(message);
  if (ok) router.go(-1);
};

onUpdated(() => {
  updateNoteForm.value = {
    name: '',
    description: ''
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
          <ion-input placeholder="Note's title" v-model="updateNoteForm.name"></ion-input>
        </ion-item>
      </ion-list>
      <ion-list class="ion-margin-top">
        <ion-item>
          <ion-label position="stacked">Content</ion-label>
          <ion-textarea :auto-grow="true" placeholder="Note's content" :rows="24" v-model="updateNoteForm.description"></ion-textarea>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>