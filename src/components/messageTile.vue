<template>
  <div :class="tileActive">
    <img :src="icon" class="tile__icon" />
    <span class="tile__text">{{ text }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});
const tileActive = computed(() => (props.active ? "tile--active" : "tile"));
</script>

<style lang="scss" scoped>
.tile {
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  background: #3f94ff;
  transition: all 75ms ease-in-out;

  &--active {
    @extend .tile;
    background: #acd1ff;
    transform: scale(1.03);
  }
  &:hover {
    background: #acd1ff;
  }

  &:active {
    transform: scale(1.05);
  }
}
</style>
