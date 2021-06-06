import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { isEqual, differenceWith, findIndex } from '@/utils/lodash';

import clearNotificationsTimeOut
  from '@/utils/notifications/clearNotificationsTimeOut';

import { Notification } from '@/types/notifications';

@Module({
  namespaced: true,
  name: 'flatNotification',
})
export default class FlashStore extends VuexModule {
  notifications: Array<Notification> = [];
  isVisible: boolean = false;

  get allNotifications (): Array<Notification> {
    return this.notifications;
  }

  get visible() {
    return this.isVisible;
  }

  @Mutation
  addNotification (notification: Notification): void {
    this.notifications.push(notification);
  }

  @Mutation
  dismissNotification (notification: Notification): void {
    if (notification.timeoutId) {
      clearTimeout(notification.timeoutId);
    };

    this.notifications = differenceWith(
      this.notifications, [notification], isEqual
    );
  }

  @Mutation
  clearAllNotifications (): void {
    clearNotificationsTimeOut(this.notifications);
    this.notifications = [];
  }

  @Mutation
  deleteNotification(index: number) {
    this.notifications.splice(index, 1);
  }

  @Action({ rawError: true })
  removeNotification(index: number) {
    this.deleteNotification(index);
  }

  @Action({ rawError: true })
  createNotification (notification: Notification): Array<Notification> | undefined {
    const notificationExists =
      findIndex(this.notifications, notification) !== -1;

    if (!notificationExists) {
      if (notification.autoClose) {
        notification.timeoutId =
          setTimeout(this.dismissNotification, 10000, notification);
      }
      this.addNotification(notification);
      return [notification];
    };
  }
}
