<template>
  <div class="tmp">
    <message-slider
      id="age-slider"
      :min="18"
      :max="130"
      label="Enter your age: "
    />
  </div>
</template>

<script setup>
// import messageBox from "./components/messageBox.vue";
// import messageButton from "./components/messageButton.vue"
// import messageTile from "./components/messageTile.vue"
import { useFlowStore } from "./stores/flow.store.js";
import messageSlider from "./components/messageSlider.vue";
import flow from "./core/flow";
// flow(useFlowStore());
</script>

<style lang="scss">
.tmp {
  background: $primary;
  padding: 15px;
}
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
