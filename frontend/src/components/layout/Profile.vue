<script lang="ts" setup>
import siteConfig from '../../site-config'

const links = false ? {    ///acá este false debe ser cambiado por una condición que verifique si el usuario está logueado
    text: 'Perfil',
    href: '/profile',
  }: {
    text: 'Login',
    href: '/login',
  }
</script>

<template>
  <a :href="links.href">
    {{ links.text }}
  </a>
</template>
