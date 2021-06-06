<template>
  <vFlex>
    <vCol>
      <h1 v-if="!Id" class="text-h3">Crear archivador</h1>
      <h1 v-else class="text-h3">
        Modificar archivador: <strong>{{ Id }}</strong>
      </h1>
    </vCol>
    <vCol sm="12" md="12" lg="8" xl="8" order-lg="2" offset-xl="2">
      <ValidationObserver
        v-slot="{ handleSubmit }"
        ref="validationProvider"
        slim
      >
        <form class="login-form" @submit.prevent="handleSubmit(onSubmit)">
          <FormInput
            id="name"
            v-model="archivador.name"
            label="Nombre"
            name="Nombre"
            rules="required"
          />
          <FormInput
            id="description"
            v-model="archivador.description"
            label="Descripción"
            name="Descripción"
            rules="required"
          />
          <vCol class="d-flex justify-center">
            <vBtn type="submit" color="primary">Guardar</vBtn>
            <vBtn to="/archivador" type="button">Cancelar</vBtn>
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

import { ArchivadorTypes } from '@/api/types'
import { ArchivadorApi } from '@/api'

@Component({
  layout: 'authenticated',
  components: {
    ValidationObserver,
  },
})
export default class ArchivadorForm extends Vue {
  loading: boolean = true
  archivador: ArchivadorTypes = {
    name: '',
    description: '',
    status: true,
  }

  get Id(): string {
    return this.$route.params.id
  }

  async asyncData({ params }: Context) {
    const loading = false
    if (params.id) {
      const item = await ArchivadorApi.getArchivador(params.id)
      const archivador = item as ArchivadorTypes
      return { loading, archivador }
    }

    return { loading }
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
      await ArchivadorApi.updateArchivador(this.archivador, id)
    } else {
      await ArchivadorApi.createArchivador(this.archivador)
      this.$router.replace('/archivador')
    }
  }
}
</script>
