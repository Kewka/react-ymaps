import React, { Component } from 'react';
import { withYmaps } from 'react-ymaps';
import ExampleMap from './ExampleMap';

class Home extends Component {
  componentDidMount() {
    const { ymaps } = this.props;
    console.log('Home.js:', { ymaps });
  }

  render() {
    return <ExampleMap />;
  }
}

export default withYmaps(Home);
