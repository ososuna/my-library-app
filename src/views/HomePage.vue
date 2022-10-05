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
  IonLoading,
  modalController
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import FormModalBookComponent from '@/components/FormModalBookComponent.vue';
import ListBookComponent from '@/components/ListBookComponent.vue';
import { useBook } from '../hooks/useBook';
import Book from '@/models/Book';
const { getBooks } = useBook();
const isLoading = ref(false);
const books = ref<Book[]>([]);
const init = async () => {
  isLoading.value = true;
  await loadBooks();
  isLoading.value = false;
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
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>My Library</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">My Library</ion-title>
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
      <ion-loading
        :isOpen="isLoading"
        message="Loading books..."
      />
    </ion-content>
  </ion-page>
</template>
