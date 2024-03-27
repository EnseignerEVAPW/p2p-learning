<script lang="ts" setup>
import siteConfig from '../site-config'

const links = siteConfig.profile
</script>

<template>
  <a :href="links.href">
    {{ links.text }}
  </a>
</template>
