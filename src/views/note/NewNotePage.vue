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
      <ion-list class="ion-margin-top">
        <ion-item>
          <ion-label position="stacked">Name</ion-label>
          <ion-input placeholder="Note's name"></ion-input>
        </ion-item>
      </ion-list>
      <ion-list class="ion-margin-top">
        <ion-item>
          <ion-label position="stacked">Content</ion-label>
          <ion-textarea :auto-grow="true" placeholder="Note's content" :rows="24"></ion-textarea>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>