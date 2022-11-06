<script setup lang="ts">
import { ref, watch } from 'vue';
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
import SignUpForm from '@/models/ui/SignUpForm';

const signUpRequest = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  age: '',
  role: Role.User
} as SignUpForm);

const emailValidation = ref({
  isValid:   false,
  isInvalid: false
});

const passwordValidation = ref({
  isValid:   false,
  isInvalid: false,
  message:   ''
});

const validateEmailInput = () => {
  emailValidation.value.isValid = false;
  emailValidation.value.isInvalid = false;
  if (signUpRequest.value.email === '') return;
  if (validateEmail(signUpRequest.value.email)) {
    emailValidation.value.isValid = true;
    emailValidation.value.isInvalid = false;
  } else {
    emailValidation.value.isValid = false;
    emailValidation.value.isInvalid = true;
  }
}

const validatePasswordInput = () => {
  passwordValidation.value.isValid = false;
  passwordValidation.value.isInvalid = false;
  if (signUpRequest.value.password === '') return;
  if (signUpRequest.value.password.length < 6) {
    passwordValidation.value.isValid = false;
    passwordValidation.value.isInvalid = true;
    passwordValidation.value.message = 'Password must be at least 6 characters long';
  } else if ((signUpRequest.value.password !== signUpRequest.value.passwordConfirm) && signUpRequest.value.passwordConfirm !== '') {
    passwordValidation.value.isValid = false;
    passwordValidation.value.isInvalid = true;
    passwordValidation.value.message = 'Passwords do not match';
  } else {
    passwordValidation.value.isValid = true;
    passwordValidation.value.isInvalid = false;
  }
}


watch(signUpRequest.value, () => {
  if (signUpRequest.value.email !== '') validateEmailInput();
  if (signUpRequest.value.password !== '') validatePasswordInput();
});

</script>
<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <ion-item :class="{ 'ion-valid': emailValidation.isValid, 'ion-invalid': emailValidation.isInvalid }">
          <ion-label position="floating">Email</ion-label>
          <ion-input
            v-model="signUpRequest.email"
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
        <ion-item :class="{ 'ion-valid': passwordValidation.isValid, 'ion-invalid': passwordValidation.isInvalid }">
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="signUpRequest.password" placeholder="Enter your password" type="password"></ion-input>
          <ion-note slot="helper">Enter your password</ion-note>
          <ion-note slot="error">{{ passwordValidation.message }}</ion-note>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="12">
        <ion-item :class="{ 'ion-valid': passwordValidation.isValid, 'ion-invalid': passwordValidation.isInvalid }">
          <ion-label position="floating">Confirm password</ion-label>
          <ion-input v-model="signUpRequest.passwordConfirm" placeholder="Confirm your password" type="password"></ion-input>
          <ion-note slot="helper">Confirm your password</ion-note>
          <ion-note v-if="signUpRequest.passwordConfirm!==''" slot="error">{{ passwordValidation.message }}</ion-note>
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
