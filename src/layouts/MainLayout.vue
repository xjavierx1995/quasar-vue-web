<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="custom-toolbar justify-center">
        <div>
          <filter-component></filter-component>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import FilterComponent from 'src/components/FilterComponent.vue';
import { ref } from 'vue';

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<style lang="scss">
.custom-toolbar {
  background: url('../assets/bg.svg');
}
</style>
