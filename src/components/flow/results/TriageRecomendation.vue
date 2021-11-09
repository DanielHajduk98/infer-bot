<template>
  <message-box>
    <div class="recommendation">
      <h2 class="recommendation__heading">Call an ambulance</h2>
      <p class="recommendation__paragraph">
        Their symptoms are very serious, and they may require emergency care. Do
        not delay. Call an ambulance right now.
      </p>
    </div>
  </message-box>
</template>

<script setup></script>

<style scoped lang="scss">
.recommendation {
  &__heading {
    font-weight: 600;
    font-size: $font-medium;
    line-height: $font-line-medium;
    margin-top: 0;
  }

  &__paragraph {
    font-weight: normal;
    font-size: $font-extra-small;
    line-height: 19px;
  }
}
</style>
