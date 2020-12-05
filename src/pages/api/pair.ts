import { NextApiRequest, NextApiResponse } from 'next'
import * as airtable from './airtable.config'
import { IRecordResponse, IAirtableRawJSON } from './interface'
import { BASENAME, PARAMS } from './constants'
import { findByName, findByFilter } from './mapper';
import _ from 'lodash'

type THandlerResponse = IRecordResponse | IRecordResponse[] | null | undefined
export default async function handler(req: NextApiRequest, res: NextApiResponse<THandlerResponse>): Promise<void> {
    const { query: { id, name }, method, body } = req
    console.log(body, method, id, name)

    /* Callback function to return response */
    const resCallback = (payload: any) => {
        return res.status(200).json(payload)
    }

    /* Function to get Request User */
    const getUser = async (): Promise<IAirtableRawJSON> => {
        const record = await airtable.getByRecord(BASENAME, body.params.userId)
        return (record as unknown) as IAirtableRawJSON

    }


    const isAuthenticated = (): boolean => {
        findByFilter(`AND({name} = '${body.params.name}', {pin} = '${body.params.pin}')`)
            .then((v) => v.map((record) => {
                if (_.isEmpty(record) || record.id === undefined) {
                    return false
                }
            }))
        return true
    }


    switch (method) {
        case 'GET':
            const sanitizeName = name.toString()
            const userRecord = await findByName(sanitizeName)
            res.status(200).json(userRecord)
            break
        case 'PUT':
            const putAccess = await findByFilter(`AND({name} = '${body.params.name}', {pin} = '${body.params.pin}')`)
            res.status(200).json(putAccess)
            break
        case 'POST':
            let collections: IRecordResponse[] = [];
            if (isAuthenticated()) {
                collections = await airtable
                    .getSimpleCollection(PARAMS)
                    .all()
                    .then((v) => v.map((record) => ({ id: record.id, ...record.fields })));
            }
            try {
                /* Check if user Exceeds their limit */
                const user = await getUser()
                console.log("OUR USER -=========>", user)
                if (user.fields.count > 2) {
                    throw new Error('Your limit has been exceeded')
                }

                /* Check if user has an existing pair, so we can update that Pair-ID with their new isPaired Status */
                if (_.startsWith(user.fields.pairId, 'rec')) {
                    await airtable.updateOneRecord(BASENAME, user.fields.pairId, {
                        isPaired: false
                    })
                }

                /* Prevent user from pairing themselves by removing them from the list */
                const filterOwnerCollection = await collections.filter((item) => item.id !== body.params.userId)

                /* Filter users who haven't been paired */
                const noPairCollection = await filterOwnerCollection.filter((item) => !item.isPaired)


                /* Select A random user from the list */
                const sampledArr = (noPairCollection.length > 1 ? _.sample(noPairCollection) : noPairCollection) as IRecordResponse


                /* Update requester record and increment count */
                await airtable.updateOneRecord(BASENAME, body.params.userId, {
                    count: body.params.count + 1,
                    pairId: sampledArr.id,
                    pairName: sampledArr.name
                }).then(async (raw) => {

                    /* Update Paired (sampledArr) User with isPaired Boolean */
                    await airtable.updateOneRecord(BASENAME, sampledArr.id, {
                        isPaired: true
                    })
                    resCallback(raw.map((record) => ({ id: record.id, ...record.fields })))
                    // res.status(200).json((requesterRecord as unknown) as THandlerResponse)
                })

            } catch (error) {
                res.status(409).json(error)

            }

            break
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

}