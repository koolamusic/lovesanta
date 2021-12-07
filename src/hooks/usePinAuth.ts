import Router from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { IRecordResponse } from '@/lib/interface';
import isEmpty from 'lodash/isEmpty';

export default function usePinAuth() {
  const [isAccessing, setAccessing] = useState<boolean>(false);
  const store = useStore((state) => state);
  const __activated__ = useStore((state) => state.isActivated);

  let response;
  const handleAuth = async ({ userPin, toast }: any): Promise<void> => {
    setAccessing(true);

    try {
      if (userPin.length !== 4) {
        await setAccessing(false);
        throw new Error('Pin must be 4 digits');
      }

      switch (__activated__) {
        case 'false':
          response = await axios.put<IRecordResponse>('/api/access/user', {
            params: {
              name: store.name,
              pin: userPin,
            },
          });
          await store.activate
          break;

        default:
          response = await axios.post<IRecordResponse>('/api/access/user', {
            params: {
              name: store.name,
              pin: userPin,
            },
          });
          break;
      }

      if (response.data === undefined || isEmpty(response.data)) {
        await setAccessing(false);
        toast({
          title: 'Access Denied.',
          description: 'There seems to be an issue',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.log(response.data, '[usePinAuth: handleAuth]')
        await store.updateUser(response.data);
        /* Route to the dip page using the user params id for GetServersideProps*/
        /* -- The goal is to use the isActivated instore to handle user setup --- */
        setAccessing(false);
        Router.push(`/dip/${store.id}`);
      }
      console.log(response.data);
    } catch (error: any) {
      toast({
        title: 'Unable to grant your request.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  return { isAccessing, handleAuth };
}
