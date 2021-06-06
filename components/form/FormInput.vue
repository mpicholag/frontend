<template>
  <ValidationProvider
    v-slot="{ errors }"
    ref="validationProvider"
    :rules="rules"
    :name="name"
    :vid="confirmationTarget"
    slim
  >
    <vTextField
      :id="id"
      :type="type"
      v-model="bindingValue"
      :error-messages="errors"
      :required="required"
      :label="label"
    />
  </ValidationProvider>
</template>

<script lang="ts">
import { Vue, Component, Prop, mixins } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';

import FormInputBase from '@/components/form/FormInputBase';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class FormInput extends mixins(Vue, FormInputBase) {
  @Prop({
    type: String,
    default: 'text',
    validator: value =>
      ['email', 'text', 'url', 'number', 'password'].includes(value),
  })
  readonly type!: string;

  @Prop({ type: Boolean, default: false }) readonly required!: boolean;

  @Prop({ type: String })
  readonly confirmationTarget!: string;
}
</script>
