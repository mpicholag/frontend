<script lang="ts">
import { Context } from '@nuxt/types'
import Form from '@/pages/registry/-form.vue';

export default class IdRegistryPage extends Form {
  validate ({ params } : Context) {
    return /^\d+$/.test(params.id)
  }
}
</script>