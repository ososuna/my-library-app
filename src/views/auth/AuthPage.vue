<script setup lang="ts">
import {
IonContent,
IonHeader,
IonPage,
IonTitle,
IonToolbar
} from '@ionic/vue';

const APP_NAME = process.env.VUE_APP_NAME;

</script>
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ APP_NAME }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ APP_NAME }}</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
  </ion-page>
</template>
