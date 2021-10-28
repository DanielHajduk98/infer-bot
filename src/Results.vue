<template>
    <div class="recomendation">
        <h2 class="recomendation__heading">Call an ambulance</h2>
        <p class="recomendation__paragraph">Their symptoms are very serious, and they may require emergency care. Do not delay. Call an ambulance right now.</p>
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

    <div class="results">
        <h2 class="results__heading">Results</h2>
        <p class="results__paragraph">Please note that the list below may not be complete and is provided solely for informational purposes and is not a qualified medical opinion.</p>

        <ConditionPercentage class="results__condition" name="Cancer"/>
        <ConditionPercentage class="results__condition" name="Cancer"/>
        <ConditionPercentage class="results__condition" name="Cancer"/>
        <ConditionPercentage class="results__condition" name="Cancer"/>
    </div>
</template>

<script setup>
</script>

<style>
#app {
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content 1fr;
    padding-bottom: 0 !important;
    background-color: red;
}
</style>

<style lang="scss" scoped>
.recomendation {
    &__heading {
        font-weight: 600;
        font-size: 15px;
        line-height: 22px;
        color: #112950;
        margin-top: 0;
    }

    &__paragraph {
        font-weight: normal;
        font-size: 12px;
        line-height: 19px;
        color: #696969;
    }
}

.alarming {
    &__heading {
        margin-top: 0;
        font-weight: 600;
        font-size: 15px;
        line-height: 22px;
        color: #112950;
    }

    ul {
        padding: 0 0 0 13px;
        list-style-type: disc;
    }

    ul > li {
        font-weight: normal;
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 9px;
        color: #696969;
    }
}

.results {
    background-color: #3F94FF;
    color: #fff;
    height: 100%;
    transform: translateX(-30px);
    width: calc(100% + 60px);
    padding: 15px 30px;

    &__heading {
        font-weight: 600;
        font-size: 15px;
        line-height: 22px;
    }

    &__paragraph {
        font-size: 10px;
        line-height: 16px;
        margin-bottom: 18px;
    }

    &__condition {
        margin-bottom: 15px;
    }

    &__condition::last-child {
        margin-bottom: 0;
    }
}
</style>