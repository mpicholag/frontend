import { Notification } from '@/types/notifications';

function clearNotificationsTimeOut (
  notifications: Array<Notification>
): void {
  notifications.forEach(({ timeoutId }) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });
}

export default clearNotificationsTimeOut;
