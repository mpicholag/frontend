<script lang="ts">
import { Context } from '@nuxt/types'
import Form from '@/pages/catalogo/-form.vue';

export default class IdCatalogoPage extends Form {
  validate ({ params } : Context) {
    return /^\d+$/.test(params.id)
  }
}
</script>