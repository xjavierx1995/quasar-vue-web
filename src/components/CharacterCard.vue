<template>
  <q-card class="my-card">
    <q-card-section horizontal>
      <q-img class="col-5" :src="mainCharacter.image">
        <div class="absolute-bottom text-h6">
          {{ mainCharacter.name }}
          <q-btn @click="addOrDeleteFavorite(mainCharacter, isFavorite(mainCharacter))" round
            :style="'background: #F2F2F2; color:' + getColor(isFavorite(mainCharacter))" icon="star" />
        </div>
      </q-img>

      <q-card-section>
        {{ mainCharacter.location }}
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { ICharacter } from 'src/interface/Character.interface';
import { characterStore } from 'src/stores/characters-store';

defineProps<{
  mainCharacter: ICharacter
}>();


const { addFavorite, isFavorite, deleteFavorite } = characterStore();

function addOrDeleteFavorite(character: ICharacter, isFav: boolean) {
  isFav ? deleteFavorite(character) : addFavorite(character);
}

function getColor(isFav: boolean): string {
  return isFav ? '#F2994A' : '#828282';
}
</script>
