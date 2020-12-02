// Fake users data
import { NextApiRequest, NextApiResponse } from 'next'
import * as airtable from './airtable.config'
import { IRecordResponse } from './interface'
import { BASENAME } from './constants'
import { findByName, findByFilter } from './mapper';
import _ from 'lodash'


export default async function handler(req: NextApiRequest, res: NextApiResponse<IRecordResponse[] | null>): Promise<void> {

    const { query: { id, name }, method, body } = req


    console.log(body, method, id, name)

    /* Callback to send response payload */
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
            } else {
                res.status(200).json(putAccess)
            }
            break
        case 'POST':
            const postAccess = await findByFilter(`AND({name} = '${body.params.name}', {pin} = '${body.params.pin}')`)
            res.status(200).json(postAccess)
            break
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

}