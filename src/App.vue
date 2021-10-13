<template>
  
  <message-box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptate ipsam deleniti quidem debitis quia recusandae ab quo minus inventore impedit eaque fuga repellendus aliquid quod voluptates, eos perspiciatis. Commodi!</message-box>
</template>

<script setup>
import messageBox from "./components/messageBox.vue";


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
