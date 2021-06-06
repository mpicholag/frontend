import { AxiosInstance } from 'axios';

export default class ApiClient {
  private static instance: ApiClient;
  private axios: AxiosInstance;

  private constructor (axios: AxiosInstance) {
    this.axios = axios;
  }

  static getInstance (): AxiosInstance {
    if (!ApiClient.instance) {
      throw new Error('Axios Instance has not been set');
    }
    return ApiClient.instance.axios;
  }

  static setInstance (axios: AxiosInstance): void {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(axios);
    }
  }
}
