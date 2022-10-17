<script setup lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton  
} from '@ionic/vue';
</script>
<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input placeholder="Enter your email"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="6">
        <ion-item>
          <ion-label position="floating">First name</ion-label>
          <ion-input placeholder="Enter your first name"></ion-input>
        </ion-item>
      </ion-col>
      <ion-col size="6">
        <ion-item>
          <ion-label position="floating">Last name</ion-label>
          <ion-input placeholder="Enter your last name"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="12">
        <ion-item>
          <ion-label position="floating">Age</ion-label>
          <ion-input placeholder="Enter your age" type="number"></ion-input>
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
