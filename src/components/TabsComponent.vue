<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-tabs v-model="tabSelected" dense class="text-grey" active-color="primary" indicator-color="primary"
        align="justify" narrow-indicator>
        <q-tab @click="searchCharacters" v-for="tab in availableTabs" :key="tab.value" :name="tab.value"
          :label="tab.label" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tabSelected" animated>
        <q-tab-panel v-for="tab in availableTabs" :key="tab.value" :name="tab.value">
          <div class="row">
            <div class="col-2" v-for="(character, index) in characterRef.characterList.value" :key="index">
              <q-card class="my-card">
                <q-img :src="character.image">
                  <div class="absolute-bottom text-h6">
                    {{ character.name }}
                    <q-btn @click="addOrDeleteFavorite(character, isFavorite(character))" round
                      :style="'background: #F2F2F2; color:' + getColor(isFavorite(character))" icon="star" />
                  </div>
                </q-img>

                <q-card-section>
                  {{ character.location }}
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ITabs } from 'src/interface/Tabs.interface';
import { ICharacter } from 'src/interface/Character.interface';
import { onMounted, ref } from 'vue';
import { characterStore } from '../stores/characters-store';
import { storeToRefs } from 'pinia';

interface Props {
  availableTabs: ITabs[];
}

const props = withDefaults(defineProps<Props>(), {
  availableTabs: () => [],
});

const { getCharacters, addFavorite, isFavorite, deleteFavorite, selectedFilters } = characterStore();
const characterRef = storeToRefs(characterStore());
const tabSelected = ref<'female' | 'male' | 'genderless' | 'unknown' | 'all'>('all');

function searchCharacters() {
  selectedFilters.gender = tabSelected.value;
  getCharacters(selectedFilters);
}

function addOrDeleteFavorite(character: ICharacter, isFav: boolean) {
  isFav ? deleteFavorite(character) : addFavorite(character);
}

function getColor(isFav: boolean): string {
  return isFav ? '#F2994A' : '#828282';
}

onMounted(() => {
  getCharacters();
})
</script>
