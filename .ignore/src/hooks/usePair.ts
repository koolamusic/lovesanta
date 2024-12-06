import axios from 'axios';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { IRecordResponse } from '@/lib/interface';

export default function useAccess() {
  const [isAccessing, setAccessing] = useState<boolean>(false);
  const store = useStore((state) => state);

  const handlePair = async ({ user, toast }: any): Promise<void> => {
    setAccessing(true);

    try {
      /* Run a few checks to ensure validaty in route and store */
      if (store.id != user.id) {
        window.location.reload();
        console.error('we are not sure of who you are');
      }

      const response = await axios.post<IRecordResponse[]>('/api/pair', {
        params: {
          userId: user.id,
          name: user.name,
          pin: user.pin,
          count: user.count,
        },
      });

      if (!response.data || response.data.length === 0) {
        setAccessing(false);
        throw new Error('An Error occured with your request');
      }

      /* Update user data in store with new pair object */
      await store.updateUser(response.data[0]);
      setAccessing(false);

      /*  */
      console.log(response.data, '[usePair]: handlePair');
    } catch (error: any) {
      await setAccessing(false);
      toast({
        title: 'Unable to grant your request.',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  return { isAccessing, handlePair };
}
