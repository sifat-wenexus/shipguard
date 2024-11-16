import { createContext } from 'react';

export const AppsContext = createContext<OverallApp[]>([]);

export interface OverallApp {
  id: string;
  name: string;
  illustration: string;
  description: string;
  installed: boolean;
  available: boolean;
  automatic?: boolean;
}
