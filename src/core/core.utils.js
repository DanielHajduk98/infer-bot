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

export const mountApp = (template, optionsAPI, node) => {
    const component = Object.assign(optionsAPI, {template})
    const wrapper = document.createElement("div")
    const app = createApp(component)
    app.mount(wrapper)
    document.querySelector(node).append(wrapper)
    return app
}

export class Flow {

    constructor(store){
        this.step = 0
        this.flow = []
        this.store = store
    }
    
    addStep(handler){
        const step = {
            id: this.flow.length,
            store: this.store,
            resolve: this.resolve.bind(this),
            root: this,
            handler
        }
        this.flow.push(step)
        return this
    }
    
    resolve(timeStamp){
        this.step++
        setTimeout(() => {
            const current = this.flow[this.step]
            current?.handler(current)
        }, timeStamp || 0)
    }

    init() {
        this.flow[0].handler(this.flow[0])
    }
}