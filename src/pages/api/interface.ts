
export interface IRecordOptionProps {
    name: string;
    isActivated: string;
    pin: string;
    isPaired: boolean;
    pairId: string;
    count: number
}
export interface IRecordResponse {
    id: string;
    name: string;
    isActivated: string;
    pin: string;
    isPaired: boolean;
    pairId: string;
    count: number
}


export interface TableOptionProps {
    baseName: string;
    baseView: string;
    limit?: number | 10;
}

export type TValue = IRecordResponse & string | string[] | number[] | undefined | number | boolean
