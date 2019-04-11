import * as React from 'react';
import { mount } from 'enzyme';
import YmapsProvider from '../YmapsProvider/YmapsProvider';
import Map, { MapProps } from './Map';

describe('Map', () => {
  it('to be truthy', () => {
    expect(Map).toBeTruthy();
  });

  it('render', (done) => {
    expect.assertions(1);
    const mapProps: MapProps = {
      instanceRef: (map) => {
        expect(map).toBeTruthy();
        done();
      },
    };

    mount(
      <YmapsProvider>
        <Map {...mapProps} />
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

    const mapProps: MapProps = {
      instanceRef: (map) => {
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
        <Map {...mapProps} />
      </YmapsProvider>,
    );
  });
});
