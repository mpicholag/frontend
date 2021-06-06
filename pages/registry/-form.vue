<template>
  <vFlex>
    <vCol>
      <h1 v-if="!Id" class="text-h3">Crear archivo</h1>
      <h1 v-else class="text-h3">
        Modificar archivo: <strong>{{ Id }}</strong>
      </h1>
    </vCol>
    <vCol sm="12" md="12" lg="8" xl="8" order-lg="2" offset-xl="2">
      <ValidationObserver
        v-slot="{ handleSubmit }"
        ref="validationProvider"
        slim
      >
        <form class="login-form" @submit.prevent="handleSubmit(onSubmit)">
          <vSelect
            v-model="registry.archivador_id"
            label="Archivo"
            :items="items"
            item-value="id"
            item-text="name"
          />
          <FormInput
            id="name"
            v-model="registry.name"
            label="Nombre"
            name="Nombre"
            rules="required"
          />
          <FormInput
            id="description"
            v-model="registry.description"
            label="Descripción"
            name="Descripción"
            rules="required"
          />
          <FormInput
            id="address"
            v-model="registry.address"
            label="Dirección"
            name="Dirección"
            rules="required"
          />
          <FormInput
            id="phone"
            v-model="registry.phone"
            label="Teléfono"
            name="Teléfono"
            rules="required"
          />
          <vCol class="d-flex justify-center">
            <vBtn type="submit" color="primary">Guardar</vBtn>
            <vBtn to="/registry" type="button">Cancelar</vBtn>
          </vCol>
        </form>
      </ValidationObserver>
    </vCol>
  </vFlex>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import { ValidationObserver } from 'vee-validate'

import { RegistryTypes, ArchivadorTypes } from '@/api/types'
import { RegistryApi, ArchivadorApi } from '@/api'

@Component({
  layout: 'authenticated',
  components: {
    ValidationObserver,
  },
})
export default class RegistryForm extends Vue {
  loading: boolean = true
  registry: RegistryTypes = {
    archivador_id: null,
    name: '',
    description: '',
    address: '',
    phone: ''
  }
  items: Array<ArchivadorTypes> = []

  get Id(): string {
    return this.$route.params.id
  }

  async asyncData({ params }: Context) {
    const items = await ArchivadorApi.getAllArchivador()
    if (params.id) {
      const item = await RegistryApi.getRegistry(params.id)
      const loading = false
      const registry = item as RegistryTypes
      return { loading, registry, items }
    }
    return { items }
  }

  async onSubmit(): Promise<void> {
    const isValid = await (
      this.$refs.validationProvider as InstanceType<typeof ValidationObserver>
    ).validate()
    if (!isValid) {
      return
    }
    const id = this.Id
    if (id) {
      await RegistryApi.updateRegistry(this.registry, id)
    } else {
      await RegistryApi.createRegistry(this.registry)
      this.$router.replace('/registry')
    }
  }
}
</script>
