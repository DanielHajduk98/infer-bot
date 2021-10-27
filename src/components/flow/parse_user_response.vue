<template>
  <message-box type="grey">
    {{ props.message }}
  </message-box>
</template>

<script setup>
import { inject } from "vue";
const flow = inject("flow");
const store = inject("store");
const props = inject("props");

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
      value: 18,
    },
    sex: store.apiState.sex.value,
  }),
})
  .then((response) => response.json())
  .then((response) => {
    if (response.mentions.length != 0) {
      if (response.obvious == true) {
        console.log(response);
        flow.push({
          id: flow.length + 1,
          props: {},
          component: "parse_obvious_answer",
        });
        store.apiState.evidence.push({
          id: response.mentions[0].id,
          choice_id: response.mentions[0].choice_id,
        });
      } else {
        flow.push({
          id: flow.length + 1,
          props: {
            mentions: response.mentions,
          },
          component: "parse_not_obvious_answer",
        });
      }
    } else {
      flow.push({
        id: flow.length + 1,
        props: {},
        component: "parse_incomperhensible_answer",
      });
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
