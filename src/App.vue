<template>
  <flow-provider v-for="elem in chatFlowState" :flow="chatFlowState" :key="elem.id" :id="elem.id" :props="elem.props" :state="elem.state">
    <component :is="elem.component"/>
  </flow-provider>
</template>

<script>
import { chatFlowState } from "./utils/flow.core.js"
import msg00 from "./components/flow/msg_00.vue"
import msg01 from "./components/flow/msg_01.vue"
import msg02 from "./components/flow/msg_01.vue"
export default {
  components: {
    msg00,
    msg01,
    msg02
  },
  setup(){
    return {
      chatFlowState
    }
  }
}
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
