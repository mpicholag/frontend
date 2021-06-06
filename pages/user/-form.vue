<template>
  <vFlex>
    <vCol>
      <h1 v-if="!Id" class="text-h3">Crear usuario</h1>
    </vCol>
    <vCol sm="12" md="12" lg="8" xl="8" order-lg="2" offset-xl="2">
      <ValidationObserver
        v-slot="{ handleSubmit }"
        ref="validationProvider"
        slim
      >
        <form class="login-form" @submit.prevent="handleSubmit(onSubmit)">
          <FormInput
            id="first_name"
            v-model="user.first_name"
            label="Nombres"
            name="Nombres"
            rules="required"
          />
          <FormInput
            id="last_name"
            v-model="user.last_name"
            label="Apellidos"
            name="Apellidos"
            rules="required"
          />
          <FormInput
            id="email"
            v-model="user.email"
            label="Email"
            name="Email"
            rules="required|email"
          />
          <FormInput
            id="password"
            v-model="user.password"
            label="Contraseña"
            name="password"
            rules="required"
            type="password"
          />
          <FormInput
            id="confirm"
            v-model="user.password_confirmation"
            label="Confirmación de contraseña"
            name="confirmation"
            rules="confirmed:password"
            type="password"
          />
          <vCol class="d-flex justify-center">
            <vBtn type="submit" color="primary">Guardar</vBtn>
            <vBtn to="/user" type="button">Cancelar</vBtn>
          </vCol>
        </form>
      </ValidationObserver>
    </vCol>
  </vFlex>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { ValidationObserver } from 'vee-validate'

import { UserType } from '@/api/types'
import { UserApi } from '@/api'

@Component({
  layout: 'authenticated',
  components: {
    ValidationObserver,
  },
})
export default class UserForm extends Vue {
  loading: boolean = true
  user: UserType = {
    first_name: '',
    last_name: '',
    status: true,
    email: '',
    password: '',
    password_confirmation: ''
  }

  get Id(): string {
    return this.$route.params.id
  }

  async onSubmit(): Promise<void> {
    const isValid = await (
      this.$refs.validationProvider as InstanceType<typeof ValidationObserver>
    ).validate()
    if (!isValid) {
      return
    }
    await UserApi.createUser(this.user)
    this.$router.replace('/user')
  }
}
</script>
