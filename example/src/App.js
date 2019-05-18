import React from 'react';
import { YmapsProvider } from 'react-ymaps';
import Home from './components/Home/Home';

const onLoad = ymaps => console.log('[App] Ymaps onLoad:', ymaps);

const App = () => (
  <YmapsProvider onLoad={onLoad}>
    <Home />
  </YmapsProvider>
);

export default App;
