<template>
  <vFlex class="d-flex">
    <vCol class="d-none d-sm-flex d-xs-flex justify-center align-self-center">
      <!-- <h1 class="text-no-wrap secondary">Lorem Ipsum is simply dummy text of the printing</h1> -->
    </vCol>
    <vCol class="d-flex d-xl-5 d-sm-12 justify-center align-self-center">
      <vCard max-width="400" width="80%" elevation="2">
        <vCardTitle class="d-flex justify-center">
          <h1>Proyecto final</h1>
        </vCardTitle>
        <vCardText class="has-text-centered">
          <ValidationObserver
            v-slot="{ handleSubmit }"
            ref="validationProvider"
            slim
          >
            <form class="login-form" @submit.prevent="handleSubmit(onSubmit)">
              <FormInput
                id="username"
                v-model="loginParams.email"
                label="Usuario"
                name="Usuario"
                rules="required|email"
              />
              <FormInputPassword
                id="password"
                v-model="loginParams.password"
                label="Contraseña"
                name="Contraseña"
                rules="required"
              />
              <vBtn
                :loading="isLoading"
                :disabled="isLoading"
                type="submit"
                color="primary"
              >
                Entrar
              </vBtn>
            </form>
          </ValidationObserver>
        </vCardText>
      </vCard>
    </vCol>
  </vFlex>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'

import { LoginParams } from '@/api/types'
import { flatNotificationStore } from '@/store'
import { NotificationEnum } from '@/types/notifications'
import notificationMessages from '@/utils/dictionaries/notificationMessages'

@Component({
  layout: 'unauthenticated',
  components: {
    ValidationObserver,
  },
})
export default class LoginPage extends Vue {
  isLoading: boolean = false
  loginParams: LoginParams = {
    email: '',
    password: '',
  }

  get notification() {
    return flatNotificationStore.allNotifications
  }

  async onSubmit(): Promise<void> {
    try {
      const isValid = await (this.$refs.validationProvider as InstanceType<
        typeof ValidationObserver
      >).validate();
      if (!isValid) {
        return;
      }
      this.isLoading = true;
      const data = { data: this.loginParams };
      const response = await this.$auth.loginWith('local', { data });
      if (response) {
        this.$router.replace('/');
      }
    } catch ({ response }) {
      this.isLoading = false;
      const { data } = response;
      flatNotificationStore.createNotification({
        type: NotificationEnum.DANGER,
        message: notificationMessages[data.code],
      });
    }
  }
}
</script>
