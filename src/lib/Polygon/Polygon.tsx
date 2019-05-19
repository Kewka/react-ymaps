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
};

const Polygon = BaseGeoObject<Props, ymaps.Polygon>(
  (ymaps, { geometry, properties, options }) =>
    new ymaps.Polygon(geometry, properties, options),
  'Polygon',
);

export default Polygon;
