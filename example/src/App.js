import React, { Component } from 'react';
import { YmapsProvider } from 'react-ymaps';
import Home from './Home';

export default class App extends Component {
  onLoad = ymaps => {
    console.log({ ymaps });
  };

  render() {
    return (
      <YmapsProvider onLoad={this.onLoad}>
        <Home />
      </YmapsProvider>
    );
  }
}
