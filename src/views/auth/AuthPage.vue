<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonText
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
      <router-view />
    </ion-content>
    <ion-footer>
    <ion-toolbar>
      <ion-title size="small">
        <ion-text>
          Don't have an account? <ion-text color="primary">Sign up</ion-text>
        </ion-text>
      </ion-title>
    </ion-toolbar>
  </ion-footer>
  </ion-page>
</template>
