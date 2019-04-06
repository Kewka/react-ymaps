import getQueryString from '../../utils/getQueryString';
import fetchScript from '../../utils/fetchScript';
import Ymaps from '../../typings/Ymaps';

export type YandexApiLanguage =
  | 'ru_RU'
  | 'en_US'
  | 'en_RU'
  | 'ru_UA'
  | 'uk_UA'
  | 'tr_TR';

export type YandexApiCoordorder = 'latlong' | 'longlat';
export type YandexApiMode = 'debug' | 'release';
export type YandexApiOptions = {
  /**
   * Version.
   * Default value: '2.1'.
   */
  version?: string | number;
  /**
   * API key.
   */
  apikey?: string;
  /**
   * Language.
   * Default value: 'ru_RU'.
   */
  lang?: YandexApiLanguage;
  /**
   * Coordinate order.
   * Default value: 'latlong'.
   */
  coordorder?: YandexApiCoordorder;
  /**
   * List of loadable modules.
   * Default value: 'package.full'.
   */
  load?: string[] | string;
  /**
   * API mode.
   * Default value: 'release'.
   */
  mode?: YandexApiMode;
  /**
   * Content Security Policy.
   * Default value: false.
   */
  csp?: boolean;
  /**
   * Onload callback.
   * Default value: '_$_ymaps_load'.
   */
  onload?: string;
  /**
   * Onerror callback.
   * Default value: '_$_ymaps_error'.
   */
  onerror?: string;
  /**
   * Always fetch new ymaps script.
   * Default value: false.
   */
  force?: boolean;
};

/**
 * The static class for loading ymaps (Yandex.Maps) instance.
 */
export default class YandexApi {
  /**
   * Loads the ymaps instance.
   * @param {YandexApiOptions} options The api options.
   */
  public static load(options: YandexApiOptions = {}): Promise<Ymaps> {
    if (!options.force && this.loadingPromise) {
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

    if (!options.force) {
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
