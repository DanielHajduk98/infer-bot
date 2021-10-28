<template>
  <section class="diagnosis-page">
    <template v-if="has_emergency_evidence">
      <div class="recommendation">
        <h2 class="recommendation__heading">Call an ambulance</h2>
        <p class="recommendation__paragraph">
          Their symptoms are very serious, and they may require emergency care.
          Do not delay. Call an ambulance right now.
        </p>
      </div>

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
    </template>

    <div class="results">
      <h2 class="results__heading">Results</h2>
      <p class="results__paragraph">
        Please note that the list below may not be complete and is provided
        solely for informational purposes and is not a qualified medical
        opinion.
      </p>

      <ConditionPercentage
        v-for="(condition, index) in conditions"
        :key="index"
        class="results__condition"
        :percentage="condition.probability"
        :name="condition.name"
      />
    </div>
  </section>
</template>

<script setup>
import { useFlowStore } from "../stores/flow.store";

const store = useFlowStore(),
  conditions = store.diagnosis.conditions,
  has_emergency_evidence = store.diagnosis.has_emergency_evidence;

conditions.forEach((condition) => {
  condition.probability *= 100;
});
</script>

<style lang="scss" scoped>
.recommendation {
  &__heading {
    font-weight: 600;
    font-size: $font-line-small;
    line-height: $font-line-medium;
    color: $text;
    margin-top: 0;
  }

  &__paragraph {
    font-weight: normal;
    font-size: $font-extra-small;
    line-height: 19px;
    color: $grey;
  }
}

.alarming {
  &__heading {
    margin-top: 0;
    font-weight: 600;
    font-size: $font-line-small;
    line-height: $font-line-medium;
    color: $text;
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
    color: $grey;
  }
}

.results {
  background-color: $primary;
  color: $text-white;
  height: 100%;
  transform: translateX(-30px);
  width: calc(100% + 60px);
  padding: 15px 30px;

  &__heading {
    font-weight: 600;
    font-size: $font-line-small;
    line-height: $font-line-medium;
  }

  &__paragraph {
    font-size: $font-tiny;
    line-height: $font-line-small;
    margin-bottom: 18px;
  }

  &__condition {
    margin-bottom: 15px;
  }

  &__condition:last-child {
    margin-bottom: 0;
  }
}
</style>
