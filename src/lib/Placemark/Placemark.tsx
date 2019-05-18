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
  /**
   * The function for provide access to the Placemark instance.
   */
  instanceRef?: (placemark: ymaps.Placemark) => any;
};

const Placemark = BaseGeoObject<Props>(
  (ymaps, { geometry, properties, options }) =>
    new ymaps.Placemark(geometry, properties!, options),
  'Placemark',
);

export default Placemark;
