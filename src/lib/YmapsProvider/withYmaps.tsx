import * as React from 'react';
import YmapsContext from './YmapsContext';
import Ymaps from '../../types/Ymaps';
import { Without } from '../../types/utility';

export type WithYmaps = {
  ymaps: Ymaps;
};

const withYmaps = <P extends WithYmaps>(Component: React.ComponentType<P>) => {
  return class WithYmapsComponent extends React.Component<
    Without<P, keyof WithYmaps>
  > {
    public render() {
      return (
        <YmapsContext.Consumer>
          {(ymaps) => {
            if (!ymaps) {
              console.error(
                'Could not find ymaps instance in the YmapsContext.',
              );
            }

            return ymaps && <Component ymaps={ymaps} {...this.props as P} />;
          }}
        </YmapsContext.Consumer>
      );
    }
  };
};

export default withYmaps;
