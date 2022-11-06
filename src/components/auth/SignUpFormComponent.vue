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
import { useRouter } from 'vue-router';
import { validateEmail } from '@/helpers/validateEmail';
import { useAuth } from '@/hooks/useAuth';
import { useUi } from '@/hooks/useUi';
import Role from '@/models/auth/Role';
import SignUpForm from '@/models/ui/SignUpForm';

const { createUser } = useAuth();
const { setAlertMessage } = useUi();
const router = useRouter();

const signUpForm = ref({
  firstName: 'Jian',
  lastName: 'Yang',
  email: 'admin@test.com',
  password: '123456',
  passwordConfirm: '123456',
  age: 12,
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

const errorMessage = ref('');

const validateEmailInput = () => {
  emailValidation.value.isValid = false;
  emailValidation.value.isInvalid = false;
  if (signUpForm.value.email === '') return;
  if (validateEmail(signUpForm.value.email)) {
    emailValidation.value.isValid = true;
    emailValidation.value.isInvalid = false;
    errorMessage.value = '';
  } else {
    emailValidation.value.isValid = false;
    emailValidation.value.isInvalid = true;
    errorMessage.value = 'Invalid email';
  }
}

const validatePasswordInput = () => {
  passwordValidation.value.isValid = false;
  passwordValidation.value.isInvalid = false;
  if (signUpForm.value.password === '') return;
  if (signUpForm.value.password.length < 6) {
    passwordValidation.value.isValid = false;
    passwordValidation.value.isInvalid = true;
    passwordValidation.value.message = 'Password must be at least 6 characters long';
    errorMessage.value = passwordValidation.value.message;
  } else if ((signUpForm.value.password !== signUpForm.value.passwordConfirm) && signUpForm.value.passwordConfirm !== '') {
    passwordValidation.value.isValid = false;
    passwordValidation.value.isInvalid = true;
    passwordValidation.value.message = 'Passwords do not match';
    errorMessage.value = passwordValidation.value.message;
  } else {
    passwordValidation.value.isValid = true;
    passwordValidation.value.isInvalid = false;
    errorMessage.value = '';
  }
}

const onSubmit = async() => {
  if (errorMessage.value !== '') {
    setAlertMessage(errorMessage.value);
    return;
  }
  const { passwordConfirm, ...signUpRequest } = signUpForm.value;
  const { ok, message } = await createUser(signUpRequest);
  if (!ok) {
    setAlertMessage(message);
    return;
  }
  router.push({ name: 'home' });
}

watch(signUpForm.value, () => {
  if (signUpForm.value.email !== '') validateEmailInput();
  if (signUpForm.value.password !== '') validatePasswordInput();
});

</script>
<template>
  <ion-grid>
    <form @submit.prevent="onSubmit">
      <ion-row>
        <ion-col size="12">
          <ion-item :class="{ 'ion-valid': emailValidation.isValid, 'ion-invalid': emailValidation.isInvalid }">
            <ion-label position="floating">Email</ion-label>
            <ion-input
              required
              v-model="signUpForm.email"
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
            <ion-input required v-model="signUpForm.firstName" placeholder="Enter your first name"></ion-input>
            <ion-note slot="error">Enter your first name</ion-note>
          </ion-item>
        </ion-col>
        <ion-col size="6">
          <ion-item>
            <ion-label position="floating">Last name</ion-label>
            <ion-input required v-model="signUpForm.lastName" placeholder="Enter your last name"></ion-input>
            <ion-note slot="error">Enter your last name</ion-note>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-item>
            <ion-label position="floating">Age</ion-label>
            <ion-input required v-model="signUpForm.age" placeholder="Enter your age" type="number"></ion-input>
            <ion-note slot="error">Enter a valid age</ion-note>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-item :class="{ 'ion-valid': passwordValidation.isValid, 'ion-invalid': passwordValidation.isInvalid }">
            <ion-label position="floating">Password</ion-label>
            <ion-input required v-model="signUpForm.password" placeholder="Enter your password" type="password"></ion-input>
            <ion-note slot="helper">Enter your password</ion-note>
            <ion-note slot="error">{{ passwordValidation.message }}</ion-note>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-item :class="{ 'ion-valid': passwordValidation.isValid, 'ion-invalid': passwordValidation.isInvalid }">
            <ion-label position="floating">Confirm password</ion-label>
            <ion-input required v-model="signUpForm.passwordConfirm" placeholder="Confirm your password" type="password"></ion-input>
            <ion-note slot="helper">Confirm your password</ion-note>
            <ion-note v-if="signUpForm.passwordConfirm!==''" slot="error">{{ passwordValidation.message }}</ion-note>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row class="ion-margin-top">
        <ion-col size="12" class="center">
          <ion-button type="submit" expand="block">Sign up</ion-button>
        </ion-col>
      </ion-row>
    </form>
  </ion-grid>
</template>
