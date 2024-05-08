<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

const isLoggedIn = ref(false);

onMounted(() => {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
});

const links = computed(() => isLoggedIn.value ? {
  text: 'Logout',
  href: '/logout',
} : {
  text: 'Login',
  href: '/login',
});
</script>

<template>
  <a :href="links.href">
    {{ links.text }}
  </a>
</template>
