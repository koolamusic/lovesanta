import Airtable from 'airtable';
import secrets from './constants'

/* Configure API Access for Airtable Base */
interface TableOptionProps {
    baseName: string;
    baseView: string;
    filterByFormula?: string;
    limit?: number | 10;
}


export interface CreateRecordOptionProps {
    name: string;
    isActivated: boolean;
    pin: string;
    isPaired: boolean;
    pairId: string;
    count: number
}


interface IManyRecordField {
    /* An Array of any interface type must have a single key of name fields that contains payload */
    fields: Record<any, string | number | boolean>;
}

export const getSimpleCollection = (options: Omit<TableOptionProps, 'limit'>) => {
    const { baseName, baseView } = options;
    const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);

    return base(baseName).select({
        view: baseView
    });
};

export const filterCollectionBy = (options: Omit<TableOptionProps, 'limit'>) => {
    const { baseName, baseView, filterByFormula } = options;
    const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);
    console.log(`Filter Operation in ${baseName} for ${filterByFormula}`);


    return base(baseName).select({
        view: baseView,
        filterByFormula
    });
};


export const getCollections = (options: TableOptionProps) => {
    const { baseName, limit, baseView } = options;
    const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);

    return base(baseName).select({
        maxRecords: limit,
        view: baseView
    });
};

/* Find a Record using a string */
export const getByRecord = (baseName: string, filter: string) => {
    const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);
    console.log(`Find Operation in ${baseName} for ${filter}`);

    return base(baseName).find(filter);
};


export const createOneRecord = <T extends CreateRecordOptionProps | Record<any, string>>(
    baseName: string,
    payload: T
) => {
    const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);

    console.log(`creating a record in ${baseName} for ${payload}`);

    return base(baseName).create([
        {
            fields: {
                ...payload
            }
        }
    ]);
};

export const updateOneRecord = <T extends CreateRecordOptionProps | Record<any, string>>(
    baseName: string,
    recordId: string,
    payload: Partial<T>
) => {
    const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);

    console.log(`updating new record in ${baseName} for ${payload}`);

    return base(baseName).update([
        {
            "id": recordId,
            "fields": {
                ...payload
            }
        }
    ]);
};

export const createManyRecord = <T extends IManyRecordField>(baseName: string, payload: T[]) => {
    const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);

    console.log(`creating new record in ${baseName}`);
    return base(baseName).create([[...payload]]);
};

export const notifyRecord = async (message: string, recipientName: string, status: string, channel: string) => {
    console.log(`airtable.provider func: notifyRecord for ${status} status`);
    const recordCreatedOption = {
        Recipient: recipientName,
        Message: message,
        Status: status,
        Time: new Date().toString(),
        Channel: channel
    };
    return await createOneRecord('Delivered_Messages', recordCreatedOption);
};