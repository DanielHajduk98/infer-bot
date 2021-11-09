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
import { ref, inject } from "vue";

const store = inject("store");
const flow = inject("flow");
const selected = ref([]);
const risk_factors = ref([]);

store
  .getRiskFactors()
  .then((response) => response.json())
  .then((json) => (risk_factors.value = json));

function handleDone() {
  const evidence = store.apiState.evidence;
  if (selected.value.length) {
    store.apiState.evidence = [evidence, ...selected.value];
  }
  flow.push({
    id: flow.length + 1,
    props: {},
    component: "Question",
  });
}
</script>
