<template>
  <q-page>
    <TabsComponent :available-tabs="availableTabs"/>
  </q-page>
</template>

<script setup lang="ts">
import { ITabs } from '../interface/Tabs.interface'
import TabsComponent from 'components/TabsComponent.vue';
import { ref } from 'vue';
const availableTabs = ref<ITabs[]>([
  {
    label: 'All',
    value: ''
  },
  {
    label: 'Unknown',
    value: 'unknown'
  },
  {
    label: 'Female',
    value: 'female'
  },
  {
    label: 'Male',
    value: 'male'
  },
  {
    label: 'Genderless',
    value: 'genderless'
  },

]);
</script>
