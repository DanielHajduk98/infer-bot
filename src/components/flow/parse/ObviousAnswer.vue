<template>
  <message-box>
    Ok, I get that. Did you notice any more symptoms?
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

async function next(more) {
  btnDisabled.value = true;
  if (more) {
    flow.push({
      id: flow.length + 1,
      component: "Question",
      props: { text: "Tell me what is you symptom?" },
    });
  } else {
    await store.getDiagnosis();

    if (store.should_stop) return;

    if (store.question.type === "single") {
      flow.push({
        id: flow.length + 1,
        component: "QuestionSingle",
        props: {
          question: store.question,
        },
      });
    } else if (store.question.type === "group_single") {
      flow.push({
        id: flow.length + 1,
        component: "QuestionGroupSingle",
        props: {
          question: store.question,
        },
      });
    } else if (store.question.type === "group_multiple") {
      flow.push({
        id: flow.length + 1,
        component: "PlainMessage",
        props: { message: store.question.text, type: "grey" },
      });
      flow.push({
        id: flow.length + 1,
        component: "QuestionSingle",
        props: {
          question: {
            text: store.question.items[0].name,
            items: [store.question.items[0]],
          },
        },
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
