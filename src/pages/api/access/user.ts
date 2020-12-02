// Fake users data
import { NextApiRequest, NextApiResponse } from 'next'
import * as airtable from '../airtable.config'
import { IRecordResponse } from '../interface'
import { BASENAME, PARAMS } from '../constants'
import { findByName, findByFilter } from '../mapper';
import _ from 'lodash'



// airtable.updateOneRecord("List", "rec8KYfpGbBNNQ3Z1", {
//     isPaired: true,
//     count: 3
// })


export default async function handler(req: NextApiRequest, res: NextApiResponse<IRecordResponse[] | null>): Promise<void> {

    const { query: { id, name }, method, body } = req


    console.log(body, method, id, name)
    // const userAccess = await findByFilter(`AND({name} = '${name}', {pin} = '${pin}')`)
    const resCallback = (payload: any) => {
        return res.status(200).json(payload)

    }


    switch (method) {
        case 'GET':
            const sanitizeName = name.toString()
            const userRecord = await findByName(sanitizeName)
            res.status(200).json(userRecord)
            break
        case 'PATCH':
            // Update or create data in your database
            res.status(200).json(null)
            break

        case 'PUT':
            const putAccess = await findByFilter(`AND({name} = '${body.params.name}', {pin} = '${body.params.pin}')`)
            console.log(putAccess)
            if (_.isArray(putAccess) && !putAccess.length) {
                try {
                    await (await findByName(body.params.name)).map((val, _idx) => (
                        airtable.updateOneRecord(BASENAME, val.id, {
                            pin: body.params.pin
                        })
                            .then((v) => v
                                .map((record) =>
                                    resCallback({ id: record.id, ...record.fields })))
                    ))

                } catch (error) {
                    res.status(500).json(error)
                }

            }

            /* Query and return new account ::HACK */
            //     await findByFilter(`AND({name} = '${body.params.name}', {pin} = '${body.params.pin}')`)
            //    (newAccount)
            break
        case 'POST':
            // Update or create data in your database
            res.status(200).json(null)
            break
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

}