import { AxiosError } from 'axios';
import displayErrorNotification from '@/utils/axios/helpers/displayErrorNotification';

function internalServerErrorHandler (
  { error }: { error: AxiosError }
): void {
  const { message } = error;
  displayErrorNotification({ message });
}

export default internalServerErrorHandler;
