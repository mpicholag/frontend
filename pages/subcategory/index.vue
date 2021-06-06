<template>
  <div>
    <vFlex class="d-flex">
      <vCol>
        <h1 class="text-h4">Subcategorías</h1>
      </vCol>
      <vCol class="d-flex justify-end">
        <vTooltip bottom>
          <template #activator="{ on, attrs }">
            <vBtn
              v-bind="attrs"
              to="/subcategory/new"
              color="primary"
              rounded
              dark
              v-on="on"
            >
              <vIcon dark> mdi-plus </vIcon>
            </vBtn>
          </template>
          <span>Crear subcategoría</span>
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
                :to="{ name: 'subcategory-id', params: { id: item.id } }"
                v-on="on"
              >
                <vIcon small class="mr-2"> mdi-pencil </vIcon>
              </vBtn>
            </template>
            <span>Modificar Subcategoría</span>
          </vTooltip>
        </template>
      </vDataTable>
    </vCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { SubcategoryTypes } from '@/api/types'
import { SubcategoryApi } from '@/api'

@Component({
  layout: 'authenticated',
})
export default class IndexCategoryPage extends Vue {
  loading: boolean = true
  search: string = ''
  headers: Array<Object> = [
    { text: 'Id', value: 'id' },
    { text: 'Nombre', value: 'name' },
    { text: 'Descripción', value: 'description' },
    { text: 'Estado', value: 'status' },
    { text: 'Actions', value: 'actions', sortable: false },
  ]

  items: Array<SubcategoryTypes> = []

  async listCategories(): Promise<void> {
    const items = await SubcategoryApi.getAllSubcategory()
    this.loading = false
    this.items = items
  }

  created(): void {
    this.listCategories()
  }
}
</script>
