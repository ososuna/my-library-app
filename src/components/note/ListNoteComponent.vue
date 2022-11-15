<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import CardNoteComponent from '@/components/note/CardNoteComponent.vue';
import Note from '@/models/Note';
defineProps({
  note: {
    type: Object as PropType<Note>,
    required: false
  }
})
</script>

<template>
  <CardNoteComponent />
</template>
