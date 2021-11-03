<template>
  <button class="button" :class="buttonClass" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const buttonClass = computed(() => {
      if (props.disabled) return "button--disabled";
      else return "button";
    });

    return {
      buttonClass,
    };
  },
};
</script>

<style lang="scss" scoped>
.button {
  color: #3f94ff;
  background-color: #ffffff;
  width: min-content;
  padding: 6px 22px;
  border-radius: 30px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all ease 75ms;
  user-select: none;
  border: none;
  white-space: nowrap;

  &--disabled {
    filter: brightness(80%);
    pointer-events: none;
  }

  &:hover {
    background-color: #2c7bdb;
    color: #fff;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  &:active {
    transform: scale(1.05);
  }
}
</style>
