<script setup lang="ts"></script>

<template>
  <div class="container" style="background: yellow">
    <button class="btn">asdfasdf</button>
    <button class="btn--disabled">asdfasdf</button>
  </div>
</template>

<style lang="scss">
.btn {
  background: red;

  &--disabled {
    background: blue;
  }
}
</style>
