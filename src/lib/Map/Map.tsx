import * as React from 'react';
import withYmaps, { WithYmaps } from '../YmapsProvider/withYmaps';
import MapContext from './MapContext';
import eventsMap from './eventsMap';
import YmapsEventHandler from '../../types/YmapsEventHandler';
import * as eventsUtils from '../../utils/events';

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
   * The callback ref with Map instance.
   */
  instanceRef?: (map: ymaps.Map | null) => any;
} & { [eventProp in keyof typeof eventsMap]?: YmapsEventHandler };

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
    const eventProps = eventsUtils.getEventProps(this.props, eventsMap);
    eventsUtils.replaceEvents(
      map,
      {},
      eventsUtils.serializeEventProps(eventProps, eventsMap),
    );
    instanceRef && instanceRef(map);
    this.setState({ map });
  }

  public componentDidUpdate(prevProps: Props) {
    const { map } = this.state;

    if (map) {
      const oldEventProps = eventsUtils.getEventProps(prevProps, eventsMap);
      const newEventProps = eventsUtils.getEventProps(this.props, eventsMap);
      eventsUtils.replaceEvents(
        map,
        eventsUtils.serializeEventProps(oldEventProps, eventsMap),
        eventsUtils.serializeEventProps(newEventProps, eventsMap),
      );
    }
  }

  public componentWillUnmount() {
    const { instanceRef } = this.props;
    const { map } = this.state;
    map && map.destroy();
    instanceRef && instanceRef(null);
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
