<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonHeader
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-icon @click="router.go(-1)" slot="icon-only" :icon="arrowBack"></ion-icon>
        </ion-buttons>
        <ion-title>New note</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">New note</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
  </ion-page>
</template>