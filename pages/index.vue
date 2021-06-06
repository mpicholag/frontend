<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <VueApexCharts width="500" type="bar" :options="options" :series="series" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'authenticated'
})
export default class IndexPage extends Vue {
  options = {
    chart: {
      id: 'vuechart-example'
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
  }
  series = [{
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  }]
}
</script>
