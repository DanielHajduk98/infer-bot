<template>
  <message-box>
    Hi! My name is InferBot and my creators develop me to help you recognize
    your diseases based on your symptoms.
  </message-box>
</template>

<script setup>
import { inject, onMounted, watch } from "vue";
const flow = inject("flow");
flow.push({
  id: flow.length + 1,
  component: "InitialInteraction",
  props: {},
});

onMounted(() => {
  watch(flow, () => {
    setTimeout(() => {
      document.querySelector("#scroll").scrollIntoView();
    }, 200);
  });
});
</script>
