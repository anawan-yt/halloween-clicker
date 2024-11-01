<script setup lang="ts">
import { formatNumber, getSVGImageURL } from '../utils'
import { store } from '../store'
import Shop from './Shop.vue'
</script>

<template>
  <div class="counter"><img src="../assets/img/candy.svg" alt="" /> {{ formatNumber(store.count) }}</div>
  <div class="counter click"><img src="../assets/img/mouse.svg" alt="" /> {{ formatNumber(store.damagePerClick) }}</div>
  <div class="counter second">
    <img src="../assets/img/clock.svg" alt="" /> {{ formatNumber(store.damagePerSecond) }}
  </div>
  <button class="sound" @click="store.toggleMute">
    <img :src="getSVGImageURL(`sound-${store.mute ? 'off' : 'on'}`)" alt="" />
  </button>
  <Shop />
</template>

<style scoped>
.counter {
  color: #fff;
  padding: 0 16px;
  height: 48px;
  min-width: 248px;
  background-color: #000;
  border-radius: 100vmax;
  position: absolute;
  top: 16px;
  left: 16px;
  line-height: 48px;
  font-size: 28px;

  img {
    width: 40px;
  }

  &.click,
  &.second {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
    min-width: 180px;

    img {
      width: 30px;
      margin-right: 10px;
    }
  }

  &.click {
    top: 72px;
  }

  &.second {
    top: 120px;
  }
}

.sound {
  color: #fff;
  background-color: #000;
  left: 16px;
  top: 168px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100vmax;
  border: 0;
  width: 48px;
  height: 48px;
  cursor: pointer;
  position: absolute;

  img {
    width: 32px;
  }
}
</style>
