<script lang="ts">
import { Context } from '@nuxt/types'
import Form from '@/pages/user/-form.vue';

export default class NewUserPage extends Form {
  async validate ({ params } : Context) {
    return !params.id
  }
}
</script>