<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonFabButton,
  IonFab,
  modalController
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import FormModalBookComponent from '@/components/FormModalBookComponent.vue';
import ListBookComponent from '@/components/ListBookComponent.vue';
import Book from '@/models/Book';
const books = [
  {
    name: 'Clean Architecture',
    author: 'Robert C. Martin',
    description: 'Clean Architecture: A Craftsman\'s Guide to Software Structure and Design is a book on software architecture by Robert C. Martin, published in 2017. The book is a distillation of Martin\'s 40 years of experience in software development and architecture. It is a guide to developing software that is easy to understand, change, and deploy.'
  },
  {
    name: 'A Song of Ice and Fire',
    author: 'George R. R. Martin',
    description: 'A Song of Ice and Fire is a series of epic fantasy novels by the American novelist and screenwriter George R. R. Martin. He began the first volume of the series, A Game of Thrones, in 1991, and it was published in 1996. Martin, who initially envisioned the series as a trilogy, has published five out of a planned seven volumes. The most recent volume, A Dance with Dragons, was published in 2011.'
  }
] as Book[];
const openCreateModal = async () => {
  const modal = await modalController.create({
    component: FormModalBookComponent
  });
  return modal.present();
};
const openUpdateModal = async ( book: Book ) => {
  const modal = await modalController.create({
    component: FormModalBookComponent,
    componentProps: {
     book
    }
  });
  return modal.present();
};
</script>
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>My Library</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">My Library</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <ListBookComponent
          :books="books"
          @onClick="openUpdateModal"
        />
      </div>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openCreateModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}

ion-icon {
  color: white;
}
</style>
