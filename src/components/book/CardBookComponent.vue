<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue';
import { 
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonItemSliding
} from '@ionic/vue';
import { trash, informationCircleOutline } from 'ionicons/icons';
import Book from '@/models/Book';
defineProps({
  book: {
    type: Object as PropType<Book>,
    required: true
  }
});
const emit = defineEmits(['onClick', 'onDelete', 'onUpdate']);
</script>
<template>
  <ion-item-sliding>
    <ion-item-options side="start">
      <ion-item-option color="danger" @click="emit('onDelete')">
        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
      </ion-item-option>
      <ion-item-option @click="emit('onUpdate')">
        <ion-icon slot="icon-only" :icon="informationCircleOutline"></ion-icon>
      </ion-item-option>
    </ion-item-options>
    <ion-item @click="emit('onClick')">
      <ion-card class="ion-no-margin" style="width:100%;">
        <ion-card-header>
          <ion-card-subtitle>
            {{ book.author }}
          </ion-card-subtitle>
          <ion-card-title>{{ book.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{ book.description }}</p>
        </ion-card-content>
      </ion-card>
    </ion-item>
  </ion-item-sliding>
</template>
