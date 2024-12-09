// Fake users data
import { NextApiRequest, NextApiResponse } from 'next';
import * as airtable from '../../../lib/airtable.config';
import { IRecordResponse } from '../../../lib/interface';
import { BASENAME } from '../../../lib/constants';
import { findByName, findByFilter } from '../../../lib/mapper';
import _ from 'lodash';

export default async function handler(req: NextApiRequest, res: NextApiResponse<IRecordResponse[] | null>): Promise<void> {
  const {
    query: { id, name },
    method,
    body,
  } = req;

  console.log(body, method, id, name);

  /* Callback to send response payload */
  const resCallback = async (payload: any) => {
    console.log(JSON.stringify(payload), '[RES_CALLBACK]: API Handler');

    return await res.status(200).json(payload);
  };

  switch (method) {
    case 'GET': {
      const sanitizeName = name.toString();
      const userRecord = await findByName(sanitizeName);
      res.status(200).json(userRecord);
      break;
    }
    case 'PATCH':
      // Update or create data in your database
      res.status(200).json(null);
      break;

    case 'PUT': {
      const putAccess = await findByFilter(`AND({name} = '${body.params.name}', {pin} = '${body.params.pin}')`);
      console.log(JSON.stringify(putAccess));
      if (_.isArray(putAccess) && !putAccess.length) {
        try {
          await (
            await findByName(body.params.name)
          ).map(async (val) => {
            console.log(val, '[/put/access/user]: findByName');
            const user = await airtable.updateOneRecord(BASENAME, val.id, {
              pin: body.params.pin,
              isActivated: 'true',
            });
            console.log(user, '[/put/access/user]: updateOneRecord');
            /* return response from API */
            resCallback(user);
          });
        } catch (error: any) {
          res.status(500).json(error);
        }
      } else {
        res.status(200).json(putAccess);
      }
      break;
    }
    case 'POST': {
      const postAccess = await findByFilter(`AND({name} = '${body.params.name}', {pin} = '${body.params.pin}')`);
      res.status(200).json(postAccess);
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
