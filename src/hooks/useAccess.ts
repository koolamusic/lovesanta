import { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { useStore } from '@/lib/store';
import { IRecordResponse } from '@/lib/interface';

export default function useAccess() {
  const [isAccessing, setAccessing] = useState<boolean>(false);
  const store = useStore((state) => state);

  const handleAccess = async ({ userName, toast }: any): Promise<void> => {
    setAccessing(true);

    try {
      const response = await axios.get<IRecordResponse[]>('/api/access/user', {
        params: {
          name: userName,
        },
      });

      if (!response.data || response.data.length === 0) {
        setAccessing(false);
        throw new Error('We dont know you 🙄');
      }

      /* Initialize user data in session */
      store.updateUser(response.data[0]);
        /* stop waiting and push to pin page */
        /* -- The goal is to use the isActivated instore to handle user setup --- */
        setAccessing(false);
        Router.push('/pin');
        console.log(response.data[0]);

    
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

  return { isAccessing, handleAccess };
}
