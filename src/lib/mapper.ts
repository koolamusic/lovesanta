import * as airtable from './airtable.config';
import { PARAMS } from './constants';
import { IRecordResponse } from './interface';

export const listRecord = async (): Promise<IRecordResponse[]> => {
  const data = await airtable
    .getSimpleCollection(PARAMS)
    .all()
    .then((v) => v.map((record) => ({ id: record.id, ...record.fields })));
  return data;
};

export const findByName = async (name: string): Promise<IRecordResponse[]> => {
  return await airtable
    .filterCollectionBy({ ...PARAMS, filterByFormula: `AND({name} = '${name}')` })
    .all()
    .then((v) => v.map((record) => ({ id: record.id, ...record.fields })));
};

export const findByFilter = async (filterByFormula: string): Promise<IRecordResponse[]> => {
  return await airtable
    .filterCollectionBy({ ...PARAMS, filterByFormula })
    .all()
    .then((v) => v.map((record) => ({ id: record.id, ...record.fields })));
};
