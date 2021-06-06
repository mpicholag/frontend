<script lang="ts">
import { Context } from '@nuxt/types'
import Form from '@/pages/registry/-form.vue';

export default class NewRegistryPage extends Form {
  async validate ({ params } : Context) {
    return !params.id
  }
}
</script>