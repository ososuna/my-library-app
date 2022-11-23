<script setup lang="ts">
import { onUpdated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  IonToolbar,
  IonPage,
  IonHeader,
  IonButtons,
  IonTitle,
  IonContent,
  IonIcon
} from '@ionic/vue';
import { add, arrowBack } from 'ionicons/icons';
import ListNoteComponent from '@/components/note/ListNoteComponent.vue';
import { useBook } from '@/hooks/useBook';
import { useNote } from '@/hooks/useNote';
import { useUi } from '@/hooks/useUi';
import Book from '@/models/Book';
import Note from '@/models/Note';

const { getBookById } = useBook();
const { getNotesByBookId } = useNote();
const route = useRoute();
const router = useRouter();
const { setLoading } = useUi();

const book = ref({} as Book);
const notes = ref([] as Note[]);

const init = async() => {
  setLoading(true, 'Loading notes...');
  await getBook();
  await loadNotes();
  setLoading(false, '');
};

const getBook = async () => {
  const { data } = await getBookById(Number(route.params['bookId']));
  book.value = data;
};

const loadNotes = async() => {
  const { data } = await getNotesByBookId(Number(route.params['bookId']));
  notes.value = data;
};

const onClick = (note: Note) => {
  router.push({ name: 'editNote', params: { id: note.id } });
};

init();

onUpdated(() => {
  if (route.params['bookId']) loadNotes();
});

</script>
<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-icon @click="router.push({ name: 'book' })" slot="icon-only" :icon="arrowBack"></ion-icon>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-icon @click="router.push({ name: 'newNote', params: {bookId: route.params['bookId']} })" slot="icon-only" :icon="add"></ion-icon>
        </ion-buttons>
        <ion-title>{{ book.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ book.name }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ListNoteComponent
        :notes="notes"
        @onClick="onClick"
      />
    </ion-content>
  </ion-page>
</template>
