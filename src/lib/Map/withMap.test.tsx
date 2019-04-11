import * as React from 'react';
import { mount } from 'enzyme';
import withMap from './withMap';
import YmapsProvider from '../YmapsProvider/YmapsProvider';
import Map from './Map';

describe('withMap', () => {
  it('to be truthy', () => {
    expect(withMap).toBeTruthy();
  });

  it('render inside provider', (done) => {
    expect.assertions(1);
    const Component = withMap((props) => {
      expect(props.map).toBeTruthy();
      done();
      return null;
    });

    mount(
      <YmapsProvider>
        <Map>
          <Component />
        </Map>
      </YmapsProvider>,
    );
  });
});
