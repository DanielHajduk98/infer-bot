<template>
  <message-box>
    {{ props.mentions[0].common_name }} - Is this your symptom?
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
const props = inject("props");
const store = inject("store");
function next(more) {
  btnDisabled.value = true;
  if (more) {
    flow.push({
      id: flow.length + 1,
      props: {},
      component: "ObviousAnswer",
    });
    store.apiState.evidence.push({
      id: props.mentions[0].id,
      choice_id: props.mentions[0].choice_id,
    });
  } else {
    let shiftedSymptoms = [...props.mentions];
    shiftedSymptoms.shift();
    if (shiftedSymptoms.length >= 1) {
      flow.push({
        id: flow.length + 1,
        props: {
          mentions: shiftedSymptoms,
        },
        component: "NotObviousAnswer",
      });
    } else {
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
