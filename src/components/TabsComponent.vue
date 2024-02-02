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
          <q-tab @click="doSmt" v-for="tab in availableTabs" :key="tab.value" :name="tab.value" :label="tab.label" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tabSelected" animated>
          <q-tab-panel v-for="tab in availableTabs" :key="tab.value" name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ITabs } from 'src/interface/Tabs.interface';
import { onMounted, ref } from 'vue';
import { characterStore } from '../stores/characters-store';

interface Props {
  availableTabs: ITabs[];
}

const props = withDefaults(defineProps<Props>(), {
  availableTabs: () => [],
});

const character = characterStore();
const tabSelected = ref<string>(props.availableTabs[0].value);



function doSmt() {
  console.log(tabSelected.value);

}

onMounted(() => {
  character.getCharacters();
})
</script>
