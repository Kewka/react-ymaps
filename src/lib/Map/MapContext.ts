import { createContext } from 'react';

const MapContext = createContext<ymaps.Map | null>(null);

export default MapContext;
