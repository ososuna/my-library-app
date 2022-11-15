<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import CardNoteComponent from '@/components/note/CardNoteComponent.vue';
import Note from '@/models/Note';
defineProps({
  notes: {
    type: Array as PropType<Note[]>,
    required: true
  }
})
</script>

<template>
  <CardNoteComponent
    v-for="(note, index) in notes" :key="index"
    :note="note"
  />
</template>
