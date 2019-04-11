import React, { Component } from 'react';
import { Map, Placemark } from 'react-ymaps';

const containerStyle = { width: 800, height: 600 };
const defaultState = { center: [56.8519, 60.6122], zoom: 12 };
export default class ExampleMap extends Component {
  render() {
    return (
      <Map defaultState={defaultState} containerStyle={containerStyle}>
        <Placemark
          geometry={defaultState.center}
          properties={{
            balloonContent: 'Placemark balloon'
          }}
          instanceRef={placemark => console.log({ placemark })}
        />
      </Map>
    );
  }
}
