<script setup lang="ts">
import { ref } from 'vue';
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
import { arrowBack, trash } from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router';
import { useNote } from '@/hooks/useNote';
import { useUi } from '@/hooks/useUi';
import UpdateNoteDto from '@/models/dto/UpdateNoteDto';

const { deleteNote, getNoteById, updateNote } = useNote();
const route = useRoute();
const router = useRouter();
const { loading, openConfirmModal, setAlertMessage, setLoading } = useUi();

const updateNoteForm = ref({
  name: '',
  description: ''
} as UpdateNoteDto);

const originalNote = ref({
  name: '',
  description: ''
} as UpdateNoteDto);

const init = async() => {
  setLoading(true, 'Loading note...');
  await loadNote();
  setLoading(false, '');
};

const loadNote = async () => {
  const { data } = await getNoteById(Number(route.params['id']));
  originalNote.value = {
    name: data.name,
    description: data.description
  };
  updateNoteForm.value = {
    name: data.name,
    description: data.description
  };
};

const saveDeleteNote = async() => {
  const decision = await openConfirmModal('Are you sure you want to delete this book?');
  if (!decision) return;
  const { ok, message } = await deleteNote(Number(route.params['id']));
  setAlertMessage(message);
  if (ok) router.go(-1);
}

const saveUpdateNote = async() => {
  if (updateNoteForm.value.name.trim() === '') {
    setAlertMessage('Title is required');
    return;
  }
  if (!(updateNoteForm.value.name === originalNote.value.name && updateNoteForm.value.description === originalNote.value.description)) {
    const { message } = await updateNote(Number(route.params['id']), updateNoteForm.value);
    setAlertMessage(message);
  }
  router.go(-1);
};

init();

</script>

<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-icon @click="saveUpdateNote" slot="icon-only" :icon="arrowBack"></ion-icon>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-icon @click="saveDeleteNote" slot="icon-only" :icon="trash" color="danger"></ion-icon>
        </ion-buttons>
        <ion-title>Edit Note</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="!loading.show">
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
      </div>
    </ion-content>
  </ion-page>
</template>
