import React from 'react';
import { withYmaps } from 'react-ymaps';
import ExampleMap from './ExampleMap';

const Home = ({ ymaps }) => {
  console.log('[Home] withYmaps:', ymaps);
  return <ExampleMap />;
};

export default withYmaps(Home);
