import { createContext } from 'react';

export const AppsContext = createContext<ShipGuardApp[]>([]);

export interface ShipGuardApp {
  id: string;
  name: string;
  illustration: string;
  description: string;
  installed: boolean;
  available: boolean;
  automatic?: boolean;
}
