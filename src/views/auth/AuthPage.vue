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
import { useRoute, useRouter } from 'vue-router';

const APP_NAME = process.env.VUE_APP_NAME;

const route = useRoute();

const router = useRouter();

const changeLogInSignUpPage = () => {
  if (route.name === 'log-in') {
    router.push({ name: 'sign-up' });
  } else {
    router.push({ name: 'log-in' });
  }
};

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
        <ion-text v-if="route.name==='log-in'">
          Don't have an account? <ion-text color="primary" @click="changeLogInSignUpPage">Sign up</ion-text>
        </ion-text>
        <ion-text v-else-if="route.name==='sign-up'">
          Already have an account? <ion-text color="primary" @click="changeLogInSignUpPage">Log in</ion-text>
        </ion-text>
      </ion-title>
    </ion-toolbar>
  </ion-footer>
  </ion-page>
</template>
