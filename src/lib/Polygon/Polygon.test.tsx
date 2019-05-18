import * as React from 'react';
import { mount } from 'enzyme';
import { YmapsProvider } from '../YmapsProvider';
import { Map } from '../Map';
import Polygon from './Polygon';

describe('Polygon', () => {
  it('to be truthy', () => {
    expect(Polygon).toBeTruthy();
  });

  it('render', (done) => {
    expect.assertions(2);

    const POLYGON_POINT = [55, 55];
    const props: React.ComponentProps<typeof Polygon> = {
      geometry: [[POLYGON_POINT]],
      instanceRef: (polygon) => {
        expect(polygon).toBeTruthy();
        expect(
          (polygon.geometry as ymaps.IPolygonGeometry).contains(POLYGON_POINT),
        ).toBeTruthy();
        done();
      },
    };

    mount(
      <YmapsProvider>
        <Map>
          <Polygon {...props} />
        </Map>
      </YmapsProvider>,
    );
  });
});
