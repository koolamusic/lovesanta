import Router from 'next/router';
import axios from 'axios';
import { useState } from 'react';
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
      /*/////////////// Wipe the Local store ///////////////// */
      /* ------ prevent data leak, when two users interact on the same browser ---- */
      await store.wipe;
      /*/////////////// Wipe the Local store ///////////////// */

      /* Initialize user data in session */
      store.updateUser(response.data[0]);
      /* stop waiting and push to pin page */
      /* -- The goal is to use the isActivated instore to handle user setup --- */
      setAccessing(false);
      Router.push('/pin');
      console.log(response.data[0]);
    } catch (error: any) {
      await setAccessing(false);
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

// const pairAction = async (): Promise<void> => {
//   await setSubmitting(true);

//   try {
//     if (!store.id && !store.name && !store.pin) {
//       await setSubmitting(false);
//       // window.location.reload()
//       throw new Error('You have been logged out, refresh to login');
//     }

//     const response = await axios.post<IRecordResponse[]>('/api/pair', {
//       params: {
//         userId: store.id,
//         name: store.name,
//         pin: store.pin,
//         count: store.count,
//       },
//     });
//     if (response.data === undefined) {
//       toast({
//         title: 'Access Denied.',
//         description: 'There seems to be an issue',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//     } else {
//       /* Manage the API Response here */
//       await setSubmitting(false);
//     }
//     console.log(response.data);
//   } catch (error) {
//     toast({
//       title: 'Unable to grant your request.',
//       description: error.message,
//       status: 'error',
//       duration: 9000,
//       isClosable: true,
//     });
//     console.log(error.message);
//   }
// };
