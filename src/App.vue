<script setup lang="ts">
import { store, UPGRADES } from './store'
import Pumpkin from './components/Pumpkin.vue'
import HUD from './components/HUD.vue'

store.loadData()
</script>

<template>
  <div class="game">
    <HUD />
    <div class="congrats" :class="{ offset: store.isShopOpened, show: store.upgrades[UPGRADES.length - 1] === 1 }">
      Happy Halloween
    </div>
    <Pumpkin />
  </div>
</template>

<style>
body {
  background-color: #000;
  height: 100svh;
  overflow: hidden;
}

.game {
  height: 100svh;
  user-select: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  background: url(assets/img/bg-forest.svg) center center / cover no-repeat;
}

.congrats {
  color: #fff;
  font-family: 'Londrina Sketch', sans-serif;
  font-size: 48px;
  line-height: 1;
  padding: 8px 16px;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 20;
  border-radius: 8px;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  background-color: #000;
  animation: flickering 2s infinite linear;
  transition: transform 0.3s ease-in-out;
  display: none;

  &.show {
    display: block;
  }

  @media (min-width: 768px) {
    font-size: 76px;
    padding: 16px 32px;

    &.offset {
      transform: translate(-67%, -50%);
    }
  }
}

@keyframes flickering {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
</style>
