import { isThisTypeNode } from "typescript"
import { createApp, h, ref } from "vue"

export const callAPI = async (method, endpoint, body) => {
    fetch(endpoint, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "app-id": "",
            "api-key": ""
        },
        body: JSON.stringify(body)
    })
}

export const initializeComponent = (component, props, children, parentSelector) => {
    const componentInstance = createApp({
        setup(){
            return () => h(component, props, children)
        }
    }) 
    const wrapper = document.createElement("div")
    componentInstance.mount(wrapper)
    document.querySelector(parentSelector).append(wrapper)
}

export class Flow{

    step = 0

    constructor(){
        this.step = 0
        this.flow = []
    }
    
    resolve(){
        this.step = this.step + 1
        this.flow[this.step]?.handler()
    }

    addStep(handler){
        const stepObject = {
            id: this.flow.length,
            resolve: this.resolve.bind(this),
            handler
        }
        this.flow.push(stepObject)
        return stepObject
    }

    next(){
        return this.flow[this.step]
    }

    init(){
        this.flow[0].handler()
    }
}