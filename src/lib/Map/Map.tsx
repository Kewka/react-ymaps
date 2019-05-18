import * as React from 'react';
import withYmaps, { WithYmaps } from '../YmapsProvider/withYmaps';
import MapContext from './MapContext';

type OwnProps = {
  /**
   * Map style.
   */
  style?: React.CSSProperties;
  /**
   * Map className.
   */
  className?: string;
  /**
   * Map parameters.
   */
  defaultState?: ymaps.IMapState;
  /**
   * Map options.
   */
  defaultOptions?: ymaps.IMapOptions;
  /**
   * The function for provide access to the Map instance.
   */
  instanceRef?: (map: ymaps.Map) => any;
};

type Props = OwnProps & WithYmaps;

type State = {
  map: ymaps.Map | null;
};

class Map extends React.Component<Props, State> {
  public static defaultProps: OwnProps = {
    defaultState: {
      // Moscow
      center: [55.76, 37.64],
      zoom: 10,
    },
    defaultOptions: {},
  };

  public state: State = {
    map: null,
  };

  public mapContainer = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    const { ymaps, defaultState, defaultOptions, instanceRef } = this.props;
    const map = new ymaps.Map(
      this.mapContainer.current as HTMLElement,
      defaultState as ymaps.IMapState,
      defaultOptions,
    );
    this.setState({ map });
    instanceRef && instanceRef(map);
  }

  public componentWillUnmount() {
    const { map } = this.state;
    map && map.destroy();
  }

  public render() {
    const { className, style, children } = this.props;
    const { map } = this.state;
    return (
      <div className={className} style={style} ref={this.mapContainer}>
        {map && (
          <MapContext.Provider value={map}>{children}</MapContext.Provider>
        )}
      </div>
    );
  }
}

export default withYmaps(Map);
