<template>
  <flow-provider v-for="elem in chatFlowState" :flow="chatFlowState" :key="elem.id" :id="elem.id" :props="elem.props" :state="elem.state">
    <component :is="elem.component"/>
  </flow-provider>
  <MessageInput @message="handleMessage" :shown="store.$state.show_input"/>
</template>

<script>
import { useFlowStore } from "./stores/flow.store.js"
import { chatFlowState } from "./utils/flow.core.js"
import initial_introduction from "./components/flow/initial_introduction.vue"
import initial_interaction from "./components/flow/initial_interaction.vue"
import initial_sex_question from "./components/flow/initial_sex_question.vue"

import plain_user_response from "./components/flow/plain_user_response.vue"

import parse_question from "./components/flow/parse_question.vue"
import parse_user_response from "./components/flow/parse_user_response.vue"
import parse_obvious_answer from "./components/flow/parse_obvious_answer.vue"
import parse_not_obvious_answer from "./components/flow/parse_not_obvious_answer.vue"
import parse_incomperhensible_answer from "./components/flow/parse_incomperhensible_answer.vue"
export default {
  components: {
    initial_introduction,
    initial_interaction,
    initial_sex_question,

    plain_user_response,

    parse_question,
    parse_user_response,
    parse_obvious_answer,
    parse_not_obvious_answer,
    parse_incomperhensible_answer

  },
  setup(){
    const store = useFlowStore()

    function handleMessage(e){
      store.input_value = e
    }

    return {
      store,
      chatFlowState,
      handleMessage
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
