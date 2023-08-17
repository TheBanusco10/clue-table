<template>
    <h1>Your dashboard</h1>
    <router-link :to="{ name: 'Table', params: { type: 'classic' } }">Classic game</router-link>
</template>