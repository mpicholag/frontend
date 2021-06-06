<script lang="ts">
import { Context } from '@nuxt/types'
import Form from '@/pages/archivador/-form.vue';

export default class NewArchivadorPage extends Form {
  async validate ({ params } : Context) {
    return !params.id
  }
}
</script>