<script setup lang="ts">
import { ref } from 'vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonFabButton,
  IonFab,
  IonMenuButton,
  IonButtons,
  modalController
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import FormModalBookComponent from '@/components/book/FormModalBookComponent.vue';
import ListBookComponent from '@/components/book/ListBookComponent.vue';
import { useBook } from '@/hooks/useBook';
import { useUi } from '@/hooks/useUi';
import Book from '@/models/Book';

const APP_NAME = process.env.VUE_APP_NAME;

const { getBooks } = useBook();
const { setLoading } = useUi();

const books = ref<Book[]>([]);

const init = async () => {
  setLoading(true, 'Loading books...');
  await loadBooks();
  setLoading(false, '');
};

const loadBooks = async () => {
  const { ok, data } = await getBooks();
  if ( ok ) books.value = data;
};

const onSave = () => {
  loadBooks();
};

const openCreateModal = async () => {
  const modal = await modalController.create({
    component: FormModalBookComponent,
    componentProps: {
      onSave
    }
  });
  return modal.present();
};

const openUpdateModal = async ( book: Book ) => {
  const modal = await modalController.create({
    component: FormModalBookComponent,
    componentProps: {
     book
    }
  });
  return modal.present();
};

init();

</script>
<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ APP_NAME }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ APP_NAME }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ListBookComponent
        :books="books"
        @onClick="openUpdateModal"
      />
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openCreateModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
