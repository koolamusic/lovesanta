export interface IRecordOptionProps {
  id: string;
  name: string;
  isActivated: string;
  preferences: string;
  pin: string;
  pairName?: string;
  pairPreference: string;
  hasPair?: boolean;
  isPaired: boolean;
  pairId: string;
  count: number;
}
export interface IRecordResponse {
  fields?: any;
  id: string;
  name: string;
  pairName: string;
  preferences: string;
  hasPair?: boolean;
  pairPreference: string;
  isActivated: string;
  pin: string;
  isPaired: boolean;
  pairId: string;
  count: number;
}
export interface IAirtableRawJSON {
  id: string;
  rawJSON: any;
  fields: {
    name: string;
    pairName: string;
    preferences: string;
    isActivated: string;
    pairPreference: string;
    hasPair: boolean;
    pin: string;
    isPaired: boolean;
    pairId: string;
    count: number;
  };
}

export interface TableOptionProps {
  baseName: string;
  baseView: string;
  limit?: number | 10;
}

export type TValue = (IRecordResponse & string) | string[] | number[] | undefined | number | boolean;
