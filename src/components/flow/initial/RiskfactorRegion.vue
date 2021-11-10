<template>
  <MessageBox>
    <RegionComponent v-model="visitedRegions" @done="handleFinish" />
  </MessageBox>
</template>

<script setup>
/* eslint-disable */
import { ref, inject } from "vue";
const visitedRegions = ref([]);
const store = inject("store");
const flow = inject("flow");

function handleFinish() {
  const visitedRegMapped = visitedRegions.value.map(
    ({ id, choice_id, source }) => {
      return {
        id,
        choice_id,
        source,
      };
    }
  ).filter(x => x);

  if (visitedRegMapped.length) {
    store.apiState.evidence = [...store.apiState.evidence, ...visitedRegMapped];
  }

  flow.push({
    component: "RiskfactorSuggestions",
  });
}
</script>
