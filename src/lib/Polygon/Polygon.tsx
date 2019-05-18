import { BaseGeoObject } from '../BaseGeoObject';

type Props = {
  /**
   * Polygon geometry.
   */
  geometry: number[][][] | object | ymaps.IPolygonGeometry;
  /**
   * Polygon data.
   */
  properties?: object | ymaps.IDataManager;
  /**
   * Polygon options.
   */
  options?: ymaps.IPolygonOptions;
  /**
   * The function for provide access to the Polygon instance.
   */
  instanceRef?: (polygon: ymaps.Polygon) => any;
};

const Polygon = BaseGeoObject<Props>(
  (ymaps, { geometry, properties, options }) =>
    new ymaps.Polygon(geometry, properties, options),
  'Polygon',
);

export default Polygon;
