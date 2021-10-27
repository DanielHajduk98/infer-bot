<template>
  <message-box>
    Great! At first I need to know your sex. Choose one option.
    <div class="btn-container">
      <message-button :disabled="btnDisabled" @click="chooseSex('female')">
        Female
      </message-button>
      <message-button :disabled="btnDisabled" @click="chooseSex('male')">
        Male
      </message-button>
    </div>
  </message-box>
</template>

<script setup>
import { inject, ref } from "vue";
const flow = inject("flow");
const store = inject("store");
const btnDisabled = ref(false);
function chooseSex(sex) {
  store.apiState.sex.value = sex;
  btnDisabled.value = true;

  flow.push({
    id: flow.length + 1,
    component: "plain_user_response",
    props: { message: sex },
  });

  setTimeout(() => {
    flow.push({
      id: flow.length + 1,
      component: "initial_age_slider",
      props: {
        min: 18,
        max: 130,
      },
    });
  }, 800);
}
</script>

<style scoped>
.btn-container {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
</style>
