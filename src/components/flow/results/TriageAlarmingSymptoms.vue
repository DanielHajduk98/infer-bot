<template>
  <message-box>
    <div class="alarming">
      <h2 class="alarming__heading">Alarming Symptoms</h2>
      <ul>
        <li>Confusion after an injury</li>
        <li>Shortness of breath starting within the hour</li>
        <li>Blood oxygen level between 90 and 94%</li>
        <li>Breathing problems after an injury</li>
        <li>Sudden breathing problems after an injury</li>
      </ul>
    </div>
  </message-box>
</template>

<script setup></script>

<style scoped lang="scss">
.alarming {
  &__heading {
    margin-top: 0;
    font-weight: 600;
    font-size: $font-line-small;
    line-height: $font-line-medium;
  }

  ul {
    padding: 0 0 0 13px;
    list-style-type: disc;
  }

  ul > li {
    font-weight: normal;
    font-size: $font-extra-small;
    line-height: $font-extra-small;
    margin-bottom: 9px;
  }
}
</style>
