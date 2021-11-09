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
import insertDiagnosisQuestionToflow from "../../../composables/insertDiagnosisQuestionToFlow";

const store = inject("store"),
  flow = inject("flow"),
  props = inject("props"),
  btnDisabled = ref(false);

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

  insertDiagnosisQuestionToflow();
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
