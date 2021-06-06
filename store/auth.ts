import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

import { UserType } from '@/api/types'
interface payload {
  key: string
  value: any
}

@Module({
  namespaced: true,
  name: 'auth',
})
export default class AuthStore extends VuexModule {
  infoUser: NullablePrimitive<UserType> = null
  loggedIn: boolean = false

  get user(): NullablePrimitive<UserType> {
    return this.infoUser
  }

  @Mutation
  SET(payload: payload) {
    if (payload.key === 'user') {
      this.infoUser = payload.value
    } else if (payload.key === 'loggedIn') {
      this.loggedIn = payload.value
    }
  }
}
