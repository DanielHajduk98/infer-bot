<template>
  <message-box>
    {{ props.question.text }}

    <div class="buttons-container">
      <message-button
        v-for="(item, index) in props.question.items"
        :key="index"
        :square="true"
        :disabled="btnDisabled"
        @click="handleClick(item)"
        >{{ item.name }}</message-button
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
  evidenceArray = [store.question.items];

const handleClick = async (item) => {
  btnDisabled.value = true;

  store.apiState.evidence.push({
    id: item.id,
    choice_id: "present",
  });

  flow.push({
    id: flow.length + 1,
    component: "PlainMessage",
    props: {
      type: "grey",
      message: item.name,
    },
  });

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
      component: "PlainResponse",
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
};
</script>

<style lang="scss" scoped>
.buttons-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  margin-top: 15px;

  & > button {
    width: 100%;
  }
}
</style>
