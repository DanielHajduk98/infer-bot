import { useFlowStore } from "../stores/flow.store.js";
import { chatFlowState } from "../utils/flow.core.js";

const insertResultsToFlow = () => {
  const store = useFlowStore();
  const flow = chatFlowState;

  flow.push({
    component: "TriageRecomendation",
    props: {
      triageLevel: store.triageLevel,
    },
  });

  store.alarmingSymptoms.length &&
    flow.push({
      component: "TriageAlarmingSymptoms",
      props: {
        symptoms: store.alarmingSymptoms,
      },
    });

  flow.push({
    component: "Results",
    props: {
      conditions: store.conditions,
    },
  });
};

export default insertResultsToFlow;
