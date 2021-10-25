<template>
<slot/>
</template>

<script>
import { provide } from "vue"
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        props: {
            type: Object,
            required: true
        },
        state: {
            type: Object,
            required: true
        },
        flow: {
            type: Object,
            required: true
        }
    },
    setup(props){
        provide('flow', props.flow)
        provide('props', props.props)
        provide('id', props.id)
        provide('state', props.state)
        return {}
    }
}
</script>