<template>
  <vFlex>
    <vCol>
      <h1 v-if="!Id" class="text-h3">Crear catalogo</h1>
      <h1 v-else class="text-h3">
        Modificar catalogo: <strong>{{ Id }}</strong>
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
            v-model="catalogo.NUM_CASA"
            label="Numero de casa"
            name="num_casa"
            rules="required"
          />
          <FormInput
            id="calle_avenida"
            v-model="catalogo.CALLE_AVENIDA"
            label="Calle y avenida"
            name="calle_avenida"
            rules="required"
          />
          <FormInput
            id="ciudad"
            v-model="catalogo.CIUDAD"
            label="Ciudad"
            name="ciudad"
            rules="required"
          />
          <FormInput
            id="colonia"
            v-model="catalogo.COLONIA"
            label="Colonia"
            name="colonia"
            rules="required"
          />
          <FormInput
            id="codigo_postal"
            v-model="catalogo.CODIGO_POSTAL"
            label="Codigo postal"
            name="codigo_postal"
            rules="required"
          />
          <FormInput
            id="departamento"
            v-model="catalogo.DEPARTAMENTO"
            label="Departamento"
            name="departamento"
            rules="required"
          />
          <FormInput
            id="municipio"
            v-model="catalogo.MUNICIPIO"
            label="Municipio"
            name="municipio"
            rules="required"
          />
          <FormInput
            id="estado"
            v-model="catalogo.ESTADO"
            label="Estado"
            name="estado"
            rules="required"
          />
          <vCol class="d-flex justify-center">
            <vBtn type="submit" color="primary">Guardar</vBtn>
            <vBtn to="/catalogo" type="button">Cancelar</vBtn>
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

import { CatalogoTypes } from '@/api/types'
import { CatalogoApi } from '@/api'

@Component({
  layout: 'authenticated',
  components: {
    ValidationObserver,
  },
})
export default class CategoryForm extends Vue {
  loading: boolean = true
  catalogo: CatalogoTypes = {
    NUM_CASA: '',
    CALLE_AVENIDA: '',
    CIUDAD: '',
    COLONIA: '',
    CODIGO_POSTAL: '',
    DEPARTAMENTO: '',
    MUNICIPIO: '',
    ESTADO: ''
  }

  get Id(): string {
    return this.$route.params.id
  }

  async asyncData({ params }: Context) {
    const loading = false
    if (params.id) {
      const item = await CatalogoApi.getCatalogo(params.id)
      const catalogo = item as CatalogoTypes
      return { loading, catalogo }
    }
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
      await CatalogoApi.updateCatalogo(this.catalogo, id)
    } else {
      await CatalogoApi.createCatalogo(this.catalogo)
    }
    this.$router.replace('/catalogo')
  }
}
</script>
