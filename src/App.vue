<script setup lang="ts">
import { watch } from 'vue';
import { IonApp, IonRouterOutlet, IonLoading, toastController } from '@ionic/vue';
import { useUi } from '@/hooks/useUi';

const { alert, isLoading } = useUi();

const presentToast = async (message: string) => {
  const toast = await toastController.create({
    message,
    duration: process.env.VUE_APP_ALERT_TIMEOUT,
    position: 'bottom'
  });
  await toast.present();
};

watch(alert, () => {
  if ( alert.value.show ) {
    presentToast(alert.value.message);
  }
});

</script>
<template>
  <ion-app>
    <ion-router-outlet />
      <ion-loading
        :isOpen="isLoading"
        message="Loading books..."
      />
  </ion-app>
</template>
