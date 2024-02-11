<template>
  <div class="bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps />
      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" @click="restore" label="Restaurar filtros"
        no-caps />
    </div>
  </div>
</template>

<script setup lang="ts">
import { characterStore } from 'src/stores/characters-store';
const { getCharacters, restoreFilters } = characterStore();

function restore() {
  restoreFilters();
  getCharacters();
}
</script>
