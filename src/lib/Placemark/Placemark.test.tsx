import * as React from 'react';
import { mount } from 'enzyme';
import Placemark, { PlacemarkProps } from './Placemark';
import { YmapsProvider } from '../YmapsProvider';
import { YandexMap } from '../YandexMap';

describe('Placemark', () => {
  it('to be truthy', () => {
    expect(Placemark).toBeTruthy();
  });

  it('render', (done) => {
    expect.assertions(2);

    const props: PlacemarkProps = {
      geometry: [55, 55],
      instanceRef: (placemark) => {
        expect(props.geometry).toBe(placemark.geometry.getCoordinates());
        expect(placemark).toBeTruthy();
        done();
      },
    };

    mount(
      <YmapsProvider>
        <YandexMap>
          <Placemark {...props} />
        </YandexMap>
      </YmapsProvider>,
    );
  });
});
