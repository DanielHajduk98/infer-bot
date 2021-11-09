<template>
  <message-box>
    {{ props.question.text }}

    <div class="buttons-container">
      <message-button
        v-for="(choice, index) in props.question.items[0].choices"
        :key="index"
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
import insertDiagnosisQuestionToflow from "../../../composables/insertDiagnosisQuestionToFlow";

const store = inject("store"),
  flow = inject("flow"),
  props = inject("props"),
  btnDisabled = ref(false);

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

  insertDiagnosisQuestionToflow();
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
