<template>
  <div class="text-black text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 4vh; color: #353535">
        Uh-oh!
      </div>

      <div style="font-size: 2vh; color: #5E5E5E;">
        ¡Pareces perdido en tu viaje!
      </div>

      <q-btn class="q-mt-md" unelevated rounded to="/" @click="restore" label="Eliminar filtros" no-caps
        style="background: #11555F; color: white" />
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
