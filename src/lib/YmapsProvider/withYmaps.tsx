import * as React from 'react';
import { Subtract } from 'utility-types';
import YmapsContext from './YmapsContext';
import Ymaps from '../../types/Ymaps';

export type WithYmaps = {
  ymaps: Ymaps;
};

const withYmaps = <P extends WithYmaps>(Component: React.ComponentType<P>) => {
  return class WithYmapsComponent extends React.Component<
    Subtract<P, WithYmaps>
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
