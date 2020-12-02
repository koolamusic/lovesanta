// Fake users data
import { NextApiRequest, NextApiResponse } from 'next'
import * as airtable from '../airtable.config'
import { IRecordResponse } from '../interface'
import { PARAMS } from '../constants'




export default async function handler(req: NextApiRequest, res: NextApiResponse<IRecordResponse[] | null>): Promise<void> {

    const { query: { id, name }, method, } = req

    console.log(method, id, name)
    const allCollections = await airtable
        .getSimpleCollection(PARAMS)
        .all()
        .then((v) => v.map((record) => ({ id: record.id, ...record.fields })));


    switch (method) {
        case 'GET':
            // Get data from your database
            res.status(200).json(null)
            break
        case 'PUT':
            // Update or create data in your database
            // res.status(200).json({ id, name: name || `User ${id}` })
            break
        case 'POST':
            // Update or create data in your database
            res.status(200).json(allCollections)
            break
        case 'PATCH':
            // Update or create data in your database
            // res.status(200).json({ id, name: name || `User ${id}` })
            break
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }




    // return data
}