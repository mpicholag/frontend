<template>
  <div>
    <vFlex class="d-flex">
      <vCol>
        <h1 class="text-h4">Direcciones</h1>
      </vCol>
      <vCol class="d-flex justify-end">
        <vDialog>
          <template v-slot:activator="{ on, attrs }">
            <vTooltip v-bind="attrs"
              v-on="on" bottom>
              <template #activator="{ on, attrs }">
                <vBtn
                  v-bind="attrs"
                  @click="modalOpened = true"
                  color="primary"
                  rounded
                  dark
                  v-on="on"
                >
                  <vIcon dark> mdi-plus </vIcon>
                </vBtn>
              </template>
              <span>Crear Nueva dirección</span>
            </vTooltip>
          </template>
          <vCard>
            <vCardTitle>
              Crear dirección
            </vCardTitle>
          </vCard>
          <vCardText>
            <ValidationObserver
              v-slot="{ handleSubmit }"
              ref="validationProvider"
              slim
            >
              <form @submit.prevent="handleSubmit(onSubmit)">
                <FormInput
                  id="title"
                  v-model="document.title"
                  label="Titulo"
                  name="Titulo"
                  rules="required"
                />
                <FormInput
                  id="title"
                  v-model="document.title"
                  label="Titulo"
                  name="Titulo"
                  rules="required"
                />
              </form>
            </ValidationObserver>
          </vCardText>
        </vDialog>
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

import { DocumentHistoryTypes } from '@/api/types'
import { DocumentApi } from '@/api'

@Component
export default class DocumentHistoryComponent extends Vue {
  loading: boolean = true
  search: string = ''
  modalOpened: boolean = false
  headers: Array<Object> = [
    { text: 'Dirección', value: 'address' },
    { text: 'Descripción', value: 'description' },
    { text: 'Estado', value: 'status' },
  ]
  items: Array<DocumentHistoryTypes> = []

  get Id(): string {
    return this.$route.params.id
  }

  async listCategories(): Promise<void> {
    const items = await DocumentApi.getAllDocumentHistory(this.Id)
    this.loading = false
    this.items = items
  }

  onSubmit() {}

  mounted(): void {
    this.listCategories()
  }
}
</script>
