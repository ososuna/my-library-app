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
import { b64toBlob } from '@/helpers/b64toBlob';
import { useAuth } from '@/hooks/useAuth';
import { useUi } from '@/hooks/useUi';
import { useUser } from '@/hooks/useUser';
import ImageFile from '@/models/file/ImageFile';
import User from '@/models/User';

const { loggedUser, loggedUserId } = useAuth();
const { setAlertMessage } = useUi();
const { updateUser } = useUser();

const userForm = ref(loggedUser.value as User);

const imageToUpload = ref({} as ImageFile);

const closeModal = () => {
  modalController.dismiss();
};

const saveUpdateProfile = async() => {
  const formData = new FormData();
  const userBlob = new Blob([JSON.stringify(userForm.value)], { type: 'application/json' });
  formData.append('user', userBlob);
  formData.append('file', imageToUpload.value.file as Blob, imageToUpload.value.name);
  const { ok, message } = await updateUser(loggedUserId.value, formData);
  setAlertMessage(message);
  if ( ok ) closeModal();
};

const getAvatarSrc = () => {
  if (imageToUpload.value.file) {
    return URL.createObjectURL(imageToUpload.value.file);
  } else {
    return userForm.value.profileImageUrl || 'https://ionicframework.com/docs/img/demos/avatar.svg';
  }
};

const takeProfilePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Base64,
    saveToGallery: true
  });
  if (image.base64String) {
    imageToUpload.value = {
      name: `profile-user-${ loggedUserId.value }.jpeg`,
      file: b64toBlob(image.base64String, 'image/jpeg')
    };
  }
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
                :src="getAvatarSrc()"
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
