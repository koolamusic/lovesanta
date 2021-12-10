import { NextApiRequest, NextApiResponse } from 'next';
import * as airtable from '../../lib/airtable.config';
import { IRecordResponse } from '../../lib/interface';
import { BASENAME } from '../../lib/constants';
import { findByFilter } from '../../lib/mapper';

type THandlerResponse = IRecordResponse | IRecordResponse[] | null | undefined;
export default async function handler(req: NextApiRequest, res: NextApiResponse<THandlerResponse>): Promise<void> {
  const {
    query: { id, name },
    method,
    body,
  } = req;
  console.log(body, method, id, name);

  /* Callback function to return response */
  const resCallback = (payload: any) => {
    return res.status(200).json(payload);
  };

  switch (method) {
    case 'PUT': {
      const putAccess = await findByFilter(`AND({name} = '${body.params.name}', {pin} = '${body.params.pin}')`);
      res.status(200).json(putAccess);
      break;
    }
    case 'PATCH': {
      const result = await airtable.updateManyRecord(BASENAME, body.params.payload);
      resCallback(result);
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
