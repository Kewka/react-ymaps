import * as React from 'react';
import withMap, { WithMap } from '../Map/withMap';
import { withYmaps } from '../YmapsProvider';
import { WithYmaps } from '../YmapsProvider/withYmaps';

export interface PlacemarkProps {
  /**
   * Coordinates of the placemark.
   */
  geometry: number[];
  /**
   * Placemark data.
   */
  properties?: object | ymaps.IDataManager;
  /**
   * Placemark options.
   */
  options?: ymaps.IPlacemarkOptions;
  /**
   * Callback, which will be called after creating the placemark.
   */
  instanceRef?: (placemark: ymaps.Placemark) => any;
}

class Placemark extends React.Component<
  PlacemarkProps & WithMap & WithYmaps,
  any
> {
  public instance: ymaps.Placemark | null = null;

  public componentDidMount() {
    const {
      geometry,
      properties,
      options,
      instanceRef,
      ymaps,
      map,
    } = this.props;

    this.instance = new ymaps.Placemark(
      geometry,
      properties as object | ymaps.IDataManager,
      options,
    );
    map.geoObjects.add(this.instance);
    instanceRef && instanceRef(this.instance);
  }

  public render() {
    return null;
  }
}

export default withYmaps(withMap(Placemark));
