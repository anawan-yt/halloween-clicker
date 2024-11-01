<script setup lang="ts">
import { formatNumber, getSVGImageURL } from '../utils'
import { store, Upgrade, UPGRADES, UpgradeType } from '../store'

let hasOpenedShop = false

function handleBuy(upgrade: Upgrade, num = 1) {
  if (upgrade.price * num > store.count) return
  store.buy(upgrade, num)
}

function handleToggle() {
  hasOpenedShop = true
  store.toggleShop()
}
</script>

<template>
  <div class="shop" :class="{ 'is-open': store.isShopOpened }">
    <button class="toggle" @click="handleToggle">
      <img src="../assets/img/upgrade.svg" alt="" /><span
        :class="{ show: !hasOpenedShop && store.count >= UPGRADES[0].price }"
        >Améliorations disponibles</span
      >
    </button>
    <div class="panel">
      <div class="title">Boutique</div>
      <ul class="items">
        <li v-for="(upgrade, i) in UPGRADES" class="item" :key="i">
          <button
            type="button"
            class="upgrade"
            @click="handleBuy(upgrade)"
            :class="{ 'is-disabled': upgrade.price > store.count }"
          >
            <span class="inner">
              <img :src="getSVGImageURL(upgrade.icon)" alt="" />
              <span class="total">{{ store.upgrades[i] }}</span>
              <span class="name">{{ upgrade.name }}</span
              ><br />
              Prix : <span class="price">{{ formatNumber(upgrade.price, 1000000) }}</span
              ><br />
              <em
                >+{{ formatNumber(upgrade.value, 1000000) }} dégâts /
                {{ upgrade.type === UpgradeType.DamagePerClick ? 'clic' : 'sec' }}</em
              >
            </span>
          </button>
          <button
            type="button"
            class="upgrade more"
            :class="{ 'is-disabled': upgrade.price * 10 > store.count }"
            @click="handleBuy(upgrade, 10)"
          >
            <span class="inner">x10</span>
          </button>
          <button
            type="button"
            class="upgrade more"
            :class="{ 'is-disabled': upgrade.price * 100 > store.count }"
            @click="handleBuy(upgrade, 100)"
          >
            <span class="inner">x100</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.shop {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  z-index: 100;
  transition: transform 0.3s ease-in-out;

  @media (min-width: 768px) {
    width: 420px;
    top: 0;
    left: 100%;
  }

  &.is-open {
    transform: translateY(-100%);

    @media (min-width: 768px) {
      transform: translateX(-100%);
    }
  }
}

.toggle {
  color: #fff;
  background-color: #000;
  right: 16px;
  top: -64px;
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

  @media (min-width: 768px) {
    top: 16px;
    right: calc(100% + 16px);
  }

  img {
    width: 32px;
  }

  span {
    position: absolute;
    right: calc(100% + 16px);
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #000;
    white-space: nowrap;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    visibility: hidden;
    transform: translateX(-8px);

    &.show {
      opacity: 1;
      visibility: visible;
      transform: none;
    }

    &::after {
      content: '';
      display: block;
      height: 0;
      width: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 4px solid #000;
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.panel {
  background-color: #000;
  height: 40vh;
  padding: 0 24px 24px;
  overflow: auto;
  position: relative;

  @media (min-width: 768px) {
    height: 100svh;
  }
}

.title {
  color: #fff;
  text-align: center;
  font-size: 48px;
  padding: 24px 0;
  background-color: #000;
  position: sticky;
  z-index: 10;
  top: 0;
  margin-bottom: 24px;
  line-height: 1;
  font-family: 'Londrina Sketch', sans-serif;
}

.items {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.item {
  display: flex;
  gap: 8px;
}

.upgrade {
  border: none;
  cursor: pointer;
  display: block;
  width: 100%;
  padding: 0;
  font-size: 14px;
  text-align: left;
  border-radius: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;

  .name {
    font-size: 16px;
    font-weight: bold;
  }

  img {
    display: block;
    width: 48px;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: default;
  }

  &.more {
    width: 80px;
    font-weight: bold;

    .inner {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .inner {
    color: #fff;
    display: block;
    height: 100%;
    font-size: 16px;
    position: relative;
    padding: 8px 16px 8px 64px;
    border-radius: 12px;
    background-color: #000;
    border: 2px solid #fff;
    transform: translateY(-0.2em);
    transition: transform 0.1s ease;
  }

  .price {
    color: #fda619;
    font-weight: bold;
  }

  .total {
    font-size: 14px;
    line-height: 1;
    padding: 6px;
    min-width: 32px;
    text-align: center;
    position: absolute;
    right: -2px;
    top: -2px;
    color: #000;
    background-color: #fff;
    border-radius: 0 12px 0 12px;
  }

  &:not(.is-disabled) {
    &:hover .inner {
      transform: translateY(-0.33em);
    }

    &:active .inner {
      transform: translateY(0);
    }
  }
}
</style>
