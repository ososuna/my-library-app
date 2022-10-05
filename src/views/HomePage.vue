<script setup lang="ts">
import { ref } from 'vue';
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
import { useBook } from '../hooks/useBook';
import Book from '@/models/Book';

const { getBooks } = useBook();
const books = ref<Book[]>([]);

const loadBooks = async () => {
  const { ok, data } = await getBooks();
  if ( ok ) {
    books.value = data;
  }
};
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

loadBooks();
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
