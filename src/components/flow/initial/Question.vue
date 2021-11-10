<template>
  <message-box>Tell me what ails you.</message-box>
</template>

<script setup>
import { watch } from "vue";
import useApiStore from "../../../stores/api.store";
import { useFlowStore } from "../../../stores/flow.store";

const store = useApiStore(),
  flow = useFlowStore();

flow.show_input = true;

watch(
  () => flow.input_value,
  () => {
    console.log("watcher in question");
    if (flow.show_input === true) {
      flow.push("UserResponse", {
        message: flow.input_value,
      }),
        (flow.input_value = "");
    }
    store.show_input = false;
  }
);
</script>

<style scoped>
.btn-container {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
</style>
