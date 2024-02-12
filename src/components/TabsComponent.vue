<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <div class="tab-content">
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

const { getCharacters, isFavorite, deleteFavorite, addFavorite } = characterStore();
const characterRef = storeToRefs(characterStore());
const tabSelected = ref<'female' | 'male' | 'genderless' | 'unknown' | 'all'>('all');

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
  margin-inline: 7.5%;

  @media (max-width: 640px) {
    margin-inline: 0;
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
