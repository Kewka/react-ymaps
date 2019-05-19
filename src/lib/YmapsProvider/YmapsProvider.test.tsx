import * as React from 'react';
import { shallow } from 'enzyme';
import YmapsProvider from './YmapsProvider';

describe('YmapsProvider', () => {
  it('to be truthy', () => {
    expect(YmapsProvider).toBeTruthy();
  });

  it('render', async () => {
    const props: React.ComponentProps<typeof YmapsProvider> = {
      children: 'ymaps instance is available',
    };

    const component = shallow(<YmapsProvider {...props} />);
    const instance = component.instance();
    await instance.componentDidMount();
    expect(component.contains(props.children)).toBeTruthy();
  });

  it('call onLoad callback', async () => {
    const props: React.ComponentProps<typeof YmapsProvider> = {
      onLoad: jest.fn(),
    };

    const component = shallow(<YmapsProvider {...props} />);
    const instance = component.instance();
    await instance.componentDidMount();
    expect(props.onLoad).toBeCalled();
  });

  it('call onError callback', async () => {
    const props: React.ComponentProps<typeof YmapsProvider> = {
      options: {
        version: '9999.99', // invalid version
        force: true,
      },
      children: 'ymaps instance is available',
      onError: jest.fn(),
    };

    const component = shallow(<YmapsProvider {...props} />);
    const instance = component.instance();
    await instance.componentDidMount();
    expect(props.onError).toBeCalled();
    expect(component.isEmptyRender()).toBeTruthy();
  });
});
