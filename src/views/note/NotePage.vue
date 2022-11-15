<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  IonToolbar,
  IonPage,
  IonHeader,
  IonButtons,
  IonTitle,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/vue';
import { add, arrowBack } from 'ionicons/icons';
import { useBook } from '@/hooks/useBook';
import { useNote } from '@/hooks/useNote';
import Book from '@/models/Book';
import Note from '@/models/Note';
import ListNoteComponent from '@/components/note/ListNoteComponent.vue';
import { useUi } from '@/hooks/useUi';

const { getBookById } = useBook();
const { getNotesByBookId } = useNote();
const route = useRoute();
const router = useRouter();
const { loading, setLoading } = useUi();

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

init();

</script>
<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-icon @click="router.go(-1)" slot="icon-only" :icon="arrowBack"></ion-icon>
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
        v-if="notes.length > 0 && !loading.show"
        :notes="notes"
      />
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
