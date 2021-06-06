<template>
  <vApp class="app-navbar" dark>
    <vNavigationDrawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <vFlex class="pa-2 p">
        <vAvatar class="app-navbar__avatar" color="primary" size="40">
          {{ name }}
        </vAvatar>
      </vFlex>
      <vList>
        <vListItem
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <vListItemAction>
            <vIcon>{{ item.icon }}</vIcon>
          </vListItemAction>
          <vListItemContent>
            <vListItemTitle v-text="item.title" />
          </vListItemContent>
        </vListItem>
      </vList>
      <template #append>
        <div class="pa-2">
          <vBtn color="error" block @click="logout()">Cerrar sesión</vBtn>
        </div>
      </template>
    </vNavigationDrawer>
    <vAppBar
      dark
      class="app-navbar"
      color="primary"
      :clipped-left="clipped"
      fixed
      app
    >
      <vAppBarNavIcon @click.stop="drawer = !drawer" />
      <vBtn icon @click.stop="miniVariant = !miniVariant">
        <vIcon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</vIcon>
      </vBtn>
      <vBtn icon @click.stop="clipped = !clipped">
        <vIcon>mdi-application</vIcon>
      </vBtn>
      <vBtn icon @click.stop="fixed = !fixed">
        <vIcon>mdi-minus</vIcon>
      </vBtn>
      <vToolbarTitle v-text="title" />
      <vSpacer />
    </vAppBar>
    <vMain>
      <vContainer>
        <slot />
      </vContainer>
    </vMain>
    <vFooter :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </vFooter>
  </vApp>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { authStore } from '@/store'

@Component
export default class AppNavbar extends Vue {
  clipped: boolean = false
  drawer: boolean = true
  fixed: boolean = false
  miniVariant: boolean = false
  right: boolean = true
  rightDrawer: boolean = false
  title: string = ''
  items: Array<Object> = [
    {
      icon: 'mdi-view-dashboard',
      title: 'Reportes',
      to: '/'
    },
    {
      icon: 'mdi-shape',
      title: 'Catalogos direcciones',
      to: '/catalogo',
    },
  ]

  get name(): string {
    const user = authStore.user
    const lastName = user?.last_name ? user.last_name[0].toUpperCase() : ''
    return user ? `${user.first_name[0].toUpperCase()}${lastName}` : ''
  }

  async logout(): Promise<void> {
    await this.$auth.logout()
    this.$router.replace('/login')
  }
}
</script>

<style lang="scss" scoped>
.app-navbar {
  &__avatar {
    cursor: pointer;
    color: #fff;
  }
}
</style>
