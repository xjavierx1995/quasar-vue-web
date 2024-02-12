<template>
  <q-dialog :model-value="isOpen" style="max-width: 600px;" @hide="$emit('close')">
    <q-card class="my-card" style="width: -webkit-fill-available; border-radius: 10px;" v-if="character">
      <q-img src="../assets/modal_bg.svg">
        <div class="text-subtitle2 absolute-top text-right">
          <q-btn color="white" text-color="blue-grey-10" round icon="close" @click="$emit('close')"></q-btn>
        </div>
      </q-img>

      <q-card-section class="section-title">
        <!-- <q-btn round > -->
        <q-avatar class="absolute character-avatar" size="150px" style="top: 0; transform: translateY(-50%);">
          <img :src="character.image">
          <q-btn @click="addOrDeleteFavorite(character, isFavorite(character))" flat round
            style="position: absolute; bottom: -17px; background: #F2F2F2;"
            :style="'color:' + getColor(isFavorite(character))" icon="star" />
        </q-avatar>
        <!-- </q-btn> -->

      </q-card-section>

      <q-card-section class="q-pt-none section-title">
        <div class="text-subtitle3">
          {{ character.status }}
        </div>
        <div class="row no-wrap">
          <div class="col text-h6 ellipsis">
            {{ character.name }}
          </div>
        </div>
        <div class="text-subtitle3">
          {{ character.species }}
        </div>
      </q-card-section>

      <q-card-section>
        <div class="col text-h6 ellipsis q-mb-sm">Información</div>

        <div class="card-information">
          <CardInfoVue title="Gender" :info="character.gender"></CardInfoVue>
          <CardInfoVue title="Origin" :info="character.origin.name"></CardInfoVue>
          <CardInfoVue title="Type" :info="character.type ? character.type : 'unknown'"></CardInfoVue>
        </div>
      </q-card-section>

      <q-separator class="q-ma-md" />

      <q-card-section>
        <div class="col text-h6 ellipsis q-mb-sm">Episodios</div>

        <div class="episodes-container">
          <CardInfoVue v-for="(item, index) in character.episode" :key="index" :episode="item"></CardInfoVue>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="col text-h6 ellipsis q-mb-sm">Personajes interesantes</div>

        <div class="episodes-container">
          <SquadCard v-for="(character, index) in randomCharacter" :key="index" :character="character"
            :favorite="isFavorite(character)" @manageFavorite="addOrDeleteFavorite">
          </SquadCard>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="q-mt-md" unelevated rounded to="/" label="Compartir personaje" no-caps
          style="background: #11555F; color: white" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ICharacter } from 'src/interface/Character.interface';
import CardInfoVue from './CardInfo.vue';
import { characterStore } from 'src/stores/characters-store';
import { SquadCard } from 'squadmakers-vue-library';
import { watch, ref } from 'vue';

const props = defineProps<{
  isOpen: boolean,
  character?: ICharacter
}>();

const { getRandomCharacters, deleteFavorite, addFavorite, isFavorite } = characterStore();

const randomCharacter = ref<ICharacter[]>()

function addOrDeleteFavorite(character: ICharacter, isFav: boolean) {
  isFav ? deleteFavorite(character) : addFavorite(character);
}

function getColor(isFav: boolean): string {
  return isFav ? '#F2994A' : '#828282';
}

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    randomCharacter.value = getRandomCharacters;
  }
}
)

</script>
<style lang="scss">
.q-avatar__content {
  border: 4px solid white;
}

.section-title {
  background: #F2F2F2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 70px;

  .character-avatar {
    border-color: #F2F2F2;
  }
}

.card-information {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.episodes-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(115px, 1fr));
  gap: 16px;
}

.q-img__content>div {
  background: transparent !important;
}

.q-dialog__inner--minimized>div {
  max-width: 600px;
}
</style>
