<template>
  <message-box>
    {{ props.question.text }}

    <div
      class="buttons-container"
      :class="{ isTypeGroupSingle: 'buttons-container--group-single' }"
    >
      <message-button
        v-for="(choice, index) in props.question.items[0].choices"
        :key="index"
        :square="isTypeGroupSingle"
        :text="choice.label"
        :disabled="btnDisabled"
        @click="handleClick(choice)"
        >{{ choice.label }}</message-button
      >
    </div>
  </message-box>
</template>

<script setup>
import { inject, ref } from "vue";

const store = inject("store"),
  flow = inject("flow"),
  props = inject("props"),
  btnDisabled = ref(false),
  isTypeGroupSingle = props.question.type === "group_single";

const handleClick = async (choice) => {
  btnDisabled.value = true;

  store.apiState.evidence.push({
    id: props.question.items[0].id,
    choice_id: choice.id,
  });

  flow.push({
    id: flow.length + 1,
    component: "PlainMessage",
    props: {
      type: "grey",
      message: choice.label,
    },
  });

  if (store.question.type === "group_multiple") {
    store.question.items.shift();
    if (store.question.items.length >= 1) {
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

      return;
    }
  }

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
      component: "Question",
      props: { text: store.question.text },
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
};
</script>

<style lang="scss" scoped>
.buttons-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

  &--group_single {
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    margin-top: 15px;

    & > button {
      width: 100%;
    }
  }
}
</style>
