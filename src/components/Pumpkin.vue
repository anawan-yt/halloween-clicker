<script setup lang="ts">
import { store } from '../store'

function handleHit(e: Event) {
  store.hit()
  const el = e.currentTarget as HTMLElement
  el.classList.remove('hit')
  void el.offsetWidth
  el.classList.add('hit')
}
</script>

<template>
  <div class="container" :class="{ offset: store.isShopOpened }">
    <div class="pumpkin" @click="handleHit"><span></span></div>
  </div>
</template>

<style scoped>
.container {
  width: 30%;
  min-width: 240px;
  aspect-ratio: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease-in-out;
  touch-action: manipulation;

  &.offset {
    transform: translate(-50%, -75%);

    @media (min-width: 768px) {
      transform: translate(-75%, -50%);
    }
  }
}
.pumpkin {
  display: block;
  width: 100%;
  height: 100%;

  &.hit {
    animation: takeDamage 0.3s ease-out;
  }

  span {
    display: block;
    width: 100%;
    height: 100%;
    animation: smallRotate 2s infinite ease-in-out;
    background: url(../assets/img/pumpkin.svg) center center / cover;
  }
}

@keyframes smallRotate {
  0% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(-3deg);
  }
}

@keyframes takeDamage {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}
</style>
