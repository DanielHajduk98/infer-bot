import { defineStore } from "pinia";
import api from "@/utils/api.js";
import { useFlowStore } from "./flow.store.js";

const useApiStore = defineStore("api-store", {
  state: () => ({
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
        this.apiState.evidence,
        "POST"
      )
        .then((response) => response.json())
        .then(async (response) => {
          this.should_stop = this.diagnosis;

          this.should_stop = response.should_stop;
          this.conditions = response.conditions;
          this.question = response?.question;
          this.isLoading = false;

          if (this.should_stop) {
            await this.getTriage();
            const flow = useFlowStore();

            flow.insertResultsToFlow();
          }
        });
    },

    async getTriage() {
      return api(
        "triage",
        this.apiState.age,
        this.apiState.sex.value,
        this.apiState.evidence,
        "POST"
      )
        .then((response) => response.json())
        .then((response) => {
          this.triageLevel = response.triage_level;
          this.alarmingSymptoms = response.serious;
        });
    },

    async getRiskFactors() {
      return api(
        "suggest",
        this.apiState.age,
        this.apiState.sex.value,
        this.apiState.evidence,
        "POST",
        { suggest_method: "demographic_risk_factors" }
      );
    },
  },
});

export default useApiStore;
