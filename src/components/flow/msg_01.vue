<template>
    <message-box>
        O możliwościach naszego wspaniałego API dowiesz się więcej
        <a style="color: #fff" href="https://developer.infermedica.com">tutaj</a>
        <div style="margin-top: 16px;">
            <message-button :disabled="!state.btnClickable" @click="next">Zaczynajmy!</message-button>
        </div>
    </message-box>
</template>

<script setup>
import { inject, reactive } from 'vue';
const flow = inject('flow')
const state = inject('state')

function next(){
    if(state.btnClickable) {
        flow.push({
            id: 0,
            component: "msg00",
            props: {},
            state: reactive({}),
        })
    }
    state.btnClickable = false
}
</script>