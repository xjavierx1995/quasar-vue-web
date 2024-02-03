<template>
  <div>
    <q-input outlined v-model="characterRef.selectedFilters.value.name" placeholder="Buscar personaje..."
      @update:model-value="search">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
      <template v-slot:append>
        <q-btn round icon="tune" flat @click="openModal = true" />
      </template>
    </q-input>
  </div>

  <q-dialog v-model="openModal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Aplicar filtros</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="characterRef.selectedFilters.value.species" autofocus label="Especie" />
        <q-input dense v-model="characterRef.selectedFilters.value.type" autofocus label="Tipo" />
        <q-select v-model="characterRef.selectedFilters.value.status" :options="statusSelect" label="Estado" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn flat label="Aceptar" @click="search" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { characterStore } from 'src/stores/characters-store';
import { ref } from 'vue';
const characterRef = storeToRefs(characterStore());
const { getCharacters } = characterStore();
const openModal = ref<boolean>(false)

const statusSelect = ref<string[]>(['alive', 'dead', 'unknown']);

function search() {
  getCharacters(characterRef.selectedFilters.value);
}
</script>
