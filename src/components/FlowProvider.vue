<template>
  <slot />
</template>

<script>
import { useFlowStore } from "../stores/flow.store.js";
import { provide } from "vue";
export default {
  props: {
    props: {
      type: Object,
      required: true,
    },
    state: {
      type: Object,
      required: false,
      default: () => {
        return {};
      },
    },
    flow: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useFlowStore();
    provide("store", store);
    provide("flow", props.flow);
    provide("props", props.props);
    if (props.state) {
      provide("state", props.state);
    }
    return {};
  },
};
</script>
