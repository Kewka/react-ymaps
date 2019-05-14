import React from 'react';
import { Map, Placemark } from 'react-ymaps';

const containerStyle = { width: '100vw', height: '100vh' };
const defaultState = { center: [56.8519, 60.6122], zoom: 12 };

const placemarkRef = placemark =>
  console.log('[ExampleMap] Placemark:', placemark);
const placemarkProperties = {
  balloonContent: 'Placemark balloon'
};

const ExampleMap = () => (
  <Map defaultState={defaultState} containerStyle={containerStyle}>
    <Placemark
      geometry={defaultState.center}
      properties={placemarkProperties}
      instanceRef={placemarkRef}
    />
  </Map>
);

export default ExampleMap;
