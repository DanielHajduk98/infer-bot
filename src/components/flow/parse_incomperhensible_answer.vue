<template>
    <message-box>
        Sorry, I'm not as smart as you are. 😞😘 Can you write you ailment again in a little bit diffrent way so I can understand it better..? Please ❤️
    </message-box>
</template>

<script setup>
import { inject, watch } from 'vue';
const flow = inject('flow')
const store = inject('store')
store.show_input = true
watch(() => store.input_value, () => {
    if(store.show_input === true){
        flow.push({
            id: 5,
            component: "parse_user_response",
            props: {
                message: store.input_value  
            },
        }),
        store.input_value = ""
    }
    store.show_input = false
})
</script>

<style scoped>
.btn-container{
    display: flex;
    gap: 16px;
    margin-top: 16px;
}
</style>