<script lang="ts">
import { Context } from '@nuxt/types'
import Form from '@/pages/catalogo/-form.vue';

export default class NewCatalogoPage extends Form {
  async validate ({ params } : Context) {
    return !params.id
  }
}
</script>