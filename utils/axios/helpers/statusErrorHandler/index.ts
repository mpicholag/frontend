import internalServerErrorHandler
  from '@/utils/axios/helpers/statusErrorHandler/internalServerErrorHandler';
import unauthorizedErrorHandler
  from '@/utils/axios/helpers/statusErrorHandler/unauthorizedErrorHandler';

const statusErrorHandler: GenericDictionary<Function> = {
  401: unauthorizedErrorHandler,
  500: internalServerErrorHandler,
};

export default statusErrorHandler;
