<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton  
} from '@ionic/vue';
import { useAuth } from '@/hooks/useAuth';
import { useUi } from '@/hooks/useUi';
import LoginRequest from '@/models/auth/LoginRequest';

const { loginUser } = useAuth();
const { setAlertMessage } = useUi();

const router = useRouter();

const loginRequest = ref({
  email: '',
  password: ''
} as LoginRequest);

const onSubmit = async() => {
  const { ok, message } = await loginUser( loginRequest.value );
  if( !ok ) {
    setAlertMessage( message );
    return;
  }
  router.push({ name: 'book' });
};

</script>
<template>
  <ion-grid>
    <form @submit.prevent="onSubmit">
      <ion-row>
        <ion-col size="12">
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" required v-model="loginRequest.email" placeholder="Enter your email"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input required v-model="loginRequest.password" placeholder="Enter your password" type="password"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row class="ion-margin-top">
        <ion-col size="12" class="center">
          <ion-button type="submit" expand="block">
            Log In
          </ion-button>
        </ion-col>
      </ion-row>
    </form>
  </ion-grid>
</template>
