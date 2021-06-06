import { Context } from '@nuxt/types';

export default function (context: Context) {
  if (!!context.$auth.loggedIn) {
    context.redirect('/')
  }
}
