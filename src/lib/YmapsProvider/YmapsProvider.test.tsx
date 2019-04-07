import * as React from 'react';
import { create, ReactTestInstance } from 'react-test-renderer';
import YmapsProvider, { YmapsProviderProps } from './YmapsProvider';

describe('YmapsProvider', () => {
  it('to be truthy', () => {
    expect(YmapsProvider).toBeTruthy();
  });

  it('render', async () => {
    const props: YmapsProviderProps = {
      children: 'ymaps instance is available',
    };

    const component = create(<YmapsProvider {...props} />);
    const instance = component.getInstance() as ReactTestInstance;
    await instance.componentDidMount();
    const root = component.root;
    expect(root.children).toContain(props.children);
  });

  it('call onLoad callback', async () => {
    const props: YmapsProviderProps = {
      onLoad: jest.fn(),
    };

    const component = create(<YmapsProvider {...props} />);
    const instance = component.getInstance() as ReactTestInstance;
    await instance.componentDidMount();
    expect(props.onLoad).toBeCalled();
  });

  it('call onError callback', async () => {
    const props: YmapsProviderProps = {
      options: {
        version: '9999.99', // invalid version
        force: true,
      },
      children: 'ymaps instance is available',
      onError: jest.fn(),
    };

    const component = create(<YmapsProvider {...props} />);
    const instance = component.getInstance() as ReactTestInstance;
    const root = component.root;
    await instance.componentDidMount();
    expect(props.onError).toBeCalled();
    expect(root.children).toHaveLength(0);
  });
});
