import { createContext } from 'react';

import type { LibraryContextValue } from './library-types';

export const LibraryContext = createContext<LibraryContextValue | null>(null);
