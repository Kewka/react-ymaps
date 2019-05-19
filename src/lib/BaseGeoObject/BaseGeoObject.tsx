import * as React from 'react';
import withMap, { WithMap } from '../Map/withMap';
import { withYmaps } from '../YmapsProvider';
import { WithYmaps } from '../YmapsProvider/withYmaps';
import Ymaps from '../../types/Ymaps';
import eventsMap from './eventsMap';
import YmapsEventHandler from '../../types/YmapsEventHandler';
import * as eventsUtils from '../../utils/events';

type BaseProps<TInstance> = {
  /**
   * The callback ref with instance.
   */
  instanceRef?: (instance: TInstance | null) => any;
};

type EventProps = { [eventProp in keyof typeof eventsMap]?: YmapsEventHandler };

/**
 * Creates a React component that contains an instance of GeoObject.
 * @param instanceCreator The function to create an GeoObject instance.
 * @param displayName The component displayName.
 */
export default function BaseGeoObject<
  TProps,
  TInstance extends ymaps.GeoObject
>(
  instanceCreator: (
    ymaps: Ymaps,
    props: BaseProps<TInstance> & EventProps & TProps & WithMap & WithYmaps,
  ) => TInstance,
  displayName = 'GeoObject',
) {
  return withYmaps(
    withMap(
      class extends React.Component<
        BaseProps<TInstance> & EventProps & TProps & WithMap & WithYmaps
      > {
        /**
         * The React component display name.
         */
        public static displayName = displayName;

        /**
         * The GeoObject instance.
         */
        public instance: TInstance | null = null;

        public componentDidMount() {
          const { ymaps, map, instanceRef } = this.props;
          this.instance = instanceCreator(ymaps, this.props);
          const eventProps = eventsUtils.getEventProps(this.props, eventsMap);
          eventsUtils.replaceEvents(
            this.instance!,
            {},
            eventsUtils.serializeEventProps(eventProps, eventsMap),
          );
          map.geoObjects.add(this.instance!);
          instanceRef && instanceRef(this.instance!);
        }

        public componentDidUpdate(prevProps: TProps & WithMap & WithYmaps) {
          if (this.instance) {
            const oldEventProps = eventsUtils.getEventProps(
              prevProps,
              eventsMap,
            );
            const newEventProps = eventsUtils.getEventProps(
              this.props,
              eventsMap,
            );
            eventsUtils.replaceEvents(
              this.instance,
              eventsUtils.serializeEventProps(oldEventProps, eventsMap),
              eventsUtils.serializeEventProps(newEventProps, eventsMap),
            );
          }
        }

        public componentWillUnmount() {
          const { map, instanceRef } = this.props;
          this.instance && map.geoObjects.remove(this.instance);
          instanceRef && instanceRef(null);
        }

        public render() {
          return null;
        }
      },
    ),
  );
}
