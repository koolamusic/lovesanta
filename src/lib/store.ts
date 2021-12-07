/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRecordResponse } from '@/lib/interface';
import create from 'zustand';
import { persist } from 'zustand/middleware';

/**--------------------------------------------------------------*/
/* Handle all of the type definitions for the Store by Slice     */
/**--------------------------------------------------------------*/
type StoreState = {
  fishes: number;
  repopulate: () => void;
  wipe: () => void; // Clears the entire store
  updateUser: (user: Partial<IRecordResponse>) => void;
  id: string;
  name: string;
  isActivated: string;
  pin: string;
  isPaired: string;
  pairId: string;
  count: number;
  page: 'default' | 'createPin' | 'enterPin' | 'dip' | string;
  airtableUser?: IRecordResponse;
};

export enum StoreBoolEnum {
  YES = 'YES',
  NO = 'NO',
}

/**-------------------------------------------------------------------------*/
/* ^^^ ABOVE WE USE THE STATES TO DERIVE [get,set] TYPINGS FOR SLICES  ^^^  */
/**-------------------------------------------------------------------------*/

export const useStore = create<StoreState>(
  persist(
    (set) => ({
      fishes: 10,
      id: '',
      name: 'Human',
      isActivated: 'false',
      pin: 'string',
      isPaired: 'false',
      pairId: '',
      count: 0,
      page: 'default',
      updateUser: (user) => set((state) => Object.assign(state, user)),
      repopulate: () => set((state) => ({ fishes: state.fishes + 1 })),
      wipe: () => set({}, true), // clears the entire store, actions included
    }),
    /* ------ Persist Middleware specific configs and action ------ */
    {
      name: 'app-lovedip',
    }
  )
);
