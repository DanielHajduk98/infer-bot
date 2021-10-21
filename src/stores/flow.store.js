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

            ]
        }
    })
})