<template>
</template>

<script setup>
// import messageBox from "./components/messageBox.vue";
// import messageButton from "./components/messageButton.vue"
// import messageTile from "./components/messageTile.vue"
import { useFlowStore } from "./stores/flow.store.js"
import flow from "./core/flow"
flow(useFlowStore())
</script>

<style lang="scss">
.divider {
  margin-top: 14px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(10, minmax(min-content, min-content));
}
.divider-grid {
  margin-top: 16px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
}
</style>
