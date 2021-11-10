import { defineStore } from "pinia";
import useApiStore from "../stores/api.store.js";

export const useFlowStore = defineStore("flow-store", {
  state: () => ({
    show_input: false,
    input_value: "",
    flow: [],
    flowPushTimeout: 800,
  }),

  actions: {
    push(component, properties, noTimeout) {
      setTimeout(() => {
        this.flow.push({
          component: component,
          properties: properties,
        });
      }, noTimeout && this.flowPushTimeout);
    },

    async insertDiagnosisQuestionToflow() {
      const store = useApiStore();

      if (store.question.type === "group_multiple") {
        store.question.items.shift();
        if (store.question.items.length >= 1) {
          this.push(
            "QuestionSingle",
            {
              question: {
                text: store.question.items[0].name,
                items: [store.question.items[0]],
              },
            },
            true
          );

          return;
        }
      }

      await store.getDiagnosis();

      if (store.should_stop) return;

      if (store.question.type === "single") {
        this.push("QuestionSingle", { question: store.question }, true);
      } else if (store.question.type === "group_single") {
        this.push("QuestionGroupSingle", { question: store.question }, true);
      } else if (store.question.type === "group_multiple") {
        this.push("PlainMessage", { message: store.question.text });
        this.push(
          "QuestionSingle",
          {
            question: {
              text: store.question.items[0].name,
              items: [store.question.items[0]],
            },
          },
          true
        );
      }
    },

    insertResultsToFlow() {
      const store = useApiStore();

      this.push("TriageRecomendation", {
        triageLevel: store.triageLevel,
      });

      store.alarmingSymptoms.length &&
        this.push("TriageAlarmingSymptoms", {
          symptoms: store.alarmingSymptoms,
        });

      this.push("Results", { conditions: store.conditions });
    },
  },
});
