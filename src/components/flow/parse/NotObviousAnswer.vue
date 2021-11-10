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
import { ref } from "vue";
import useApiStore from "../../../stores/api.store";
import { useFlowStore } from "../../../stores/flow.store";

const flow = useFlowStore(),
  btnDisabled = ref(false),
  props = defineProps({
    mentions: {
      type: Object,
      required: true,
    },
  }),
  store = useApiStore();

function next(more) {
  btnDisabled.value = true;
  if (more) {
    flow.push("ObviousAnswer");
    store.apiState.evidence.push({
      id: props.mentions[0].id,
      choice_id: props.mentions[0].choice_id,
      source: "initial",
    });
  } else {
    let shiftedSymptoms = [...props.mentions];
    shiftedSymptoms.shift();
    if (shiftedSymptoms.length >= 1) {
      flow.push("NotObviousAnswer", {
        mentions: shiftedSymptoms,
      });
    } else {
      flow.push("IncomprehensibleAnswer", { message: "123" });
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
