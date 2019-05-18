import * as React from 'react';
import MapContext from './MapContext';
import { Without } from '../../types/utility';

export type WithMap = {
  map: ymaps.Map;
};

const withMap = <P extends WithMap>(Component: React.ComponentType<P>) => {
  return class WithYmapsComponent extends React.Component<
    Without<P, keyof WithMap>
  > {
    public render() {
      return (
        <MapContext.Consumer>
          {(map) => {
            if (!map) {
              console.error('Could not find map instance in the MapContext.');
            }

            return map && <Component map={map} {...this.props as P} />;
          }}
        </MapContext.Consumer>
      );
    }
  };
};

export default withMap;
