<template>
  <span>Flow testing - 0.2</span>
  <message-box>Lorem ipsum dolor sit amet consectetur. 
    <div class="divider-grid">
      <message-tile icon="/female.svg" text="Female"></message-tile>
      <message-tile icon="/male.svg" text="Male"></message-tile>
    </div>
  </message-box>
</template>

<script setup>
import { createApp, h } from "vue"
import messageBox from "./components/messageBox.vue";
import messageButton from "./components/messageButton.vue"
import messageTile from "./components/messageTile.vue"

import { initializeComponent, Flow } from "./core/core.utils.js";

const FlowInstance = new Flow()
const STEP_DELAY = 250

FlowInstance.addStep(function(){
  setTimeout(() => {
    const TEXT = 'Hello, I’m InferBOT and my Job is to geather informations about your sympotoms to suggest you a diagnosis. First I have to get some basic informations.'
    initializeComponent(messageBox, { type: "primary" }, TEXT, "#app");
    this.resolve()
  }, STEP_DELAY);
})
FlowInstance.addStep(function(){
  setTimeout(() => {
    const TEXT = 'Hello, I’m InferBOT and my Job is to geather informations about your sympotoms to suggest you a diagnosis. First I have to get some basic informations.'
    initializeComponent(messageBox, { type: "primary" }, TEXT, "#app");
    this.resolve()
  }, STEP_DELAY);
})
FlowInstance.addStep(function(){
  setTimeout(() => {
    const slot = h(messageButton, {}, "TEST")
    initializeComponent(messageBox, { type: "primary" }, slot, "#app");
    this.resolve()
  }, STEP_DELAY);
})

FlowInstance.init()

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
