import { reactive } from "vue"

export default [
    {
        id: 0,
        component: "msg00",
        props: {},
        state: reactive({}),
    },
    {
        id: 1,
        component: "msg01",
        props: {},
        state: reactive({
            btnClickable: true
        }),
    }
]