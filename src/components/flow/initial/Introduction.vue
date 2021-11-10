<template>
  <message-box>
    Hi! My name is InferBot and my creators develop me to help you recognize
    your diseases based on your symptoms.
  </message-box>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useFlowStore } from "../../../stores/flow.store";

const flow = useFlowStore();

flow.push("InitialInteraction");

const flowState = computed(() => flow.flowState);

onMounted(() => {
  watch(flowState, () => {
    setTimeout(() => {
      document.querySelector("#scroll").scrollIntoView();
    }, 200);
  });
});
</script>
