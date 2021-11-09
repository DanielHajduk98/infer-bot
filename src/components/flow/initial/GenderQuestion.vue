<template>
  <message-box>
    Great! At first I need to know your sex. Choose one option:
    <div class="btn-container">
      <message-tile
        icon="/src/assets/images/svg/gender/female.svg"
        text="Female"
        :disabled="btnDisabled"
        @click="chooseSex('female')"
      />
      <message-tile
        icon="/src/assets/images/svg/gender/male.svg"
        text="Male"
        :disabled="btnDisabled"
        @click="chooseSex('male')"
      />
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
    component: "PlainMessage",
    props: { type: "grey", message: sex },
  });

  setTimeout(() => {
    flow.push({
      id: flow.length + 1,
      component: "AgeQuestion",
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
  width: 100%;
}
</style>
