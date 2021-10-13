<script setup lang="ts">
  import {computed} from "vue";
  import {useIncrementer} from "../stores/counter";

  const counter = useIncrementer()
  const count = computed(() => counter.count)
  console.log(counter);
  counter.number++
  console.log(counter.getNumber)
  counter.$patch({ number: counter.number + 1 })
  console.log(counter.getNumber)
  counter.increment();
  console.log(counter.getNumber)
</script>

<template>
  <h1>{{ count }}</h1>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
