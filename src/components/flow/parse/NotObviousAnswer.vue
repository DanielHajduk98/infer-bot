<template>
  <message-box>
    {{ props.mentions[0].common_name }} - Is this your symptom?
    <div class="btn-container">
      <message-button :disabled="btnDisabled" @click="next(true)"
        >Yes</message-button
      >
      <message-button :disabled="btnDisabled" @click="next(false)"
        >No</message-button
      >
    </div>
  </message-box>
</template>

<script setup>
import { inject, ref } from "vue";
const flow = inject("flow");
const btnDisabled = ref(false);
const props = inject("props");
const store = inject("store");

function next(more) {
  btnDisabled.value = true;
  if (more) {
    // Suggested symptom is correct.
    flow.push({
      id: flow.length + 1,
      props: {},
      component: "ObviousAnswer",
    });
    // Add symptom to API State
    store.apiState.evidence.push({
      id: props.mentions[0].id,
      source: "initial",
      choice_id: props.mentions[0].choice_id,
    });
  } else {
    // suggested symptom is not correct
    // delete it from suggested symptom array and start over
    let shiftedSymptoms = [...props.mentions];
    shiftedSymptoms.shift();
    if (shiftedSymptoms.length >= 1) {
      // Mount this component again with shorten array of symptoms
      flow.push({
        id: flow.length + 1,
        props: {
          mentions: shiftedSymptoms,
        },
        component: "NotObviousAnswer",
      });
    } else {
      // None of suggested symptoms were right.
      flow.push({
        id: flow.length + 1,
        props: { message: "123" },
        component: "IncomprehensibleAnswer",
      });
    }
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
