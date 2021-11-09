import { useFlowStore } from "../stores/flow.store.js";
import { chatFlowState } from "../utils/flow.core.js";

const insertResultsToFlow = async () => {
  const store = useFlowStore();
  const flow = chatFlowState;

  flow.push({
    component: "Results",
    props: {
      conditions: store.conditions,
    },
  });
};

export default insertResultsToFlow;
