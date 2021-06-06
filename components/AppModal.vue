<template>
  <vDialog v-if="opened" v-model="isVisible" persistent>
    <vCard>
      <vCardTitle> {{ title }} </vCardTitle>
      <vCardText>
        <slot name="body" />
      </vCardText>
      <vCardActions>
        <slot name="actions" />
      </vCardActions>
    </vCard>
  </vDialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'


@Component
export default class AppModal extends Vue {
  isVisible: boolean = true

  @Prop({ type: String, default: '' }) title!: string;
  @Prop({ type: Boolean, required: true }) opened: boolean = false;

  @Emit('close')
  toggleModal ():void {}
}
</script>

<style lang="scss">
.v-dialog {
  width: 50%;

  @media only screen and (max-width: 670px) {
    width: 100%;
  }
}
</style>