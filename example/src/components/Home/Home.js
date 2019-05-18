import React from 'react';
import { withYmaps } from 'react-ymaps';
import ExampleMap from '../ExampleMap/ExampleMap';

import './home.css';

const Home = ({ ymaps }) => {
  console.log('[Home] withYmaps:', ymaps);
  return (
    <div className="home">
      <ExampleMap />
    </div>
  );
};

export default withYmaps(Home);
