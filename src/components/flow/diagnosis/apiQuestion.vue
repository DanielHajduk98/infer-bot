<template>
  <MessageBox class="question">
    <span class="question__text">{{ props.question.text }}</span>
    <div class="question__button-container">
      <MessageButton
        v-for="choice in props.question.items[0].choices"
        @click="handleChoice(choice)"
        >{{ choice.label }}</MessageButton
      >
    </div>
  </MessageBox>
</template>

<script setup>
import { inject, ref } from "vue";
import router from "../../../router/router.ts";

const props = inject("props");
const flow = inject("flow");
const store = inject("store");
const buttonsDisabled = ref(false);

function handleChoice({ id, label }) {
  buttonsDisabled.value = true;

  flow.push({
    id: flow.length + 1,
    props: { message: label },
    component: "PlainUserResponse",
  });

  store.apiState.evidence.push({
    id: props.question.items[0].id,
    choice_id: id,
  });

  store
    .getDiagnosis()
    .then((response) => response.json())
    .then((response) => {
      if (response.should_stop) {
        store.diagnosis.diagnosisIsDone = true;
        store.diagnosis = response;
        router.push("/results");
      } else {
        flow.push({
          id: flow.length + 1,
          props: {
            question: response.question,
          },
          component: "apiQuestion",
        });
      }
    });
}
</script>

<style lang="scss" scoped>
.question {
  &__text {
    font-weight: 600;
    margin-bottom: 15px;
    display: block;
  }

  &__button-container {
    display: flex;
    justify-content: space-between;
  }
}
</style>
