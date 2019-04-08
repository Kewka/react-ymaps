import * as React from 'react';
import { mount } from 'enzyme';
import YmapsProvider from '../YmapsProvider/YmapsProvider';
import YandexMap, { YandexMapProps } from './YandexMap';

describe('YandexMap', () => {
  it('to be truthy', () => {
    expect(YandexMap).toBeTruthy();
  });

  it('render', (done) => {
    expect.assertions(1);
    const mapProps: YandexMapProps = {
      onMapAvailable: (map) => {
        expect(map).toBeTruthy();
        done();
      },
    };

    mount(
      <YmapsProvider>
        <YandexMap {...mapProps} />
      </YmapsProvider>,
    );
  });

  it('pass defaultState', (done) => {
    expect.assertions(3);

    const defaultState = {
      // Yekaterinburg
      center: [56.8519, 60.6122],
      zoom: 5,
    };

    const mapProps: YandexMapProps = {
      onMapAvailable: (map) => {
        expect(map).toBeTruthy();
        expect(map.getZoom()).toBe(defaultState.zoom);
        const formatFn = (coord: number) => coord.toFixed();
        const expectedCenter = defaultState.center.map(formatFn);
        const mapCenter = map.getCenter().map(formatFn);
        expect(mapCenter).toEqual(expectedCenter);
        done();
      },
      defaultState,
    };

    mount(
      <YmapsProvider>
        <YandexMap {...mapProps} />
      </YmapsProvider>,
    );
  });
});
