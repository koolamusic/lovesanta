import { createRealm } from 'use-realm'
import {
    IRecordResponse,
    // TValue
} from '../pages/api/interface'

export const RECORDID = ''
export const PINCODE = ''
export const STEP = createRealm<string>('default')
export const SESSION_USER = createRealm<IRecordResponse>({
    id: "string",
    name: "Human",
    isActivated: "false",
    pin: "string",
    isPaired: false,
    pairId: "string",
    count: 0,
}
)