<template>
  <button class="button">
    <slot />
  </button>
</template>

<script>
export default {};
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

  &:hover {
    background-color: #2c7bdb;
    color: #fff;
  }

  &:active {
    transform: scale(1.05);
  }
}
</style>
