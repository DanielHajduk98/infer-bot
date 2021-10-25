<template>
    <div :class="inputClass">
        <input ref="input" placeholder="Type something" type="text" class="input__text-field">
        <button class="input__button" @click="emitMessage"></button>
    </div>
</template>

<script setup>
import { ref, computed } from "vue"
const emit = defineEmits(["message"])
const props = defineProps(["shown"])
const input = ref(null)

const inputClass = computed(()=> {
    if(props.shown) return "input"
    return "input--hidden"
})
function emitMessage(){
    emit("message", input.value.value)
}
</script>

<style lang="scss" scoped>
.input {
    position: fixed;
    bottom: 0px;
    height: 74px;
    width: 408px;
    background-color: #fff;
    left: 50%;
    transform: translateX(-50%);
    padding: 19px 37px;
    box-shadow: 0px -3px 4px rgba(0, 0, 0, 0.16);
    z-index: 9999;
    display: flex;
    transition: all ease 250ms;

    &--hidden {
        transform: translateX(-50%) translateY(100%);
        @extend .input;
    }

    &__text-field{
        padding-left: 8px;
        border: none;
        border-bottom: 3px solid #3F94FF;
        height: 100%;
        width: 100%;
        outline: none;
    }

    &__text-field::placeholder{
        color: #CACACA;
    }

    &__button {
        position: absolute;
        right: 45px;
        top: 50%;
        transform: translateY(-50%);
        background-image: url("../assets/message_button.svg");
        height: 20px;
        width: 16px;
        padding: 2px;
        background-position: center;
        background-repeat: no-repeat;
        border: none;
        background-color: transparent;
    }
}
</style>