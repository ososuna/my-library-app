<script setup lang="ts">
import { ref } from 'vue';
import {
  IonContent,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  modalController
} from '@ionic/vue';
import {
  personCircleOutline,
  settingsOutline,
  logOutOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { useAuth } from '@/hooks/useAuth';
import EditUserModalComponent from '@/components/user/EditUserModalComponent.vue';
const { currentAuthState, logout } = useAuth();
const router = useRouter();
const menuItems = ref([
  {
    title: 'My Profile',
    pathName: 'myProfile',
    icon: personCircleOutline
  },
  {
    title: 'Settings',
    pathName: 'settings',
    icon: settingsOutline
  },
  {
    title: 'Logout',
    pathName: 'logout',
    icon: logOutOutline
  }
]);

const openEditUserModal = async () => {
  console.log('first');
  const modal = await modalController.create({
    component: EditUserModalComponent
  });
  return modal.present();
};

const onClickMenuOption = ( pathName: string ) => {
  switch (pathName) {
    case 'logout':
      logout();
      router.push({ name: 'log-in' })
      break;
    case 'myProfile':
      openEditUserModal();
      break;  
    default:
      break;
  }
};
</script>
<template>
  <ion-menu :disabled="currentAuthState!=='authenticated'" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <div v-for="(item, index) in menuItems" :key="index">
          <ion-item @click="onClickMenuOption(item.pathName)">
            <ion-icon :icon="item.icon" class="ion-margin-end"></ion-icon>
            <ion-label>{{ item.title }}</ion-label>
          </ion-item>
        </div>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>