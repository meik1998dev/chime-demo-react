import { Avatar } from '@chakra-ui/react';
import {
   LocalVideo,
   RemoteVideo,
   useAttendeeStatus,
   useRemoteVideoTileState,
} from 'amazon-chime-sdk-component-library-react';
import React from 'react';
import { BsFillMicMuteFill } from 'react-icons/bs';

export const Attendee = ({ chimeAttendeeId, externalUserId }: any) => {
   const { attendeeIdToTileId } = useRemoteVideoTileState();

   const isCreator = (externalUserId as string).startsWith('@');

   const matched = Object.keys(attendeeIdToTileId).find(
      (attendeeId) => attendeeId === chimeAttendeeId,
   );

   const { muted, videoEnabled } = useAttendeeStatus(chimeAttendeeId);

   const tileId = attendeeIdToTileId[matched as string];

   const getBoxStyle = () => {
      if (isCreator) {
         return 'lg:col-span-4 row-span-6 order-1';
      } else return 'lg:col-span-1 row-span-1 order-2';
   };

   return (
      <div className={`${getBoxStyle()}`}>
         {videoEnabled ? (
            <>
               {tileId ? (
                  <RemoteVideo
                     style={{
                        borderRadius: '8px',
                        border: '1px solid grey',
                        gridArea: '',
                     }}
                     tileId={tileId}
                  />
               ) : (
                  <LocalVideo />
               )}
            </>
         ) : (
            <div className='bg-[#4A5568] h-full p-5 rounded-lg flex flex-col relative text-white  justify-center items-center'>
               <Avatar
                  size={'lg'}
                  name={(externalUserId.split('|')[0] as string).replace(
                     '@',
                     '',
                  )}
                  background='#2D3748'
                  color={'white'}
               />
               <div className='flex w-full justify-between absolute bottom-2 px-2'>
                  <span className='bg-[#2D3748] rounded-lg text-xs flex justify-center items-center px-2'>
                     {(externalUserId.split('|')[0] as string).replace('@', '')}
                  </span>
                  <span>
                     {muted ? (
                        <BsFillMicMuteFill className='text-red-600' />
                     ) : (
                        ''
                     )}
                  </span>
               </div>
            </div>
         )}
      </div>
   );
};
