import React from 'react';
import { Map, Placemark, Polygon } from 'react-ymaps';

import './example-map.css';

const defaultState = { center: [56.8519, 60.6122], zoom: 12 };

const placemarkRef = placemark =>
  console.log('[ExampleMap] Placemark:', placemark);
const placemarkProperties = {
  balloonContent: 'Placemark balloon'
};

const polygonRef = polygon => console.log('[ExampleMap] Polygon:', polygon);
const polygonGeometry = [[[56.8, 60.6], [56.9, 60.6], [56.8, 60.7]]];
const polygonProperties = {
  balloonContent: 'Polygon balloon'
};

class ExampleMap extends React.Component {
  state = {
    hasPlacemark: true,
    hasPolygon: true,
    hasMap: true
  };

  handleToggleMap = () => this.setState({ hasMap: !this.state.hasMap });

  handleTogglePlacemark = () =>
    this.setState({ hasPlacemark: !this.state.hasPlacemark });

  handleTogglePolygon = () =>
    this.setState({ hasPolygon: !this.state.hasPolygon });

  render() {
    const { hasPlacemark, hasPolygon, hasMap } = this.state;
    return (
      <div className="example-map">
        <div className="example-map__actions">
          <button
            onClick={this.handleTogglePlacemark}
            className="example-map__action"
          >
            Toggle placemark
          </button>
          <button
            onClick={this.handleTogglePolygon}
            className="example-map__action"
          >
            Toggle polygon
          </button>
          <button
            onClick={this.handleToggleMap}
            className="example-map__action"
          >
            Toggle map
          </button>
        </div>
        {hasMap && (
          <Map
            onDestroy={() => alert('Map onDestroy')}
            className="example-map__container"
            defaultState={defaultState}
          >
            {hasPlacemark && (
              <Placemark
                geometry={defaultState.center}
                properties={placemarkProperties}
                instanceRef={placemarkRef}
              />
            )}
            {hasPolygon && (
              <Polygon
                onClick={() => alert('Polygon onClick')}
                onBalloonClose={() => alert('Polygon onBallonClose')}
                geometry={polygonGeometry}
                properties={polygonProperties}
                instanceRef={polygonRef}
              />
            )}
          </Map>
        )}
      </div>
    );
  }
}

export default ExampleMap;
