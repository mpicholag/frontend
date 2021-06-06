<script lang="ts">
import { Context } from '@nuxt/types'
import Form from '@/pages/subcategory/-form.vue';

export default class NewSubcategoryPage extends Form {
  async validate ({ params } : Context) {
    return !params.id
  }
}
</script>