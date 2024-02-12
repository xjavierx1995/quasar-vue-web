<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="custom-toolbar justify-center">
        <div>
          <filter-component></filter-component>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div>
        <div class="q-gutter-y-md">
          <q-tabs v-model="tabSelected" dense class="text-black" indicator-color="green" align="justify"
            style="background: #F2F2F2;">
            <q-tab @click="searchCharacters" to="/" v-for="tab in availableTabs" :key="tab.value" :name="tab.value"
              :label="tab.label" />
          </q-tabs>
        </div>
      </div>

      <q-separator class="q-mb-md" />

      <div class="q-pa-md q-mt-md">
        <div class="favorites-button">
          Mostrar favoritos:
          <q-btn @click="showMyFavorites" flat round :style="'background: #F2F2F2; color:' + getColor()" icon="star" />
        </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import FilterComponent from 'src/components/FilterComponent.vue';
import { ref } from 'vue'
import { characterStore } from '../stores/characters-store';
import { ITabs } from 'src/interface/Tabs.interface';

const characterRef = storeToRefs(characterStore());
const { getCharacters, getFavorites } = characterStore();
const tabSelected = ref<'female' | 'male' | 'genderless' | 'unknown' | 'all'>('all');
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

function searchCharacters() {
  characterRef.selectedFilters.value.gender = tabSelected.value;
  getCharacters();
}

function showMyFavorites() {
  characterRef.showFavorites.value = !characterRef.showFavorites.value;
  characterRef.showFavorites.value ? getFavorites() : getCharacters();
}

function getColor(): string {
  return characterRef.showFavorites.value ? '#F2994A' : '#828282';
}
</script>
<style lang="scss">
.custom-toolbar {
  background: url('../assets/bg.svg');
}

.favorites-button {
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  // margin-bottom: 30px;
  margin-top: 30px;
  margin-inline: 7.5%;
}

.q-tab__label {
  padding: 20px;
}
</style>
