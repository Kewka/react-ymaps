import { createContext } from 'react';
import Ymaps from '../../typings/Ymaps';

const YmapsContext = createContext<Ymaps | null>(null);

export default YmapsContext;
