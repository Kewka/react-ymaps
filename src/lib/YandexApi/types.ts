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
