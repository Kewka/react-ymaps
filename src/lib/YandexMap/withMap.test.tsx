import * as React from 'react';
import { mount } from 'enzyme';
import withMap from './withMap';
import YmapsProvider from '../YmapsProvider/YmapsProvider';
import YandexMap from './YandexMap';

describe('withMap', () => {
  it('to be truthy', () => {
    expect(withMap).toBeTruthy();
  });

  it('render inside provider', (done) => {
    expect.assertions(1);
    const Component = withMap((props) => {
      expect(props.mapInstance).toBeTruthy();
      done();
      return null;
    });

    mount(
      <YmapsProvider>
        <YandexMap>
          <Component />
        </YandexMap>
      </YmapsProvider>,
    );
  });
});
