<template>
  <vFlex>
    <vCol>
      <h1 v-if="!Id" class="text-h3">Crear subcategoría</h1>
      <h1 v-else class="text-h3">
        Modificar subcategoría: <strong>{{ Id }}</strong>
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
            v-model="subcategory.registry_id"
            label="Archivo"
            :items="providers"
            item-value="id"
            item-text="name"
            @change="loadCategories"
          />
          <vSelect
            v-model="subcategory.category_id"
            label="Categorias"
            :items="categories"
            item-value="id"
            item-text="name"
          />
          <FormInput
            id="name"
            v-model="subcategory.name"
            label="Nombre"
            name="Nombre"
            rules="required"
          />
          <FormInput
            id="description"
            v-model="subcategory.description"
            label="Descripción"
            name="Descripción"
            rules="required"
          />
          <vCol class="d-flex justify-center">
            <vBtn type="submit" color="primary">Guardar</vBtn>
            <vBtn to="/subcategory" type="button">Cancelar</vBtn>
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

import { SubcategoryTypes, Category, RegistryTypes } from '@/api/types'
import { SubcategoryApi, CategoryApi, RegistryApi } from '@/api'

@Component({
  layout: 'authenticated',
  components: {
    ValidationObserver,
  },
})
export default class SubcategoryForm extends Vue {
  loading: boolean = true
  subcategory: SubcategoryTypes = {
    name: '',
    description: '',
    status: true,
  }

  categories: Array<Category> = []
  providers: Array<RegistryTypes> = []

  get Id(): string {
    return this.$route.params.id
  }

  async asyncData({ params }: Context) {
    const providers = await RegistryApi.getAllRegistry()
    const loading = false
    if (params.id) {
      const item = await SubcategoryApi.getSubcategory(params.id)
      const subcategory = item as SubcategoryTypes
      return { loading, subcategory, providers }
    }

    return {
      loading,
      providers,
    }
  }

  async loadCategories(provider: string): Promise<void> {
    const categories = await CategoryApi.getAllCategory(provider)
    this.categories = categories
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
      await SubcategoryApi.updateSubcategory(this.subcategory, id)
    } else {
      await SubcategoryApi.createSubcategory(this.subcategory)
      this.$router.replace('/subcategory')
    }
  }
}
</script>
