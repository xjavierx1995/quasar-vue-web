<template>
  <div class="card-info" v-if="!episode">
    <div class="card-subtitle">
      {{ title }}
    </div>
    <div class="card-text">
      {{ info }}
    </div>
    <div v-if="subtitle" class="card-subtitle">
      {{ subtitle }}
    </div>
  </div>

  <div class="card-info" v-if="episode && episodeInfo">
    <div class="card-subtitle">
      {{ episodeInfo.name }}
    </div>
    <div class="card-text">
      {{ episodeInfo.episode }}
    </div>
    <div class="card-subtitle">
      {{ episodeInfo.air_date }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { BaseResponse } from 'src/interface/BaseResponse.interface';
import { onMounted, ref } from 'vue';
import { IEpisode } from '../interface/Episode.interface'

const props = defineProps<{
  episode?: string
  title?: string
  info?: string
  subtitle?: string
}>();

const episodeInfo = ref<any>();

async function getEpisodeInfo() {
  const { data } = await api.get<BaseResponse<IEpisode>>(props.episode!);
  episodeInfo.value = data;
}

onMounted(() => {
  if (props.episode !== '') {
    getEpisodeInfo();
  }
})
</script>
<style lang="scss">
.card-info {
  border: 1px solid #BDBDBD;
  border-radius: 8px;
  padding: 10px;
  width: 130px;

  .card-subtitle {
    font-family: Montserrat;
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: 0.07000000029802322px;
    text-align: left;
    color: #828282;
  }

  .card-text {
    font-family: Montserrat;
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: -0.4099999964237213px;
    text-align: left;
    color: #081F32;
  }
}
</style>
