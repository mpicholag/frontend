export type Notification = MessageNotification | ComponentNotification;

export type NotificationType = NotificationEnum;
export enum NotificationEnum {
  INFO = 'blu lighten-2',
  DANGER = 'red darken-3',
  SUCCESS = 'green accent-3',
  WARNING = 'yellow darken-3'
}
export interface BaseNotification {
  type: NotificationType;
  message: string;
  autoClose?: boolean;
  timeoutId?: number;
}

export interface ComponentNotification extends BaseNotification {
  component: Vue.Component;
}

export interface MessageNotification extends BaseNotification {
  message: string;
}
