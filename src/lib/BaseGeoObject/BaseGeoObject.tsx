import * as React from 'react';
import withMap, { WithMap } from '../Map/withMap';
import { withYmaps } from '../YmapsProvider';
import { WithYmaps } from '../YmapsProvider/withYmaps';
import Ymaps from '../../types/Ymaps';

type Props = {
  /**
   * The function for provide access to the GeoObject instance.
   */
  instanceRef?: (geoObject: ymaps.GeoObject) => any;
};

/**
 * Creates a React component that contains an instance of GeoObject.
 * @param instanceCreator The function to create an GeoObject instance.
 * @param displayName The component displayName.
 */
export default function BaseGeoObject<TProps extends Props>(
  instanceCreator: (
    ymaps: Ymaps,
    props: TProps & WithMap & WithYmaps,
  ) => ymaps.GeoObject,
  displayName = 'GeoObject',
) {
  return withYmaps(
    withMap(
      class extends React.Component<TProps & WithMap & WithYmaps> {
        public static displayName = displayName;

        public instance: ymaps.GeoObject | null = null;

        public componentDidMount() {
          const { ymaps, map, instanceRef } = this.props;

          this.instance = instanceCreator(ymaps, this.props);
          map.geoObjects.add(this.instance!);
          instanceRef && instanceRef(this.instance!);
        }

        public componentWillUnmount() {
          const { map } = this.props;

          this.instance && map.geoObjects.remove(this.instance);
        }

        public render() {
          return null;
        }
      },
    ),
  );
}
