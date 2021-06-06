import { flatNotificationStore } from '@/store';
import notificationMessages from '@/utils/dictionaries/notificationMessages';

import { ErrorApiResponse } from '@/api/types';

import { NotificationEnum } from '@/types/notifications'

function displayErrorNotification (
  { code, message }: ErrorApiResponse
): void {
  const errorMessage = code
    ? notificationMessages[String(code)]
    : message;

    flatNotificationStore.createNotification({
      message: errorMessage,
      type: NotificationEnum.DANGER
    })
}

export default displayErrorNotification;
