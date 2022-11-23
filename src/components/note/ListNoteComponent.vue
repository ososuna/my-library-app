<script setup lang="ts">
import { defineEmits, defineProps, PropType } from 'vue';
import CardNoteComponent from '@/components/note/CardNoteComponent.vue';
import NoRecordsMessageComponent from '@/components/shared/NoRecordsMessageComponent.vue';
import { useUi } from '@/hooks/useUi';
import Note from '@/models/Note';
defineProps({
  notes: {
    type: Array as PropType<Note[]>,
    required: true
  }
});
const emit = defineEmits(['onClick']);
const { loading } = useUi();
</script>
<template>
  <NoRecordsMessageComponent entity="notes" v-if="(notes.length===0)&&(!loading.show)" />
  <CardNoteComponent
    v-for="(note, index) in notes" :key="index"
    :note="note"
    @click="emit('onClick', note)"
  />
</template>
