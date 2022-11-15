<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonFabButton,
  IonFab,
  IonMenuButton,
  IonButtons,
  modalController
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import FormModalBookComponent from '@/components/book/FormModalBookComponent.vue';
import ListBookComponent from '@/components/book/ListBookComponent.vue';
import { useAuth } from '@/hooks/useAuth';
import { useBook } from '@/hooks/useBook';
import { useUi } from '@/hooks/useUi';
import Book from '@/models/Book';

const APP_NAME = process.env.VUE_APP_NAME;

const { loggedUserId } = useAuth();
const { deleteBook, getBooksByUser } = useBook();
const { openConfirmModal, setLoading } = useUi();
const router = useRouter();
const booksLoaded = ref(false);

const books = ref<Book[]>([]);

const init = async() => {
  setLoading(true, 'Loading books...');
  await loadBooks();
  setLoading(false, '');
};

const loadBooks = async () => {
  const { ok, data } = await getBooksByUser( loggedUserId.value );
  if ( ok ) books.value = data;
  booksLoaded.value = true;
};

const onSave = async() => {
  await loadBooks();
};

const openCreateModal = async () => {
  const modal = await modalController.create({
    component: FormModalBookComponent,
    componentProps: {
      onSave
    }
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

const saveDeleteBook = async(id: number) => {
  const decision = await openConfirmModal('Are you sure you want to delete this book?');
  if (!decision) return;
  setLoading(true, 'Deleting book...');
  const { ok } = await deleteBook(id);
  if (ok) await loadBooks();
  setLoading(false, '');
};

const onClick = (book: Book) => {
  router.push({ name: 'note', params: { bookId: book.id } });
};

onMounted(async() => {
  await init();
});

</script>
<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ APP_NAME }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ APP_NAME }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ListBookComponent
        :books="books"
        @onClick="onClick"
        @onDelete="saveDeleteBook"
        @onUpdate="openUpdateModal"
      />
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openCreateModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
