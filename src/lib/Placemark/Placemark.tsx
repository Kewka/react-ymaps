import { BaseGeoObject } from '../BaseGeoObject';

type Props = {
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
};

const Placemark = BaseGeoObject<Props, ymaps.Placemark>(
  (ymaps, { geometry, properties, options }) =>
    new ymaps.Placemark(geometry, properties!, options),
  'Placemark',
);

export default Placemark;
