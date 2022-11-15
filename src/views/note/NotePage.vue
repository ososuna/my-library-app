<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useBook } from '@/hooks/useBook';
import Book from '@/models/Book';

const { getBookById } = useBook();

const route = useRoute();

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
          <ion-menu-button></ion-menu-button>
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
