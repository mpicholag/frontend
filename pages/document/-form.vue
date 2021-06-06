<template>
  <vFlex>
    <vCol>
      <h1 v-if="!Id" class="text-h3">Crear documento</h1>
      <h1 v-else class="text-h3">
        Modificar documento: <strong>{{ Id }}</strong>
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
            id="title"
            v-model="document.title"
            label="Titulo"
            name="Titulo"
            rules="required"
          />
          <FormInput
            id="description"
            v-model="document.description"
            label="Descripción"
            name="Descripción"
            rules="required"
          />
          <vSelect
            v-model="document.registry_id"
            label="Archivo"
            :items="providers"
            item-value="id"
            item-text="name"
            @change="loadCategories"
          />
          <vSelect
            v-model="document.category_id"
            label="Categorías"
            :items="categories"
            item-value="id"
            item-text="name"
            @change="loadSubcategories"
          />
          <vSelect
            v-model="document.subcategory_id"
            label="Subcategoría"
            :items="subcategories"
            item-value="id"
            item-text="name"
          />
          <vFileInput
            placeholder="Sube tu documento"
            label="Documento"
            prepend-icon="mdi-paperclip"
            @change="handlerFile"
          >
            <template #selection="{ text }">
              <vChip small label color="primary">
                {{ text }}
              </vChip>
            </template>
          </vFileInput>
          <a
            v-if="Id"
            :href="`${ApiUrl}/download?file=${document.path_document}`"
            target="_blank"
            >{{ document.path_document }}</a
          >
          <FormDate
            v-model="document.firm_date"
            label="Fecha de firma"
            format="DD-MM-YYYY"
          />
          <FormDate
            v-model="document.renovation_date"
            label="Fecha de renovación"
            format="DD-MM-YYYY"
          />
          <FormDate
            v-model="document.expiration_date"
            label="Fecha de expiración"
            format="DD-MM-YYYY"
          />
          <vSwitch
            v-model="document.notify"
            label="Notificar"
            color="success"
          />
          <vCol class="d-flex justify-center">
            <vBtn type="submit" color="primary">Guardar</vBtn>
            <vBtn to="/document" type="button">Cancelar</vBtn>
          </vCol>
        </form>
      </ValidationObserver>
      <hr v-if="Id" />
      <DocumentHistory v-if="Id" />
    </vCol>
  </vFlex>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import { ValidationObserver } from 'vee-validate'

import { CategoryApi, DocumentApi, RegistryApi, SubcategoryApi } from '@/api'
import { authStore } from '@/store'
import {
  DocumentTypes,
  RegistryTypes,
  Category,
  SubcategoryTypes,
} from '@/api/types'

@Component({
  layout: 'authenticated',
  components: {
    ValidationObserver,
  },
})
export default class DocumentForm extends Vue {
  categories: Array<Category> = []
  providers: Array<RegistryTypes> = []
  subcategories: Array<SubcategoryTypes> = []
  document: DocumentTypes = {
    title: '',
    description: '',
    category_id: null,
    subcategory_id: null,
    registry_id: null,
    firm_date: '',
    renovation_date: '',
    expiration_date: '',
    path_document: '',
    extension: '',
    file: '',
    notify: false,
  }

  get Id(): string {
    return this.$route.params.id
  }

  get ApiUrl(): string {
    return process.env.API_URL as string
  }

  handlerFile(e: Blob & FileReader & File) {
    if (!e) {
      return
    }
    const file: Blob & FileReader = e
    const reader = new FileReader()
    const type = e.name.split('.')
    reader.onload = (e) => {
      const { target } = e
      const file = target?.result as ArrayBuffer & string
      this.document.extension = type[type.length - 1]
      this.document.file = file.split(',')[1]
    }
    reader.readAsDataURL(file)
  }

  async asyncData({ params }: Context) {
    const providers = await RegistryApi.getAllRegistry()
    const loading = false
    if (params.id) {
      let response = {}
      const document: DocumentTypes = await DocumentApi.getDocument(params.id)
      response = { ...response, document, loading, providers }
      if (document.registry_id) {
        const categories = await CategoryApi.getAllCategory(
          document.registry_id
        )
        response = { ...response, categories }
      }

      if (document.category_id) {
        const subcategories = await SubcategoryApi.getAllSubcategory(
          document.category_id
        )
        response = { ...response, subcategories }
      }
      document.file = ''
      return response
    }

    return {
      providers,
    }
  }

  async downloadDocument(): Promise<void> {
    const name = this.document.path_document as string
    await DocumentApi.downloadDocument({ name })
  }

  async loadCategories(provider: string): Promise<void> {
    const categories = await CategoryApi.getAllCategory(provider)
    this.categories = categories
  }

  async loadSubcategories(category: string): Promise<void> {
    const subcategories = await SubcategoryApi.getAllSubcategory(category)
    this.subcategories = subcategories
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
      await DocumentApi.updateDocument(this.document, id)
    } else {
      this.document.user_id = authStore.user?.id as string
      await DocumentApi.createDocument(this.document)
      this.$router.replace('/document')
    }
  }
}
</script>
