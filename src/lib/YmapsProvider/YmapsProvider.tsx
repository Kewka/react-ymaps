import * as React from 'react';
import YandexApi, { YandexApiOptions } from '../YandexApi/YandexApi';
import Ymaps from '../../typings/Ymaps';
import YmapsContext from './YmapsContext';

export interface YmapsProviderProps {
  /**
   * API options.
   */
  options?: YandexApiOptions;
  /**
   * React elements that you want to render while waiting for the API to load.
   */
  fallback?: React.ReactNode;
  /**
   * Children node.
   */
  children?: React.ReactNode;
  /**
   * Callback, which will call after loading the API.
   */
  onLoad?: (ymaps: Ymaps) => any;
  /**
   * Callback that will call when an API fails to load.
   */
  onError?: (error: Event) => any;
}

export interface YmapsProviderState {
  bootstrapped: boolean;
  ymaps: Ymaps | null;
}

export default class YmapsProvider extends React.Component<
  YmapsProviderProps,
  YmapsProviderState
> {
  public static defaultProps: YmapsProviderProps = {
    options: {},
    fallback: null,
  };

  public state: YmapsProviderState = {
    bootstrapped: false,
    ymaps: null,
  };

  public async componentDidMount() {
    const { onLoad, onError, options } = this.props;
    let ymaps = null;

    try {
      ymaps = await YandexApi.load(options);
      onLoad && onLoad(ymaps);
    } catch (error) {
      console.error(error);
      onError && onError(error);
    }

    this.setState({
      bootstrapped: true,
      ymaps,
    });
  }

  public render() {
    const { fallback, children } = this.props;
    const { bootstrapped, ymaps } = this.state;

    if (!bootstrapped) {
      return fallback;
    }

    return ymaps && <YmapsContext.Provider value={ymaps} children={children} />;
  }
}
