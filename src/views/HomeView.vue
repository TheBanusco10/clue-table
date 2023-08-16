<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';

const { logIn, logOut } = useAuthStore();
const { user, isLogged } = storeToRefs(useAuthStore());
</script>

<template>
  <main>
    <h1>Welcome to ClueTable!</h1>
    <router-link :to="{ name: 'Dashboard' }">Go to dashboard</router-link>
  </main>
</template>
