<template>
  <message-box>Tell me what ails you.</message-box>
</template>

<script setup>
import { inject, watch } from "vue";
const flow = inject("flow");
const store = inject("store");
store.show_input = true;
watch(
  () => store.input_value,
  () => {
    if (store.show_input === true) {
      flow.push({
        component: "UserResponse",
        props: {
          message: store.input_value,
        },
      }),
        (store.input_value = "");
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
