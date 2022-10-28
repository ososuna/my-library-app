<script setup lang="ts">
import { ref } from 'vue';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  modalController
} from '@ionic/vue';
import { Camera, CameraResultType } from '@capacitor/camera';
import { useAuth } from '@/hooks/useAuth';
import { useUi } from '@/hooks/useUi';
import { useUser } from '@/hooks/useUser';
import User from '@/models/User';

const { loggedUser } = useAuth();
const { setAlertMessage } = useUi();

const userForm = ref(loggedUser.value as User);
const { updateUser } = useUser();

const closeModal = () => {
  modalController.dismiss();
};

const saveUpdateProfile = async() => {
  const { ok, message } = await updateUser(userForm.value);
  setAlertMessage(message);
  if ( ok ) closeModal();
};

const takeProfilePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Base64,
    saveToGallery: true
  });
  console.log(image);
};

</script>
<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="closeModal">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Edit profile</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="saveUpdateProfile">Save</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row class="ion-margin-bottom">
        <ion-col size="12">
          <div align="center">
            <ion-avatar @click="takeProfilePhoto">
              <img
                alt="profile-photo"
                :src="userForm.profileImageUrl || 'https://ionicframework.com/docs/img/demos/avatar.svg'"
              />
            </ion-avatar>
          </div>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">First name</ion-label>
            <ion-input v-model="userForm.firstName" placeholder="First name"></ion-input>
          </ion-item>
        </ion-col>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Last name</ion-label>
            <ion-input v-model="userForm.lastName" placeholder="Last name"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input v-model="userForm.email" type="email" placeholder="Email"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="6">
          <ion-item>
            <ion-label position="stacked">Age</ion-label>
            <ion-input v-model="userForm.age" type="number" placeholder="Age"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>
