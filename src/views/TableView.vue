<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const { type, id } = route.params;
console.log(type, id);
</script>

<template>
    <h1>Creating table {{ type }} {{ id }}</h1>
</template>