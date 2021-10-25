<template>
  <template v-for="el in messageArray">
    <component v-once :is="el.component" :props="el.props">{{ el.slot }}</component>
  </template>
  <messageLoading :loading="true"/>
  <messageInput @message="handleMessageEvent" />
</template>

<script>
import { reactive } from "vue"
import messageBox from "./components/messageBox.vue"
// impoer { reactive }
export default {
  components: {
    messageBox
  },
  setup() {
    const messageArray = reactive([

    ])
    function handleMessageEvent(e) {
      messageArray.push({
        component: "message-box",
        props: {},
        slot: e
      })
    }
    return {
      messageArray,
      handleMessageEvent
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
