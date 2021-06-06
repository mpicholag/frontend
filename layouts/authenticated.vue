<template>
  <main>
    <NotificationList />
    <PortalTarget name="modal" />
    <AppNavbar>
      <nuxt />
    </AppNavbar>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { authStore } from '@/store'
import { UserApi } from '@/api'

@Component({
  middleware: ['unauthenticated']
})
export default class AuthenticatedLayout extends Vue {

  async created() {
    const user = await UserApi.getMe();
    authStore.SET({ key: 'user', value: user})
  }
}
</script>

<style lang="scss" scoped>
.app-navbar {
  color: #FFF;
}
</style>