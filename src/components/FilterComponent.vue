<template>
  <div>
    <q-input bg-color="#081F32" filled outlined v-model="filter.name" placeholder="Buscar personaje..."
      @update:model-value="search">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
      <template v-slot:append>
        <q-btn round icon="tune" flat @click="openModal = true" />
      </template>
    </q-input>

    <div class="applied-filters">
      <span>Filtro aplicado:</span> {{ characterRef.getSelectedFilters.value.replace('"', '') }}
    </div>
  </div>

  <q-dialog v-model="openModal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Aplicar filtros</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="filter.species" autofocus label="Especie" />
        <q-input dense v-model="filter.type" autofocus label="Tipo" />
        <q-select v-model="filter.status" :options="statusSelect" label="Estado" />
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
import { IFilter } from 'src/interface/Character.interface';
import { characterStore } from 'src/stores/characters-store';
import { ref } from 'vue';
const characterRef = storeToRefs(characterStore());
const { getCharacters } = characterStore();
const openModal = ref<boolean>(false)

const statusSelect = ref<string[]>(['alive', 'dead', 'unknown']);

const filter = ref<IFilter>({ ...characterRef.selectedFilters.value });

function search() {
  characterRef.selectedFilters.value = { ...filter.value };
  getCharacters();
}
</script>
<style lang="scss">
.applied-filters {
  font-family: Montserrat;
  font-weight: 400;
  background: white;
  border-radius: 6px;
  padding: 7px 10px;
  color: #081F32;

  span {
    font-weight: 600;
    color: #34C759;
  }
}
</style>
