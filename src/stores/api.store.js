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

    async NLP(text) {
      return api(
        "parse",
        this.apiState.age,
        this.apiState.sex.value,
        this.apiState.evidence,
        "POST",
        { text: text }
      )
        .then((response) => response.json())
        .then(async (response) => {
          const flow = useFlowStore();

          if (response.mentions.length !== 0) {
            if (response.obvious === true) {
              await flow.push("ObviousAnswer");
              this.apiState.evidence.push({
                id: response.mentions[0].id,
                choice_id: response.mentions[0].choice_id,
                source: "initial",
              });
            } else {
              await flow.push("NotObviousAnswer", {
                mentions: response.mentions[0],
              });
            }
          } else {
            await flow.push("IncomprehensibleAnswer");
          }
        });
    },
  },
});

export default useApiStore;
