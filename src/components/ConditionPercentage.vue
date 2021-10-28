<template>
    <div class="display">
        <div class="display__name">{{name}}</div>
        <div class="display__bar-container">
            <div class="display__bar" :style="`width: ${percentage};`"></div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
    name: {
        type: String,
        default: "{{default string}}"
    },
    percentage: {
        type: Number,
        default: 75
    }
})

const percentage = computed(() => props.percentage + "%")
</script>

<style lang="scss" scoped>
.display {
    background-color: #fff;
    padding: 15px;
    border-radius: 3px;
    &__name {
        color: #112950;
        font-size: 12px;
        line-height: 17px;
        font-weight: 600;
    }

    &__bar-container {
        height: 9px;
        width: 100%;
        background-color: #8DC0FF;
        margin-top: 9px;
        border-radius: 18px;
    }

    &__bar {
        height: 9px;
        width: 10%;
        background-color: #3F94FF;
        margin-top: 9px;
        border-radius: 18px;
    }
}
</style>