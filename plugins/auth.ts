import { Context } from '@nuxt/types';

export default function ({ $auth, redirect }: Context): void {
  $auth.onRedirect(() => {
    if ($auth.loggedIn) {
      redirect('/');
    }
  });
}
