import React, { Component } from 'react';
import { withYmaps } from 'react-ymaps';

class Home extends Component {
  componentDidMount() {
    const { ymaps } = this.props;
    console.log('Home.js:', { ymaps });
  }

  render() {
    return <div />;
  }
}

export default withYmaps(Home);