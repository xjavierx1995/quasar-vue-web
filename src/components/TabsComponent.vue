<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-tabs v-model="tabSelected" dense class="text-grey" active-color="primary" indicator-color="primary"
        align="justify" narrow-indicator>
        <q-tab @click="searchCharacters" v-for="tab in availableTabs" :key="tab.value" :name="tab.value"
          :label="tab.label" />
      </q-tabs>

      <q-separator />
      <div class="tab-content">
        <div class="favorites-button">
          Mostrar favoritos:
          <q-btn @click="showMyFavorites" flat round :style="'background: #F2F2F2; color:' + getColor()" icon="star" />
        </div>

        <q-tab-panels v-model="tabSelected" animated>
          <q-tab-panel v-for="tab in availableTabs" :key="tab.value" :name="tab.value">
            <div class="cards-container">
              <SquadCard v-for="(character, index) in characterRef.characterList.value" :key="index"
                :character="character" :favorite="isFavorite(character)" @manageFavorite="addOrDeleteFavorite"
                @showProfile="showModalProfile">
              </SquadCard>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ITabs } from 'src/interface/Tabs.interface';
import { onMounted, ref } from 'vue';
import { characterStore } from '../stores/characters-store';
import { storeToRefs } from 'pinia';
import { SquadCard } from 'squadmakers-vue-library';
import { ICharacter } from 'src/interface/Character.interface';

interface Props {
  availableTabs: ITabs[];
}

withDefaults(defineProps<Props>(), {
  availableTabs: () => [],
});

const { getCharacters, getFavorites, isFavorite, deleteFavorite, addFavorite } = characterStore();
const characterRef = storeToRefs(characterStore());
const tabSelected = ref<'female' | 'male' | 'genderless' | 'unknown' | 'all'>('all');

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

function addOrDeleteFavorite(character: ICharacter, isFav: boolean) {
  isFav ? deleteFavorite(character) : addFavorite(character);
}

function showModalProfile(character: ICharacter) {
  console.log(character);
}

onMounted(() => {
  getCharacters();
})
</script>

<style scoped>
.tab-content {
  margin-inline: 10%;

  @media (max-width: 640px) {
    margin-inline: 0;
  }

  .favorites-button {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    margin-bottom: 20px;
  }
}



.q-tab-panel {
  padding: 0 !important;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}
</style>
