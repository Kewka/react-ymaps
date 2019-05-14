import getQueryString from '../../utils/getQueryString';
import fetchScript from '../../utils/fetchScript';
import Ymaps from '../../types/Ymaps';
import { YandexApiOptions } from './types';

/**
 * The static class for loading ymaps (Yandex.Maps) instance.
 */
export default class YandexApi {
  /**
   * Loads the ymaps instance.
   * @param options The api options.
   */
  public static load({ force, ...options }: YandexApiOptions = {}): Promise<
    Ymaps
  > {
    if (!force && this.loadingPromise) {
      return this.loadingPromise;
    }

    const newPromise = new Promise<Ymaps>((resolve, reject) => {
      const loadOptions = {
        ...this.DEFAULT_API_OPTIONS,
        ...(options || {}),
      };

      const { version, ...queryParams } = loadOptions;
      const query = getQueryString(queryParams);
      const url = `${this.API_URL}/${version}?${query}`;

      const ON_LOAD_CALLBACK = String(loadOptions.onload);
      const ON_ERROR_CALLBACK = String(loadOptions.onerror);

      window[ON_LOAD_CALLBACK] = (ymapsInstance: Ymaps) => {
        resolve(ymapsInstance);
        window[ON_LOAD_CALLBACK] = undefined;
      };

      window[ON_ERROR_CALLBACK] = (error: any) => {
        reject(error);
        window[ON_ERROR_CALLBACK] = undefined;
      };

      fetchScript(url).catch(reject);
    });

    if (!force) {
      this.loadingPromise = newPromise;
    }

    return newPromise;
  }

  /**
   * The api url.
   */
  private static readonly API_URL = 'https://api-maps.yandex.ru';

  /**
   * The api default options.
   */
  private static readonly DEFAULT_API_OPTIONS: YandexApiOptions = {
    version: '2.1',
    lang: 'ru_RU',
    coordorder: 'latlong',
    load: 'package.full',
    mode: 'release',
    onload: '_$_ymaps_load',
    onerror: '_$_ymaps_error',
  };

  /**
   * The promise of loading ymaps instance.
   */
  private static loadingPromise: Promise<Ymaps>;

  /**
   * Singleton constructor.
   */
  private constructor() {}
}
