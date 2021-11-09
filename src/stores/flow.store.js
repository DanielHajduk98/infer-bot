import { defineStore } from "pinia";
import insertResultsToFlow from "../composables/insertResultsToFlow.js";
import api from "../utils/api.js";

export const useFlowStore = defineStore("api-store", {
  state: () => ({
    freeze: false,
    show_input: false,
    input_value: "",
    apiState: {
      age: null,
      sex: {
        value: null,
      },
      evidence: [],
    },
    should_stop: false,
    conditions: {},
    question: {},
    isLoading: false,
    triageLevel: null,
    alarmingSymptoms: null,
  }),
  actions: {
    addEvidence(symptom) {
      this.apiState.evidence.push(symptom);
    },

    async getDiagnosis() {
      this.isLoading = true;

      return api(
        "diagnosis",
        this.apiState.age,
        this.apiState.sex.value,

        this.apiState.evidence
      )
        .then((response) => response.json())
        .then((response) => {
          this.should_stop = this.diagnosis;

          this.should_stop = response.should_stop;
          this.conditions = response.conditions;
          this.question = response?.question;
          this.isLoading = false;

          if (this.should_stop) {
            insertResultsToFlow();
          }
        });
    },
  },
});
