<template>
  <message-box type="grey">
    {{ props.message }}
  </message-box>
</template>

<script setup>
import useApiStore from "../../../stores/api.store";
import { useFlowStore } from "../../../stores/flow.store";

const flow = useFlowStore(),
  store = useApiStore(),
  props = defineProps({
    message: {
      type: String,
      default: "",
    },
  });

fetch("https://api.infermedica.com/v3/parse", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "App-Id": import.meta.env.VITE_APP_ID,
    "App-Key": import.meta.env.VITE_APP_KEY,
  },
  body: JSON.stringify({
    text: props.message,
    age: {
      value: store.apiState.age,
    },
    sex: store.apiState.sex.value,
  }),
})
  .then((response) => response.json())
  .then((response) => {
    if (response.mentions.length !== 0) {
      if (response.obvious === true) {
        flow.push("ObviousAnswer");
        // FIXME only sends first mention.
        // TODO move this to store
        store.apiState.evidence.push({
          id: response.mentions[0].id,
          choice_id: response.mentions[0].choice_id,
          source: "initial",
        });
      } else {
        flow.push("NotObviousAnswer", {
          mentions: response.mentions[0],
        });
      }
    } else {
      flow.push("IncomprehensibleAnswer");
    }
  });
</script>

<style scoped>
.btn-container {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
</style>
