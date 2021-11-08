import { useFlowStore } from "../stores/flow.store.js";
import { chatFlowState } from "../utils/flow.core.js";

const insertDiagnosisQuestionToflow = async () => {
  const store = useFlowStore();
  const flow = chatFlowState;

  if (store.question.type === "group_multiple") {
    store.question.items.shift();
    if (store.question.items.length >= 1) {
      flow.push({
        id: flow.length + 1,
        component: "QuestionSingle",
        props: {
          question: {
            text: store.question.items[0].name,
            items: [store.question.items[0]],
          },
        },
      });

      return;
    }
  }

  await store.getDiagnosis();

  if (store.should_stop) return;

  if (store.question.type === "single") {
    flow.push({
      id: flow.length + 1,
      component: "QuestionSingle",
      props: {
        question: store.question,
      },
    });
  } else if (store.question.type === "group_single") {
    flow.push({
      id: flow.length + 1,
      component: "QuestionGroupSingle",
      props: {
        question: store.question,
      },
    });
  } else if (store.question.type === "group_multiple") {
    flow.push({
      id: flow.length + 1,
      component: "PlainMessage",
      props: { message: store.question.text },
    });
    flow.push({
      id: flow.length + 1,
      component: "QuestionSingle",
      props: {
        question: {
          text: store.question.items[0].name,
          items: [store.question.items[0]],
        },
      },
    });
  }
};

export default insertDiagnosisQuestionToflow;
