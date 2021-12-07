import Airtable from 'airtable';
import secrets from './constants';

/* Configure API Access for Airtable Base */
interface TableOptionProps {
  baseName: string;
  baseView: string;
  filterByFormula?: string;
  limit?: number | 10;
}

export interface CreateRecordOptionProps {
  id?: string // actually only available in update, but we will keep this hack available here
  name: string;
  isActivated: boolean;
  pin: string;
  hasPair?: boolean;
  isPaired: boolean;
  pairId: string;
  count: number;
}

export interface UpdateRecordOptionProps {
  id: string;
  fields?: {
    name?: string;
    isActivated?: boolean;
    hasPair?: boolean | true | false;
    isPaired?: boolean | true | false;
    pin?: string;
    pairName?: string;
    pairId?: string;
    count?: number;
  }

}

interface IManyRecordField {
  /* An Array of any interface type must have a single key of name fields that contains payload */
  fields: Record<any, string | number | boolean>;
}

export const getSimpleCollection = (options: Omit<TableOptionProps, 'limit'>) => {
  const { baseName, baseView } = options;
  const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE as string);

  return base(baseName).select({
    view: baseView,
  });
};

export const filterCollectionBy = (options: Omit<TableOptionProps, 'limit'>) => {
  const { baseName, baseView, filterByFormula } = options;
  const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE as string);
  console.log(`Filter Operation in ${baseName} for ${filterByFormula}`);

  return base(baseName).select({
    view: baseView,
    filterByFormula,
  });
};

export const getCollections = (options: TableOptionProps) => {
  const { baseName, limit, baseView } = options;
  const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE as string);

  return base(baseName).select({
    maxRecords: limit,
    view: baseView,
  });
};

/* Find a Record using a string */
export const getByRecord = (baseName: string, recordId: string) => {
  const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE as string);
  console.log(`Find Operation in ${baseName} for ${recordId}`);

  return base(baseName).find(recordId);
};

export const createOneRecord = <T extends CreateRecordOptionProps | Record<any, string>>(baseName: string, payload: T) => {
  const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE as string);

  console.log(`creating a record in ${baseName} for ${payload}`);

  return base(baseName).create([
    {
      fields: {
        ...payload,
      },
    },
  ]);
};

export const updateOneRecord = async <T extends CreateRecordOptionProps | any>(
  baseName: string,
  recordId: string,
  payload: T
) => {
  const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE as string);

  console.log(`updating new record in ${baseName} for ${payload}`);

  const updatedRecord = await base(baseName).update([
    {
      id: recordId,
      fields: {
        ...payload as any,
      },
    },
  ]);

  console.log(base, updatedRecord, '<<<<<<<<CONFIG:updateOneRecord>>>>>>>');
  return updatedRecord;
};

export const updateManyRecord = async <T extends UpdateRecordOptionProps | Record<any, string>>(
  baseName: string,
  payload: Partial<T>[]
) => {
  const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE as string);

  console.log(`updating new record in ${baseName} for ${JSON.stringify(payload)}`);

  const updatedRecord = await base(baseName).update(payload as any);

  console.log(base, updatedRecord, '<<<<<<<<CONFIG:updateManyRecord>>>>>>>');
  return updatedRecord;
};

export const createManyRecord = <T extends IManyRecordField>(baseName: string, payload: T[]) => {
  const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE as string);

  console.log(`creating new record in ${baseName}`);
  return base(baseName).create([...payload]);
};
