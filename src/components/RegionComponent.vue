<template>
  <div class="container-msg" ref="container">
    <MessageButton
       class="button-go--back"
      :style="buttonNotAllowed != 'Left' ? null : 'opacity: 0;'"
      @click="go(true)"
    >
      <img src="../assets/images/svg/arrow_full.svg" />
    </MessageButton>
    <div class="container-msg__region-display">
      <div
        v-for="(tile, index) in state.tiles"
        :key="tile.text"
        class="container-msg__region-tile"
        :data-index="index"
        :style="initialTransform(index)"
      >
        <span class="container-msg__region-title">{{ tile.name }}</span>
        <img class="container-msg__region-icon" :src="tile.img" alt="" />
        <MessageButton
          class="container-msg__region-button"
          @click="handleSelectButton(index)"
        >
          {{ tile.selected ? "Unselect" : "Select" }}
        </MessageButton>
      </div>
    </div>
    <MessageButton
      class="button-go--next"
      :style="buttonNotAllowed != 'Right' ? null : 'opacity: 0;'"
      @click="go(false)"
    >
      <img
        style="transform: rotate(180deg)"
        src="../assets/images/svg/arrow_full.svg"
      />
    </MessageButton>
  </div>
  <MessageButton class="button-done" @click="handleDone">Done</MessageButton>
</template>

<script setup>
import Hammer from "hammerjs"
import { reactive, computed, onMounted} from "vue";

import IMG_13 from "../assets/images/svg/map/US_CANADA.svg";
import IMG_14 from "../assets/images/svg/map/CENTRAL_SOUTH_AMERICA.svg";
import IMG_15 from "../assets/images/svg/map/EUROPE.svg";
import IMG_16 from "../assets/images/svg/map/NORTH_AFRICA.svg";
import IMG_17 from "../assets/images/svg/map/CENTRAL_AFRICA.svg";
import IMG_18 from "../assets/images/svg/map/SOUTH_AFRICA.svg";
import IMG_19 from "../assets/images/svg/map/AUSTRALIA_OCEANIA.svg";
import IMG_20 from "../assets/images/svg/map/RUSSIA.svg";
import IMG_21 from "../assets/images/svg/map/MIDDLE_EAST.svg";
import IMG_236 from "../assets/images/svg/map/ASIA.svg";
import MessageButton from "./MessageButton.vue";

const state = reactive({
  current_tile: 0,
  tiles: [
    {
      id: "p_13",
      selected: false,
      choice_id: "absent",
      source: "predefined",
      name: "Recent travel to the United States or Canada",
      img: IMG_13,
    },
    {
      id: "p_14",
      selected: false,
      choice_id: "absent",
      source: "predefined",
      name: "Recent travel to Central or South America",
      img: IMG_14,
    },
    {
      id: "p_15",
      selected: false,
      choice_id: "absent",
      source: "predefined",
      name: "Recent travel to Europe",
      img: IMG_15,
    },
    {
      id: "p_16",
      selected: false,
      choice_id: "absent",
      source: "predefined",
      name: "Recent travel to Northern Africa",
      img: IMG_16,
    },
    {
      id: "p_17",
      selected: false,
      choice_id: "absent",
      source: "predefined",
      name: "Recent travel to Central Africa",
      img: IMG_17,
    },
    {
      id: "p_18",
      selected: false,
      choice_id: "absent",
      source: "predefined",
      name: "Recent travel to Southern Africa",
      img: IMG_18,
    },
    {
      id: "p_19",
      selected: false,
      choice_id: "absent",
      source: "predefined",
      name: "Recent travel to Australia and Oceania",
      img: IMG_19,
    },
    {
      id: "p_20",
      selected: false,
      choice_id: "absent",
      source: "predefined",
      name: "Recent travel to Russia, Kazakhstan or Mongolia",
      img: IMG_20,
    },
    {
      id: "p_21",
      selected: false,
      choice_id: "absent",
      source: "predefined",
      name: "Recent travel to the Middle East",
      img: IMG_21,
    },
    {
      id: "p_236",
      selected: false,
      choice_id: "absent",
      source: "predefined",
      name: "Recent travel to Asia excluding Middle East, Russia, Mongolia and Kazakhstan",
      img: IMG_236,
    },
  ],
});

function initialTransform(index) {
  return `transform: translateX(${index * 100}%)`;
}

const emit = defineEmits(["update:modelValue", "done"]);

function emitVModelUpdate() {
  emit(
    "update:modelValue",
    state.tiles.filter((el) => el.selected)
  );
}

function handleSelectButton(i) {
  state.tiles[i].selected = !state.tiles[i].selected;
  emitVModelUpdate();
}

const buttonNotAllowed = computed(() => {
  if (state.current_tile === 0) return "Left";
  else if (state.current_tile === state.tiles.length - 1) return "Right";
  else return "null";
});

function go(direction) {
  if (state.current_tile === 0 && direction) return;
  else if (state.current_tile === state.tiles.length - 1 && !direction) return;

  if (direction) state.current_tile--;
  else state.current_tile++;

  const tiles = document.querySelectorAll(".container-msg__region-tile");
  tiles.forEach((element) => {
    let current = parseInt(element.style.transform.slice(11, -2));
    element.style.transform = `translateX(${
      direction ? current + 100 : current - 100
    }%)`;
  });
}

onMounted(() => {
    const container = document.querySelector(".container-msg")
    const HAMMER = Hammer(container)
    HAMMER.on('swipeleft', () => go(false))
    HAMMER.on('swiperight', () => go(true))
})

function handleDone() {
  emit("done", undefined);
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
  user-select: none;
  grid-gap: 15px;
  align-items: center;
  grid-template-columns: min-content 1fr min-content;
  height: 270px;

  &__region-display {
    height: 250px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  &__region-tile {
    position: absolute;
    justify-content: space-between;
    flex-direction: column;
    transition: all ease-in-out 200ms;
    display: flex;
    width: 100%;
    height: 100%;
  }

  &__region-title {
    font-size: $font-extra-small;
    text-align: center;
    display: block;
    font-weight: 600;
  }

  &__region-icon {
    padding: 10px;
    height: 130px;
    object-fit: contain;
    background-position: center;
  }

  &__region-button {
    margin: 0px auto 0px auto;
    display: block;
  }
}

.button-done {
  width: 100% !important;
}
</style>
