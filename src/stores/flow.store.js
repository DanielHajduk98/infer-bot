import { defineStore } from "pinia"
import { callAPI } from "../core/core.utils.js"

export const useFlowStore = defineStore('api-store', {
    state: () => ({
        freeze: false,
        apiState: {
            age: null,
            sex: {
                value: null,
            },
            evidence: [
                {
                    "id": "s_1193",
                    "choice_id": "present",
                    "source": "initial"
                }
            ]
        }
    }),
    actions: {
        addEvidence(symptom){
            this.apiState.evidence.push(symptom)
        },
    }
})