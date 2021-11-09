<template>
  <message-box :type="props.type">
    {{ props.message }}
  </message-box>
</template>

<script setup>
import { inject } from "vue";
const props = inject("props");
</script>
