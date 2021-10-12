import { defineStore } from 'pinia'

export const useIncrementer = defineStore('main', {
    state: () => ({
        number: 0
    }),
    getters: {
        getNumber: state => state.number
    },
    actions: {
        increment() {
            this.number++;
        }
    }
})