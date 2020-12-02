import * as airtable from './airtable.config'
import { IRecordOptionProps } from './interface'

const PARAMS = {
    baseName: 'List',
    baseView: 'Main'
};


export const listRecord = async (): Promise<IRecordOptionProps[]> => {
    const data = await airtable
        .getSimpleCollection(PARAMS)
        .all()
        .then((v) => v.map((record) => ({ id: record.id, ...record.fields })));
    return data;
};

export const findByName = async (name: string): Promise<IRecordOptionProps[]> => {
    return await airtable
        .filterCollectionBy({ ...PARAMS, filterByFormula: `AND({Name} = '${name}')` })
        .all()
        .then((v) => v.map((record) => ({ id: record.id, ...record.fields })))
};
