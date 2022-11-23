<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { 
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue';
import Note from '@/models/Note';
defineProps ({
  note: {
    type: Object as PropType<Note>,
    required: true
  }
});
</script>
<template>
<ion-card>
  <ion-card-header>
    <ion-card-subtitle>
      {{ note.date }}
    </ion-card-subtitle>
    <ion-card-title>{{ note.name }}</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    <p>{{ note.description }}</p>
  </ion-card-content>
</ion-card>
</template>
