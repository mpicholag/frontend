<template>
  <vMenu offset-y>
    <template #activator="{ on, attrs }">
      <vBtn icon>
        <vIcon v-bind="attrs" v-on="on">mdi-bell-ring</vIcon>
      </vBtn>
    </template>
    <vList two-line>
      <vListItemGroup active-class="blue--text" multiple>
        <template v-for="item of items">
          <vListItem :key="item.id">
            <template>
              <vListItemContent>
                <vListItemTitle>{{ item.title }} <vChip>{{ formatDate(item.expiration_date) }}</vChip></vListItemTitle>
                <vListItemSubtitle>{{ item.description }}</vListItemSubtitle>
              </vListItemContent>
              </template>
          </vListItem>
        </template>
      </vListItemGroup>
    </vList>
  </vMenu>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import moment from 'moment'

import { DocumentApi } from '@/api'
import { DocumentTypes } from '@/api/types'

@Component
export default class AppNotify extends Vue {
  items: Array<DocumentTypes> = []

  async created (): Promise<void> {
    const items = await DocumentApi.getAllDocument({ notify: true })
    this.items = items
  }

  formatDate(date: string): string {
    moment.locale('es')
    return moment(date, 'YYYY-MM-DD').format('DD-MMM-YYYY')
  }
}
</script>
