import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Container } from '@/components/Container';

/* Import Page Components here */
import PairPage from '@/components/routes/Dip';
import { parseAuthPageParams } from '@/lib/helpers';
import { IAirtableRawJSON, IRecordResponse } from '@/lib/interface';
import secrets, { BASENAME, PARAMS } from '@/lib/constants';
import * as airtable from '@/lib/airtable.config';
import sample from 'lodash/sample';

export default function Pair(props: any): JSX.Element {
  return (
    <Container minH='100vh'>
      <PairPage {...props} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as any;
  console.log(ctx.params, '[Dip:GetServerSideProps]');

  secrets.BASE_URL;

  const user = await parseAuthPageParams(id);

  try {
    const response = await axios.post<IRecordResponse[]>(`${secrets.BASE_URL}/api/access/user`, {
      params: {
        name: user.name,
        pin: user.pin,
      },
    });
    console.log(response.data, '[Dip:GetServerSideProps] User API response');

    /* Is this user does not have a pair, let's create one for them */
    if (!response.data[0].isPaired) {
      const collections = await airtable
        .getSimpleCollection(PARAMS)
        .all()
        .then((v) => v.map((record) => ({ id: record.id, ...record.fields }))) as IRecordResponse[];

      // const { data } = await axios.post<IRecordResponse[]>(`${secrets.BASE_URL}/api/pair`, {
      //   params: {
      //     userId: response.data.id,
      //     name: response.data.name,
      //     pin: response.data.pin,
      //     count: response.data.count,
      //   },
      // });
      // console.log(data)

      /* Prevent user from pairing themselves by removing them from the list */
      const filterOwnerCollection = await collections.filter((item) => item.id !== response.data[0].id);

      /* Filter users who haven't been paired, they essentially have no pair or users who have them assigned */
      const noPairCollection = filterOwnerCollection.filter((item) => !item.hasPair);

      /* Select A random user from the list */
      const sampledArr = (noPairCollection.length > 1 ? sample(noPairCollection) : noPairCollection) as IRecordResponse;

      /* Update requester record and increment count */
      // const getUserPair = await airtable.updateManyRecord(BASENAME, 
      const updatePayload = [
        {
          "id": response.data[0].id,
          "fields": {
            "count": response.data[0].count + 1,
            "pairId": sampledArr.id,
            "pairName": sampledArr.name,
            "isPaired": true,
            "hasPair": response.data[0].hasPair
          }
        },
        {
          "id": sampledArr.id,
          "fields": {
            "count": sampledArr.count,
            "pairId": sampledArr.pairId,
            "pairName": sampledArr.pairName,
            "isPaired": sampledArr.isPaired as true,  // this is a hack for TS... isPaired is when this user has a pair
            "hasPair": true,  // hasPair is when another user has paired them
          }
        },
      ]

      console.log(updatePayload)
      const { data } = await axios.patch<IRecordResponse[]>(`${secrets.BASE_URL}/api/update`, {
        params: {
          payload: updatePayload
        },
      });
      console.log(data)
      console.log(data, '[Dip:GetServerSideProps] Get User Pair');

      return {
        props: {
          user: updatePayload,
        },
      };
    }

    return {
      props: {
        user: response.data,
      },
    };
  } catch (error) {
    console.error(error, '[Dip: GetserverSideProps]: Catch Error');
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
