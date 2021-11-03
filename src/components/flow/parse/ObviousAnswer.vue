<template>
  <message-box>
    Ok, I get that. Did you noticed any more symptoms?
    <div class="btn-container">
      <message-button :disabled="btnDisabled" @click="next(true)">
        Yes
      </message-button>
      <message-button :disabled="btnDisabled" @click="next(false)">
        No
      </message-button>
    </div>
  </message-box>
</template>

<script setup>
import { inject, ref } from "vue";
const flow = inject("flow");
const btnDisabled = ref(false);
const store = inject("store");

function next(more) {
  btnDisabled.value = true;
  if (more) {
    // User has more symptoms to pass
    flow.push({
      id: flow.length + 1,
      props: {},
      component: "Question",
    });
  } else {
    // User has no more symptoms to pass
    // Make call to /diagnosis and let api suggest next symptoms.
    store
      .getDiagnosis()
      .then((response) => response.json())
      .then((response) => {
        flow.push({
          id: flow.length + 1,
          props: {
            question: response.question,
          },
          component: "apiQuestion",
        });
      });
  }
}
</script>

<style scoped>
.btn-container {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
</style>
