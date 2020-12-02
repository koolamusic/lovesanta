
export interface IRecordOptionProps {
    name: string;
    isActivated: boolean;
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
