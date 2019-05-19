import { createContext } from 'react';
import Ymaps from '../../types/Ymaps';

const YmapsContext = createContext<Ymaps | null>(null);

export default YmapsContext;
