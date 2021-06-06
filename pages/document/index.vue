<template>
  <div>
    <vFlex class="d-flex">
      <vCol>
        <h1 class="text-h4">Documentos</h1>
      </vCol>
      <vCol class="d-flex justify-end">
        <vTooltip bottom>
          <template #activator="{ on, attrs }">
            <vBtn
              v-bind="attrs"
              to="/document/new"
              color="primary"
              rounded
              dark
              v-on="on"
            >
              <vIcon dark> mdi-plus </vIcon>
            </vBtn>
          </template>
          <span>Crear documento</span>
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
      <v-list>
        <v-list-group v-for="item of archivadores" :key="item.id">
          <template #activator>
            <v-list-item @click="selectArchivador(item.id)">
              <v-list-item-title
                >Archivador - {{ item.name }}</v-list-item-title
              >
            </v-list-item>
          </template>
          <v-list-group
            v-for="product of findRegistry(archivador)"
            :key="product.id"
            :value="true"
            no-action
            sub-group
          >
            <template #activator>
              <v-list-item @click="selectRegistry(product.id)" link>
                <v-list-item-content>
                  <v-list-item-title>{{ product.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item link>
              <v-list-item-content>
                <DocumentTable :registry="registry" v-if="registry === product.id" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </vCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { DocumentApi } from '@/api'
import { DocumentArchivadorTypes } from '@/api/types'

@Component({
  layout: 'authenticated',
})
export default class IndexDocumentPage extends Vue {
  archivador: number | null = null
  registry: number | null = null
  search: string = ''

  archivadores: Array<DocumentArchivadorTypes> = []

  selectArchivador(id: number) {
    this.archivador = id
  }

  findRegistry(id: number) {
    const items = this.archivadores.find((item) => item.id === id)?.registries
    return items
  }

  selectRegistry(id: number) {
    this.registry = id
  }

  async asyncData() {
    const archivadores = await DocumentApi.getAllDocumentArchivador()

    return {
      archivadores,
    }
  }
}
</script>

<style lang="scss">
.v-list-group__header {
  border-bottom: solid 2px lightblue;
}
</style>
