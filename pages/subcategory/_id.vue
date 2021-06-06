<script lang="ts">
import { Context } from '@nuxt/types'
import Form from '@/pages/subcategory/-form.vue';

export default class IdSubcategoryPage extends Form {
  validate ({ params } : Context) {
    return /^\d+$/.test(params.id)
  }
}
</script>