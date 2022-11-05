<script setup lang="ts">
import { ref } from 'vue';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonNote
} from '@ionic/vue';
import { validateEmail } from '@/helpers/validateEmail';
import Role from '@/models/auth/Role';
import SignUpRequest from '@/models/auth/SignUpRequest';

const signUpRequest = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  age: '',
  role: Role.User
} as SignUpRequest);

const emailValidation = ref({
  isValid:   false,
  isInvalid: false
});

const validateEmailInput = () => {
  emailValidation.value.isValid = false;
  emailValidation.value.isInvalid = false;
  if (signUpRequest.value.email === '') return;
  validateEmail(signUpRequest.value.email)
    ? emailValidation.value.isValid = true
    : emailValidation.value.isInvalid = true;
}

</script>
<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <ion-item :class="{ 'ion-valid': emailValidation.isValid, 'ion-invalid': emailValidation.isInvalid }">
          <ion-label position="floating">Email</ion-label>
          <ion-input
            v-model="signUpRequest.email"
            @ionInput="validateEmailInput"
            placeholder="Enter your email"
            type="email"
          >
          </ion-input>
          <ion-note slot="helper">Enter a valid email</ion-note>
          <ion-note slot="error">Invalid email</ion-note>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="6">
        <ion-item>
          <ion-label position="floating">First name</ion-label>
          <ion-input v-model="signUpRequest.firstName" placeholder="Enter your first name"></ion-input>
        </ion-item>
      </ion-col>
      <ion-col size="6">
        <ion-item>
          <ion-label position="floating">Last name</ion-label>
          <ion-input v-model="signUpRequest.lastName" placeholder="Enter your last name"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="12">
        <ion-item>
          <ion-label position="floating">Age</ion-label>
          <ion-input v-model="signUpRequest.age" placeholder="Enter your age" type="number"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="12">
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input placeholder="Enter your password" type="password"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="12">
        <ion-item>
          <ion-label position="floating">Confirm password</ion-label>
          <ion-input placeholder="Confirm your password" type="password"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row class="ion-margin-top">
      <ion-col size="12" class="center">
        <ion-button expand="block">Sign up</ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
