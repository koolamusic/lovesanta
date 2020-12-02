import * as airtable from './config'
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

