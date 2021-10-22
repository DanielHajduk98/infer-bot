import { createApp } from 'vue/dist/vue.esm-bundler';

export const callAPI = async (method, endpoint, body) => {
    fetch(endpoint, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "app-id": "02985eed",
            "api-key": "2eddb7cd91720c173c408f757c96b9a7"
        },
        body: JSON.stringify(body)
    })
}

export const mountApp = (component, node) => {
    const wrapper = document.createElement("div")
    createApp(component).mount(wrapper)
    document.querySelector(node).append(wrapper)
}

export class Flow{

    step = 0

    constructor(){
        this.step = 0
        this.flow = []
        this.store = null
    }
    
    resolve(){
        this.step = this.step + 1
        this.flow[this.step]?.handler()
    }

    addStep(handler){
        const stepObject = {
            id: this.flow.length,
            root: this,
            resolve: this.resolve.bind(this),
            handler
        }
        this.flow.push(stepObject)
        return stepObject
    }

    next(){
        return this.flow[this.step]
    }

    init(store){
        this.store = store()
        console.log(this.store)
        this.flow[0].handler()
    }
}