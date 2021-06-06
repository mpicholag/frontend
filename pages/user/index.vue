<template>
  <div>
    <vFlex class="d-flex">
      <vCol>
        <h1 class="text-h4">Usuarios</h1>
      </vCol>
      <vCol class="d-flex justify-end">
        <vTooltip bottom>
          <template #activator="{ on, attrs }">
            <vBtn
              v-bind="attrs"
              to="/user/new"
              color="primary"
              rounded
              dark
              v-on="on"
            >
              <vIcon dark> mdi-plus </vIcon>
            </vBtn>
          </template>
          <span>Crear usuario</span>
        </vTooltip>
      </vCol>
    </vFlex>
    <vCard>
      <vCardTitle>
        <vTextField
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar..."
          single-line
          hide-details
        ></vTextField>
      </vCardTitle>
      <vDataTable
        :headers="headers"
        :items="items"
        :items-per-page="5"
        :loading="loading"
        :search="search"
        loading-text="Cargando... por favor espere"
      >
        <template #[`item.status`]="{ item }">
          <vSwitch
            v-model="item.status"
            :value="item.status"
            inset
            :label="item.status ? 'Si' : 'No'"
          />
        </template>
      </vDataTable>
    </vCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { UserType } from '@/api/types'
import { UserApi } from '@/api'

@Component({
  layout: 'authenticated',
})
export default class IndexCategoryPage extends Vue {
  async asyncData() {
    const items = await UserApi.getAllUser()
    const loading = false

    return {
      items,
      loading
    }
  }
  loading: boolean = true
  search: string = ''
  headers: Array<Object> = [
    { text: 'Nombres', value: 'first_name' },
    { text: 'Apellidos', value: 'last_name' },
    { text: 'Email', value: 'email' },
    { text: 'Estado', value: 'status' }
  ]

  items: Array<UserType> = []
}
</script>
