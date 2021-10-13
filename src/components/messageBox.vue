<template>
  <div :class="type">
    <slot />
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
});
const type = computed(() => "message--" + props.type);
</script>

<style lang="scss" scoped>
.message {
  position: relative;
  border-radius: 5px;
  font-size: 14px;
  padding: 20px;

  &--primary {
    @extend .message;
    background: #3f94ff;
    color: #fff;
  }
  &--grey {
    @extend .message;
    background: #deedff;
    color: #112950;
  }
}
</style>
