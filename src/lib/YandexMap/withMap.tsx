import * as React from 'react';
import { Subtract } from 'utility-types';
import YandexMapContext from './YandexMapContext';

export interface WithMap {
  mapInstance: ymaps.Map;
}

const withMap = <P extends WithMap>(Component: React.ComponentType<P>) => {
  return class WithYmapsComponent extends React.Component<
    Subtract<P, WithMap>
  > {
    public render() {
      return (
        <YandexMapContext.Consumer>
          {(mapInstance) => {
            if (!mapInstance) {
              console.error(
                'Could not find map instance in the YandexMapContext.',
              );
            }

            return (
              mapInstance && (
                <Component mapInstance={mapInstance} {...this.props as P} />
              )
            );
          }}
        </YandexMapContext.Consumer>
      );
    }
  };
};

export default withMap;
