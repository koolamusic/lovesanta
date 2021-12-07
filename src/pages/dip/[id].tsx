import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '@/components/Container';

/* Import Page Components here */
import PairPage from '@/components/routes/Dip';
import { parseAuthPageParams } from '@/lib/helpers';

function Pair(props: any): JSX.Element {
  return (
    <Container minH='100vh'>
      <PairPage {...props} />
    </Container>
  );
}

// export const getServerSideProps:GetServerSideProps = async ({ params }) => {

// }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as any;

  console.log(ctx.params, '[Dip:GetServerSideProps]');
  // const id = ctx.params?.id as string÷
  const user = await parseAuthPageParams(id);
  return {
    props: {
      user,
    },
  };
};

export default Pair;
