
export interface IRecordOptionProps {
    name: string;
    isActivated: string;
    pin: string;
    pairName?: string;
    isPaired: boolean;
    pairId: string;
    count: number
}
export interface IRecordResponse {
    fields?: any;
    id: string;
    name: string;
    pairName: string;
    isActivated: string;
    pin: string;
    isPaired: boolean;
    pairId: string;
    count: number
}
export interface IAirtableRawJSON {
    id: string;
    rawJSON: any;
    fields: {
        name: string;
        pairName: string;
        isActivated: string;
        pin: string;
        isPaired: boolean;
        pairId: string;
        count: number
    }
}


export interface TableOptionProps {
    baseName: string;
    baseView: string;
    limit?: number | 10;
}

export type TValue = IRecordResponse & string | string[] | number[] | undefined | number | boolean
