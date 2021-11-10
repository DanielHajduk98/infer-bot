<template>
  <message-box>
    Sorry, I didn't get that. Please write your symptom in a diffrent way.
  </message-box>
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
