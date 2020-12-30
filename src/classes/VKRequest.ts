import { axiosClient } from 'system/axiosClient';
import { Notification } from 'rsuite';
import { auth } from 'system/auth';
import { makeAutoObservable } from 'mobx';

type MethodType = 'get' | 'post';

const API_VERSION = '5.126';

export class VKRequest<T = any> {
  private readonly path: string;
  private readonly method: MethodType;
  private readonly defaultOptions: object;

  public loading: boolean = false;

  public error: Error | null = null;

  public data: T | null = null;

  public fetchCalled: boolean = false;

  constructor(path: string, method: MethodType, defaultOptions: object = {}) {
    this.path = path;
    this.method = method;
    this.defaultOptions = defaultOptions;
    makeAutoObservable(this);
  }

  public async fetch(options?: object) {
    const axiosRequest =
      this.method === 'get' ? axiosClient.get : axiosClient.post;

    const params = new URLSearchParams();

    params.set('v', API_VERSION);

    const token = localStorage.getItem('token');
    if (!token) {
      auth();
      return;
    }
    params.set('access_token', token);

    const fullOptions = { ...this.defaultOptions, ...options };

    if (fullOptions) {
      Object.entries(fullOptions).forEach(([key, value]) => {
        params.set(key, value as string);
      });
    }
    try {
      this.setFetchCalled();
      this.setError(null);
      this.setLoading(true);
      const { data } = await axiosRequest(`${this.path}?${params.toString()}`);
      if (data && data.error) {
        if (data.error.error_code === 5) {
          auth();
        }
        throw new Error(data.error.error_msg);
      }
      this.setData(data.response);
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }

  private setFetchCalled() {
    this.fetchCalled = true;
  }

  private setLoading(state: boolean) {
    this.loading = state;
  }

  private setError(error: Error | null) {
    this.error = error;
    if (error) {
      Notification.error({
        title: `Произошлка ошибка (${this.path})`,
        description: error.message,
      });
    }
  }

  private setData(data: T) {
    this.data = data;
  }
}
