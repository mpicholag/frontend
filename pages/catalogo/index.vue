<template>
  <div>
    <vFlex class="d-flex">
      <vCol>
        <h1 class="text-h4">Catalogos direcciones</h1>
      </vCol>
      <vCol class="d-flex justify-end">
        <vTooltip bottom>
          <template #activator="{ on, attrs }">
            <vBtn
              v-bind="attrs"
              to="/catalogo/new"
              color="primary"
              rounded
              dark
              v-on="on"
            >
              <vIcon dark> mdi-plus </vIcon>
            </vBtn>
          </template>
          <span>Crear catalogo</span>
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
        <template #[`item.actions`]="{ item }">
          <vTooltip bottom>
            <template #activator="{ on, attrs }">
              <vBtn
                rounded
                small
                v-bind="attrs"
                :to="{ name: 'catalogo-id', params: { id: item.ID_CATALOGO } }"
                v-on="on"
              >
                <vIcon small class="mr-2"> mdi-pencil </vIcon>
              </vBtn>
            </template>
            <span>Modificar catalogo</span>
          </vTooltip>
        </template>
      </vDataTable>
    </vCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { CatalogoTypes } from '@/api/types'
import { CatalogoApi } from '@/api'

@Component({
  layout: 'authenticated',
})
export default class IndexCategoryPage extends Vue {
  async asyncData() {
    const items = await CatalogoApi.getAllCatalogo()
    const loading = false
    return {
      items,
      loading
    }
  }

  loading: boolean = true
  search: string = ''
  headers: Array<Object> = [
    { text: 'Id', value: 'ID_CATALOGO' },
    { text: 'Numero de casa', value: 'NUM_CASA' },
    { text: 'Calle y avenida', value: 'CALLE_AVENIDA' },
    { text: 'Ciudad', value: 'CIUDAD' },
    { text: 'Actions', value: 'actions', sortable: false },
  ]

  items: Array<CatalogoTypes> = []
}
</script>
