<template>
  <main>
        <vSnackbar
    	color="blue-grey"
    	:value="true"
       dark
    >sfsfds</vSnackbar>
    <nuxt />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DefaultLayout extends Vue {}
</script>
