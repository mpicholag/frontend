<template>
  <vMenu
    ref="formDate"
    v-model="modalForm"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <vTextField
        v-model="bindingValue"
        :label="label"
        :hint="format"
        persistent-hint
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        @blur="date = parseDate(bindingValue)"
        v-on="on"
      />
    </template>
    <vDatePicker locale="es" v-model="date" scrollable @input="modalForm = false" />
  </vMenu>
</template>

<script lang="ts">
import { Vue, Component, mixins, Prop, Watch } from 'nuxt-property-decorator'
import FormInputBase from '@/components/form/FormInputBase'

@Component
export default class FormDate extends mixins(Vue, FormInputBase) {
  modalForm: boolean = false
  date: string = new Date().toISOString().substr(0, 10)

  @Prop({ type: String, default: 'DD-MM-YYYY format' }) format!: string

  @Watch('date')
  changeDate(val: string): void {
    const date: string | number = this.formatDate(val)
    this.bindingValue = date
  }

  parseDate(date: string): string {
    if (!date) return ''

    const [month, day, year] = date.split('/')
    return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
  }

  formatDate(date: string): string | number {
    if (!date) return ''

    const [year, month, day] = date.split('-')
    return `${day}-${month}-${year}`
  }
}
</script>
