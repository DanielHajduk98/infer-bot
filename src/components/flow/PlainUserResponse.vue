<template>
  <message-box type="grey">
    {{ props.message }}
  </message-box>
</template>

<script setup>
import { inject } from "vue";
const props = inject("props");
</script>
