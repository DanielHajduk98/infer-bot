import { Flow, mountApp } from "./core.utils.js";
import messageBox from "../components/messageBox.vue"
import messageButton from "../components/messageButton.vue"
import messageTile from "../components/messageTile.vue"


export default (store) => {

  const flow = new Flow(store)

  flow.addStep((ctx) => {

    const TEMPLATE = /*html*/`
      <message-box>
        Cześć, nazywam się inferBot. Dzięki <b style="font-weight: 600">Infermedica API</b> mogę pomóc ci w postawieniu hipotetycznej diagnozy na podstawie twoich dolegliwości.
      </message-box>
    `
    const OPTIONS = {
      components: {
        messageBox
      }
    }

    mountApp(TEMPLATE, OPTIONS, "#app")

    ctx.resolve(1000)
  })
  .addStep((ctx) => {

    const TEMPLATE = /*html*/`
      <message-box>
        O możliwościach naszego wspaniałego API dowiesz się więcej <a style="color: #fff" href="https://developer.infermedica.com">tutaj</a>
        <div style="margin-top: 16px;">
          <message-button @click="comp_resolve">Zaczynajmy!</message-button>
        </div>
      </message-box>
    `

    const OPTIONS = {
      components: {
        messageBox,
        messageButton
      },
      methods: {
        comp_resolve() {
          ctx.resolve()
        }
      }
    }

    mountApp(TEMPLATE, OPTIONS, "#app")

  })
  .addStep((ctx) => {

    const TEMPLATE = /*html*/`<message-box type="grey">Zaczynamy!</message-box>`
    const OPTIONS = { components: { messageBox } }

    mountApp(TEMPLATE, OPTIONS, "#app")
    ctx.resolve(1000)

  })
  .addStep((ctx) => {
    const TEMPLATE = /*html*/`
    <message-box>
      Najpierw muszę zebrać od ciebie kilka podstawowych informacji. Proszę podaj mi swoją płeć.
      <div class="divider-grid">
        <message-tile :active="activeSex == 'female' ? true : false" @click="set_sex('female')" icon="/female.svg" text="Kobieta"></message-tile>
        <message-tile :active="activeSex == 'male' ? true : false" @click="set_sex('male')" icon="/male.svg" text="Mężczyzna"></message-tile>
      </div>
    </message-box>
    `
    const OPTIONS = {
      components: {
        messageBox,
        messageTile
      },
      data() {
        return {
          activeSex: 'null'
        }
      },
      methods: {
        set_sex(sex) {
          this.activeSex = sex
          ctx.store.apiState.sex.value = sex
          ctx.resolve(500)
        }
      },
    }

    mountApp(TEMPLATE, OPTIONS, "#app")

  })
  .addStep((ctx) => {

    const TEMPLATE = /*html*/`
      <message-box>
        Świetnie! Teraz muszę poznać twój wiek.
        <p style="font-size: 10px;">(Czekamy aż Daniel dokończy slider.)</p>
        <div>
          <message-button @click="comp_resolve">Mam 18 lat!</message-button>
        </div>
      </message-box>
    `

    const OPTIONS = {
      components: {
        messageBox,
        messageButton,
      },
      methods: {
        comp_resolve(){
          ctx.resolve(200)
        }
      }
    }

    mountApp(TEMPLATE, OPTIONS, "#app")
  })
  .init()
}