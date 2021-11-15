<template>
  <MessageBox>
    <RiskfactorCheckbox
      v-model="selected"
      :risk-factors="risk_factors"
      @done="handleDone"
    />
  </MessageBox>
</template>

<script setup>
import { ref } from "vue";
import useApiStore from "@/stores/api.store";
import { useFlowStore } from "@/stores/flow.store";

const store = useApiStore(),
  flow = useFlowStore(),
  selected = ref([]),
  risk_factors = ref([]);

store
  .getRiskFactors()
  .then((response) => response.json())
  .then((json) => (risk_factors.value = json));

async function handleDone() {
  const evidence = store.apiState.evidence;
  if (selected.value.length) {
    store.apiState.evidence = [...evidence, ...selected.value];
  }
  await flow.push("Question", {});
}
</script>
