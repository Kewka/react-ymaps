import * as React from 'react';
import { create } from 'react-test-renderer';
import withYmaps from './withYmaps';
import YmapsProvider, { YmapsProviderProps } from './YmapsProvider';

const InsideProvider = (
  component: React.ReactNode,
  providerProps: YmapsProviderProps = {},
) => <YmapsProvider {...providerProps} children={component} />;

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

    create(InsideProvider(<Component />));
  });
});
