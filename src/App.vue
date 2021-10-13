<template>
  <div>
    <message-box type="grey"
      >Hello, I’m InferBOT and my Job is to geather informations about your
      sympotoms to suggest you a diagnosis. First I have to get some basic
      informations.
      <div class="divider">
        <message-button @click="loading = !loading"
          >Toggle loading</message-button
        >
        <message-button>Hello</message-button>
      </div>
    </message-box>
    <message-box type="primary"
      >Hello, I’m InferBOT and my Job is to geather informations about your
      sympotoms.</message-box
    >
    <message-box type="grey"
      >Hello, I’m InferBOT and my Job is to geather informations about your
      sympotoms to suggest you a diagnosis. First I have to get some basic
      informations.</message-box
    >
    <message-box>
      Choose your sex
      <div class="divider-grid">
        <message-tile
          :active="activeSex === 'female' ? true : false"
          text="Female"
          icon="/female.svg"
          @click="handleSexSelection('female')"
        />
        <message-tile
          :active="activeSex === 'male' ? true : false"
          text="Male"
          icon="/male.svg"
          @click="handleSexSelection('male')"
        />
      </div>
    </message-box>
    <message-loading :loading="loading" />
  </div>
</template>

<script setup>
import { ref } from "vue";
const loading = ref(true);
const activeSex = ref("");
function handleSexSelection(sex) {
  if (activeSex.value === sex) return (activeSex.value = null);
  activeSex.value = sex;
}
import messageButton from "./components/messageButton.vue";
import messageBox from "./components/messageBox.vue";
import messageLoading from "./components/messageLoading.vue";
import messageTile from "./components/messageTile.vue";
</script>

<style lang="scss">
.divider {
  margin-top: 14px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(10, minmax(min-content, min-content));
}
.divider-grid {
  margin-top: 16px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
}
</style>
