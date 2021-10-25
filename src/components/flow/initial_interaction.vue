<template>
    <message-box>
        I'm based on Infermedica API. You can read more about that
        <a
            style="color: #fff"
            href="https://developer.infermedica.com"
        >Here</a>
        <div style="margin-top: 16px;">
            <message-button :disabled="btnDisabled" @click="next">Let's go!</message-button>
        </div>
    </message-box>
</template>

<script setup>
import { inject, ref } from 'vue';
const flow = inject('flow')
const btnDisabled = ref(false)

function next() {
    if (!btnDisabled.value) {
        flow.push({
            id: 2,
            component: "plain_user_response",
            props: { message: "Let's go!" },
        });

        setTimeout(() => {
            flow.push({
                id: 3,
                component: "initial_sex_question",
                props: {}
            })
        }, 800);
    }
    btnDisabled.value = true
}

</script>