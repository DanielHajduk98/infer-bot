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
import { ref } from "vue";
import useApiStore from "../../../stores/api.store";
import { useFlowStore } from "../../../stores/flow.store";

const btnDisabled = ref(false),
  store = useApiStore(),
  flow = useFlowStore();

const handleClick = async (item) => {
  btnDisabled.value = true;

  store.apiState.evidence.push({
    id: item.id,
    choice_id: "present",
  });

  flow.push("PlainMessage", {
    type: "grey",
    message: item.name,
  });

  flow.insertDiagnosisQuestionToflow();
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
