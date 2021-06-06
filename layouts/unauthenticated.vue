<template>
  <vMain class="unaunthenticated-layout">
    <vApp>
      <NotificationList />
      <nuxt />
    </vApp>
  </vMain>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import NotificationList from '@/components/notification/NotificationList.vue';

@Component({
  middleware: ['authenticated'],
  components: {
    NotificationList,
  },
})
export default class UnaunthenticatedLayout extends Vue {}
</script>

<style lang="scss" scoped>
.unaunthenticated-layout {
  min-height: 100vh;
}
</style>
