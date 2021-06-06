<script lang="ts">
import { Context } from '@nuxt/types'
import Form from '@/pages/archivador/-form.vue';

export default class IdArchivadorPage extends Form {
  validate ({ params } : Context) {
    return /^\d+$/.test(params.id)
  }
}
</script>