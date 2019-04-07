import React, { Component } from 'react';
import { YmapsProvider } from 'react-ymaps';

export default class App extends Component {
  onLoad = ymaps => {
    console.log({ ymaps });
  };

  render() {
    return (
      <YmapsProvider onLoad={this.onLoad}>
        ymaps instance is available
      </YmapsProvider>
    );
  }
}
