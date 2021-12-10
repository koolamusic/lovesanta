/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRecordResponse, IRecordOptionProps } from '@/lib/interface';
import create from 'zustand';
import { persist } from 'zustand/middleware';

/**--------------------------------------------------------------*/
/* Handle all of the type definitions for the Store by Slice     */
/**--------------------------------------------------------------*/
type StoreState = {
  wipe: () => void; // Clears the entire store
  activate: () => void; // activates the user
  updateUser: (user: Partial<IRecordResponse>) => void;
  id: string;
  name: string;
  isActivated: string;
  pin: string;
  isPaired: string;
  pairName: string;
  pairPreference?: string;
  pairId: string;
  count: number;
  page: 'default' | 'createPin' | 'enterPin' | 'dip' | string;
  pairInfo?: IRecordOptionProps;
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
      id: '',
      name: 'Human',
      isActivated: 'false',
      pin: 'string',
      isPaired: 'false',
      pairId: '',
      pairName: '',
      count: 0,
      page: 'default',
      activate: () => set({ isActivated: 'true' }),
      updateUser: (user) => set((state) => Object.assign(state, user)),
      wipe: () => set({}, true), // clears the entire store, actions included
    }),
    /* ------ Persist Middleware specific configs and action ------ */
    {
      name: 'app-lovedip',
    }
  )
);
