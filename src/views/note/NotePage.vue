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
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import { useBook } from '@/hooks/useBook';
import Book from '@/models/Book';

const { getBookById } = useBook();
const route = useRoute();
const router = useRouter();

const book = ref({} as Book);

const getBook = async () => {
  const { data } = await getBookById(Number(route.params['bookId']));
  book.value = data;
};

getBook();

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
    </ion-content>
  </ion-page>
</template>
