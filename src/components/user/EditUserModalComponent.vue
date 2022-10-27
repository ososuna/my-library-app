<script setup lang="ts">
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
  modalController
} from '@ionic/vue';

const saveUpdateProfile = () => {
  console.log('saveUpdateProfile');
};

const closeModal = () => {
  modalController.dismiss();
};

</script>
<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="closeModal">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Update profile</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="saveUpdateProfile">Send</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label position="stacked">Name</ion-label>
      <ion-input placeholder="Book's name"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Author</ion-label>
      <ion-input placeholder="Book's author"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Description</ion-label>
      <ion-input placeholder="Book's description"></ion-input>
    </ion-item>
  </ion-content>
</template>
