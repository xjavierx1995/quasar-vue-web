<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-tabs v-model="tabSelected" dense class="text-grey" active-color="primary" indicator-color="primary"
        align="justify" narrow-indicator>
        <q-tab @click="searchCharacters" v-for="tab in availableTabs" :key="tab.value" :name="tab.value"
          :label="tab.label" />
      </q-tabs>

      <q-separator />

      <h6>
        Mostrar favoritos:
        <q-btn @click="showMyFavorites" round :style="'background: #F2F2F2; color:' + getColor()" icon="star" />
      </h6>

      <q-tab-panels v-model="tabSelected" animated>
        <q-tab-panel v-for="tab in availableTabs" :key="tab.value" :name="tab.value">
          <div class="row">
            <div class="col-2" v-for="(character, index) in characterRef.characterList.value" :key="index">
              <CharacterCard :main-character="character"></CharacterCard>
            </div>
          </div>
        </q-tab-panel>

        <HelloWorldVue :text="'hola mundo'"></HelloWorldVue>

      </q-tab-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ITabs } from 'src/interface/Tabs.interface';
import { onMounted, ref } from 'vue';
import { characterStore } from '../stores/characters-store';
import { storeToRefs } from 'pinia';
import CharacterCard from './CharacterCard.vue';
// import { HelloWorldVue } from 'squadmakers-test-library'

interface Props {
  availableTabs: ITabs[];
}

withDefaults(defineProps<Props>(), {
  availableTabs: () => [],
});

const { getCharacters, selectedFilters, showFavorites, getFavorites } = characterStore();
const characterRef = storeToRefs(characterStore());
const tabSelected = ref<'female' | 'male' | 'genderless' | 'unknown' | 'all'>('all');

function searchCharacters() {
  selectedFilters.gender = tabSelected.value;
  getCharacters(selectedFilters);
}

function showMyFavorites() {
  characterRef.showFavorites.value = !characterRef.showFavorites.value;
  characterRef.showFavorites.value ? getFavorites() : getCharacters();
}

function getColor(): string {
  return characterRef.showFavorites.value ? '#F2994A' : '#828282';
}

onMounted(() => {
  getCharacters();
})
</script>
