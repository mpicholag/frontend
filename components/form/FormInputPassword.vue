<template>
	<ValidationProvider
		v-slot="{ errors }"
		ref="validationProvider"
		rules="required"
		:name="name"
		:vid="confirmationTarget"
		slim
	>
		<v-text-field
			:id="id"
      :label="label"
			v-model="bindingValue"
      :error-messages="errors"
			type="password"
			:placeholder="placeholder"
			:name="name"
			:counter="hasCounter"
		/>
	</ValidationProvider>
</template>

<script lang="ts">
import { Vue, Component, Prop, mixins } from "nuxt-property-decorator";
import { ValidationProvider } from "vee-validate";

import FormInputBase from "@/components/form/FormInputBase";

@Component({
	components: {
		ValidationProvider,
	},
})
export default class FormInputPassword extends mixins(Vue, FormInputBase) {
	@Prop({ type: Boolean })
	readonly passwordReveal!: boolean;

	@Prop({ type: Boolean, default: false })
	readonly hasStrengthBar!: boolean;

	@Prop({ type: String })
	readonly confirmationTarget!: string;

	isPasswordWeak: boolean = false;
}
</script>
