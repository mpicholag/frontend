import { Vue, Prop, Model, Component, Emit } from 'nuxt-property-decorator';

@Component
export default class FormInputBase extends Vue {
  @Model('input') readonly value!: string | number;

  @Prop({ type: [String, Object] }) readonly rules!: string | object;
  @Prop({ type: String }) readonly placeholder!: string;
  @Prop({ type: String }) readonly label!: string;
  @Prop({ type: String }) readonly name!: string;
  @Prop({ type: String }) readonly id!: string;
  @Prop({ type: Boolean, default: false }) readonly hasCounter!: boolean;

  @Prop({
    type: String,
    validator: value =>
      ['is-small', 'is-medium', 'is-large'].includes(value),
  })
  readonly size!: string;

  @Prop({
    type: [String, Number],
    default: 100,
  })
  readonly maxlength!: string | number;

  get bindingValue (): string | number {
    return this.value;
  }

  set bindingValue (value: string | number) {
    this.onInput(value);
  }

  getFieldType (errors: string[]): string {
    return errors.length ? 'is-danger' : '';
  }

  @Emit('input')
  onInput (value: string | number): string | number {
    return value;
  }
}
