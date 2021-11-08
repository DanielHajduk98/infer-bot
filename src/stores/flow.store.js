import { defineStore } from "pinia";
import router from "../router/router.ts";

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
  }),
  actions: {
    addEvidence(symptom) {
      this.apiState.evidence.push(symptom);
    },
    async getDiagnosis() {
      this.isLoading = true;

      return fetch("https://api.infermedica.com/v3/diagnosis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "App-Id": import.meta.env.VITE_APP_ID,
          "App-Key": import.meta.env.VITE_APP_KEY,
        },
        body: JSON.stringify({
          age: {
            value: this.apiState.age,
          },
          sex: this.apiState.sex.value,
          evidence: this.apiState.evidence,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.should_stop = this.diagnosis;

          this.should_stop = response.should_stop;
          this.conditions = response.conditions;
          this.question = response?.question;
          this.isLoading = false;

          if (this.should_stop) router.push("/results");
        });
    },
  },
});
