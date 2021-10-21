import { createApp } from 'vue/dist/vue.esm-bundler';
import { Flow, mountApp } from "./core.utils.js";
import { useFlowStore } from "../stores/flow.store.js"
import messageBox from "../components/messageBox.vue"
import messageButton from "../components/messageButton.vue"
import messageTile from "../components/messageTile.vue"

const FlowInstance = new Flow()
const STEP_DELAY = 350


FlowInstance.addStep(function(){
    mountApp({
      components: {
        messageBox,
      },
      template: /*html*/`
        <message-box>
          Cześć, nazywam się inferBot. Dzięki <b style="font-weight: 600">Infermedica API</b> mogę pomóc ci w postawieniu hipotetycznej diagnozy na podstawie twoich dolegliwości.
        </message-box>
      `
    }, "#app")

    this.resolve()
})

FlowInstance.addStep(function(){
  const comp_resolve = () => this.resolve()
  mountApp({
    components: {
      messageBox,
      messageButton
    },
    methods: {
      comp_resolve
    },
    template: /*html*/`
      <message-box>
        O możliwościach naszego wspaniałego API dowiesz się więcej <a style="color: #fff" href="https://developer.infermedica.com">tutaj</a>
        <div style="margin-top: 16px;">
          <message-button @click="comp_resolve">Zaczynajmy!</message-button>
        </div>
      </message-box>
    `
  }, "#app")
})

FlowInstance.addStep(function(){
  const comp_resolve = (sex) => {
    this.root.store.apiState.sex.value = sex
    this.resolve()
  }

  mountApp({
    components: {
      messageBox,
      messageTile
    },
    data(){
      return {
        activeSex: 'null'
      }
    },
    methods: {
      set_sex(sex){
        this.activeSex = sex
        comp_resolve(sex)
      }
    },
    template: /*html*/`
      <message-box>
        Najpierw muszę zebrać od ciebie kilka podstawowych informacji. Proszę podaj mi swoją płeć.
        <div class="divider-grid">
          <message-tile :active="activeSex == 'female' ? true : false" @click="set_sex('female')" icon="/female.svg" text="Kobieta"></message-tile>
          <message-tile :active="activeSex == 'male' ? true : false" @click="set_sex('male')" icon="/male.svg" text="Mężczyzna"></message-tile>
        </div>
      </message-box>
    `
  }, "#app")

  this.resolve()
})

FlowInstance.addStep(function(){
  mountApp({
    components: {
      messageBox,
      messageButton,
    },
    template: /*html*/`
    <message-box>
      Świetnie! Teraz muszę poznać twój wiek.
      <p style="font-size: 10px;">(Czekamy aż Daniel dokończy slider.)</p>
      <div>
        <message-button>Mam 18 lat!</message-button>
      </div>
    </message-box>
    `
  }, "#app")
})


export const init = (store) => FlowInstance.init(store)