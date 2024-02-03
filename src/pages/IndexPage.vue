<template>
  <q-page>
    <h2>Mostrar favoritos:
      <q-btn @click="showFavorites" round :style="'background: #F2F2F2; color:' + getColor(favorites)" icon="star" />
    </h2>
    <TabsComponent :available-tabs="availableTabs" />
  </q-page>
</template>

<script setup lang="ts">
import { ITabs } from '../interface/Tabs.interface'
import TabsComponent from 'components/TabsComponent.vue';
import { ref } from 'vue';
import { characterStore } from '../stores/characters-store';

const { getFavorites, getCharacters } = characterStore();
const availableTabs = ref<ITabs[]>([
  {
    label: 'All',
    value: 'all'
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

const favorites = ref<boolean>(false)

function showFavorites() {
  favorites.value = !favorites.value;
  favorites.value ? getFavorites() : getCharacters();
}

function getColor(isFav: boolean): string {
  return isFav ? '#F2994A' : '#828282';
}
</script>
