<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
        <q-tabs
          v-model="tabSelected"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator

        >
          <q-tab @click="searchCharacters" v-for="tab in availableTabs" :key="tab.value" :name="tab.value" :label="tab.label" />
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
import { onMounted, ref } from 'vue';
import { characterStore } from '../stores/characters-store';
import { storeToRefs } from 'pinia';

interface Props {
  availableTabs: ITabs[];
}

const props = withDefaults(defineProps<Props>(), {
  availableTabs: () => [],
});

const { getCharacters } = characterStore();
const characterRef = storeToRefs(characterStore());
const tabSelected = ref<string>(props.availableTabs[0].value);



function searchCharacters() {
  getCharacters(tabSelected.value);
}

onMounted(() => {
  getCharacters();
})
</script>
