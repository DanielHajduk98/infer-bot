import { defineStore } from "pinia"

export const useFlowStore = defineStore('api-store', {
    state: () => ({
        freeze: false,
        show_input: false,
        input_value: "",
        apiState: {
            age: null,
            sex: {
                value: null,
            },
            evidence: []
        }
    }),
    actions: {
        addEvidence(symptom){
            this.apiState.evidence.push(symptom)
        },
    }
})