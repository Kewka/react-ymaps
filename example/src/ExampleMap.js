import React, { Component } from 'react';
import { YandexMap } from 'react-ymaps';

const containerStyle = { width: '100vw', height: '100vh' };

export default class ExampleMap extends Component {
  render() {
    return <YandexMap containerStyle={containerStyle} />;
  }
}
