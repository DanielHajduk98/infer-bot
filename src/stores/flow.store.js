import { defineStore } from "pinia";

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
    diagnosisIsDone: true,
    diagnosis: {},
  }),
  actions: {
    addEvidence(symptom) {
      this.apiState.evidence.push(symptom);
    },
    getDiagnosis() {
      const diagnosis = fetch("https://api.infermedica.com/v3/diagnosis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "App-Id": import.meta.env.VITE_APP_ID,
          "App-Key": import.meta.env.VITE_APP_KEY,
        },
        body: JSON.stringify({
          extras: {
            disable_groups: true,
          },
          age: {
            value: this.apiState.age,
          },
          sex: this.apiState.sex.value,
          evidence: this.apiState.evidence,
        }),
      });
      return diagnosis;
    },
  },
});
