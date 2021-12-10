import React from 'react';
import { GetServerSideProps } from 'next';
import { Container } from '@/components/Container';

/* Import Page Components here */
import PairPage from '@/components/routes/Dip';
import { parseAuthPageParams } from '@/lib/helpers';
import { IRecordResponse } from '@/lib/interface';
import { BASENAME, PARAMS } from '@/lib/constants';
import * as airtable from '@/lib/airtable.config';
import sample from 'lodash/sample';
import filter from 'lodash/filter';

const Pair: React.FC<{ user: IRecordResponse }> = (props) => {
  return (
    <Container minH='100vh'>
      <PairPage {...props} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as any;
  console.log(ctx.params, '[Dip:GetServerSideProps]');

  const authParams = await parseAuthPageParams(id);

  try {
    const collections = (await airtable
      .getSimpleCollection(PARAMS)
      .all()
      .then((v) => v.map((record) => ({ id: record.id, ...record.fields })))) as IRecordResponse[];

    /* Get the current user by filtering based off params */
    const [user] = filter(collections, authParams);

    console.log(user, '[Dip:GetServerSideProps] _lodash.filter[user]');

    /* Is this user does not have a pair, let's create one for them */
    if (!user.isPaired) {
      /* Filter out the owner and all users who have pairs from the collection */
      /* rtp is short for Ready to Pair */
      const rtp = await collections.filter((item) => item.id !== user.id && !item.hasPair);
      console.log(rtp, '<<<<<<<<<<<[Dip:GetServerSideProps] Available Pairs (RTP)>>>>>>>>>>');

      /* Select A random user from the list */
      const sampledArr = (rtp.length >= 2 ? sample(rtp) : rtp[0]) as IRecordResponse;
      const batchUpdatePayload = [
        {
          id: user.id,
          fields: {
            count: Number(user.count) + 1,
            pairId: sampledArr.id,
            pairName: sampledArr.name,
            pairPreference: sampledArr.preferences,
            isPaired: true,
            hasPair: user.hasPair,
          },
        },
        {
          id: sampledArr.id,
          fields: {
            isPaired: sampledArr.isPaired as true, // this is a hack for TS... isPaired is when this user has a pair
            hasPair: true, // hasPair is when another user has paired them
          },
        },
      ];
      console.log(batchUpdatePayload, '[Dip:GetServerSideProps] Batch Update payload>>>>>>');

      /* Update requester record and increment count */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const [batchUpdateResponse] = await airtable.updateManyRecord(BASENAME, batchUpdatePayload);
      console.log(batchUpdateResponse, '[Dip:GetServerSideProps] Batch Update Pair Record');

      return {
        props: {
          user: { id: batchUpdateResponse.id, ...batchUpdateResponse.fields },
        },
      };
    }

    return {
      props: {
        user: user,
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

export default Pair;
