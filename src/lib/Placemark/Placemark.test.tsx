import * as React from 'react';
import { mount } from 'enzyme';
import Placemark from './Placemark';
import { YmapsProvider } from '../YmapsProvider';
import { Map } from '../Map';

describe('Placemark', () => {
  it('to be truthy', () => {
    expect(Placemark).toBeTruthy();
  });

  it('render', (done) => {
    expect.assertions(2);

    const props: React.ComponentProps<typeof Placemark> = {
      geometry: [55, 55],
      instanceRef: (placemark) => {
        expect(props.geometry).toBe(
          (placemark.geometry as ymaps.IPointGeometry).getCoordinates(),
        );
        expect(placemark).toBeTruthy();
        done();
      },
    };

    mount(
      <YmapsProvider>
        <Map>
          <Placemark {...props} />
        </Map>
      </YmapsProvider>,
    );
  });
});
