<template>
  <div>
    <vDataTable
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :loading="loading"
      loading-text="Cargando... por favor espere"
    >
      <template #[`item.actions`]="{ item }">
        <vTooltip bottom>
          <template #activator="{ on, attrs }">
            <vBtn
              rounded
              small
              v-bind="attrs"
              :to="{ name: 'document-id', params: { id: item.id } }"
              v-on="on"
            >
              <vIcon small class="mr-2"> mdi-pencil </vIcon>
            </vBtn>
          </template>
          <span>Modificar documento</span>
        </vTooltip>
      </template>
      <template #[`item.path_document`]="{ item }">
        <a
          v-if="item.path_document"
          :href="`${ApiUrl}/download?file=${item.path_document}`"
          target="_blank"
          >{{ item.path_document }}</a
        >
      </template>
    </vDataTable>
    <Portal to="modal">
      <AppModal
        title="Documento"
        :opened="modalOpened"
        @close="modalOpened = !modalOpened"
      >
        <template #body>
          <vFlex>
            <vCol>
              Esta seguro de eliminar el documento con el id
              <strong>{{ documentId }}</strong>
            </vCol>
          </vFlex>
        </template>
        <template #actions>
          <div>
            <vBtn color="error"> Guardar </vBtn>
            <vBtn dark @click="closeModal()"> Cancelar </vBtn>
          </div>
        </template>
      </AppModal>
    </Portal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import { DocumentApi } from '@/api'
import { DocumentTypes } from '@/api/types'

@Component
export default class DocumentTable extends Vue {
  modalOpened: boolean = false
  headers: Array<Object> = [
    { text: 'Id', value: 'id' },
    { text: 'Titulo', value: 'title' },
    { text: 'Descripción', value: 'description' },
    { text: 'Documento', value: 'path_document' },
    { text: 'Actions', value: 'actions', sortable: false },
  ]
  items: Array<DocumentTypes> = []
  documentId!: number | null
  loading: boolean = true

  @Prop({ required: true }) registry!: number | string;

  get ApiUrl(): string {
    return process.env.API_URL as string
  }

  openModalDelete(id: number): void {
    this.documentId = id
    this.modalOpened = true
  }

  closeModal(): void {
    this.documentId = null
    this.modalOpened = false
  }

  async mounted(): Promise<void> {
    const items = await DocumentApi.getAllDocument({ registry: this.registry})
    if (items) {
      this.loading = false
    }
    this.items = items
  }
}
</script>
