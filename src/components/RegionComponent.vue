<template>
    <div class="container-msg">
        <MessageButton class="button-go--back" @click.native="go(true)">l</MessageButton>
        <div class="container-msg__region-display">
            <div
                v-for="(tile, index) in state.tiles"
                :key="tile.text"
                class="container-msg__region-tile"
                :data-index="index"
                :style="initialTransform(index)"
            >{{ index }}</div>
        </div>
        <MessageButton class="button-go--next" @click.native="go(false)">r</MessageButton>
    </div>
    {{state}}
</template>

<script setup>
import { reactive, ref } from "vue"

const state = reactive({
    current_tile: 0,
    tiles: [{ text: 1 }, { text: 2 }, { text: 3 }]
})

function initialTransform(index) {
    return `transform: translateX(${(index * 100)}%)`
}

function go(direction){
    if(state.current_tile === 0 && direction) return
    else if(state.current_tile === state.tiles.length - 1 && !direction) return
    
    if(direction) state.current_tile--
    else state.current_tile++
    
    const tiles = document.querySelectorAll(".container-msg__region-tile")
    tiles.forEach(element => {
        let current = parseInt(element.style.transform.slice(11, -2))
        element.style.transform = `translateX(${direction ? current+100 : current-100}%)`
    });
}
</script>

<style lang="scss">
.button-go {
    width: 25px !important;
    height: 45px !important;
    display: flex;
    align-items: center;
    justify-content: center;

    &--back {
        @extend .button-go;
    }

    &--next {
        @extend .button-go;
    }
}

.container-msg {
    display: grid;
    grid-gap: 15px;
    align-items: center;
    grid-template-columns: min-content 1fr min-content;

    &__region-display {
        min-height: 160px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    &__region-tile {
        display: block;
        position: absolute;
        transition: all ease-in-out 200ms;
        width: 100%;
        height: 100%;
    }

    &__region-tile:first-child {
        background-color: blue;
    }

    &__region-tile:last-child {
        background-color: green;
    }
}
</style>