// Fake users data
import { NextApiRequest, NextApiResponse } from 'next'
import * as airtable from '../airtable.config'
import { IRecordOptionProps } from '../interface'
import { BASENAME, PARAMS } from '../constants'
import { findByName } from '../mapper';



// airtable.updateOneRecord("List", "rec8KYfpGbBNNQ3Z1", {
//     isPaired: true,
//     count: 3
// })


export default async function handler(req: NextApiRequest, res: NextApiResponse<IRecordOptionProps[]>): Promise<void> {

    const { query: { id, name }, method, } = req

    const sanitizeName = name.toString()

    console.log(method, id, name)
    const allCollections = await airtable
        .getSimpleCollection(PARAMS)
        .all()
        .then((v) => v.map((record) => ({ id: record.id, ...record.fields })));

    const userRecord = await findByName(sanitizeName)


    switch (method) {
        case 'GET':
            // Get data from your database
            res.status(200).json(userRecord)
            break
        case 'PUT':
            // Update or create data in your database
            // res.status(200).json({ id, name: name || `User ${id}` })
            break
        case 'POST':
            // Update or create data in your database
            // res.status(200).json({ id, name: name || `User ${id}` })
            break
        case 'PATCH':
            // Update or create data in your database
            // res.status(200).json({ id, name: name || `User ${id}` })
            break
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

}