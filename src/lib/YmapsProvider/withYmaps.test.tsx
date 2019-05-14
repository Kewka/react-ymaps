import * as React from 'react';
import { mount } from 'enzyme';
import withYmaps from './withYmaps';
import YmapsProvider from './YmapsProvider';

describe('withYmaps', () => {
  it('to be truthy', () => {
    expect(withYmaps).toBeTruthy();
  });

  it('render inside provider', (done) => {
    expect.assertions(1);
    const Component = withYmaps((props) => {
      expect(props.ymaps).toBeTruthy();
      done();
      return null;
    });

    mount(
      <YmapsProvider>
        <Component />
      </YmapsProvider>,
    );
  });
});
