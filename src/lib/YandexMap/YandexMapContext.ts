import { createContext } from 'react';

const YandexMapContext = createContext<ymaps.Map | null>(null);

export default YandexMapContext;
