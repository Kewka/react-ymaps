import * as React from 'react';
import withYmaps, { WithYmaps } from '../YmapsProvider/withYmaps';
import YandexMapContext from './YandexMapContext';

export interface YandexMapProps {
  /**
   * Map container styles.
   */
  containerStyle?: React.CSSProperties;
  /**
   * Map parameters.
   */
  defaultState?: ymaps.IMapState;
  /**
   * Map options.
   */
  defaultOptions?: ymaps.IMapOptions;
  /**
   * Callback, which will be called after creating the map.
   */
  onMapAvailable?: (mapInstance: ymaps.Map) => any;
}

export interface YandexMapState {
  mapInstance: ymaps.Map | null;
}

class YandexMap extends React.Component<
  YandexMapProps & WithYmaps,
  YandexMapState
> {
  public static defaultProps: YandexMapProps = {
    containerStyle: {
      width: 600,
      height: 400,
    },
    defaultState: {
      // Moscow
      center: [55.76, 37.64],
      zoom: 10,
    },
    defaultOptions: {},
  };

  public state: YandexMapState = {
    mapInstance: null,
  };

  public mapContainer = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    const { ymaps, defaultState, defaultOptions, onMapAvailable } = this.props;
    const mapInstance = new ymaps.Map(
      this.mapContainer.current as HTMLElement,
      defaultState as ymaps.IMapState,
      defaultOptions,
    );
    onMapAvailable && onMapAvailable(mapInstance);

    this.setState({ mapInstance });
  }

  public render() {
    const { containerStyle, children } = this.props;
    const { mapInstance } = this.state;
    return (
      <div style={containerStyle} ref={this.mapContainer}>
        {mapInstance && (
          <YandexMapContext.Provider value={mapInstance} children={children} />
        )}
      </div>
    );
  }
}

export default withYmaps(YandexMap);
