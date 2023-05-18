import { Avatar } from '@chakra-ui/react';
import {
   LocalVideo,
   RemoteVideo,
   useAttendeeStatus,
   useRemoteVideoTileState,
} from 'amazon-chime-sdk-component-library-react';
import React from 'react';
import { BsFillMicMuteFill } from 'react-icons/bs';

export const Attendee = ({
   chimeAttendeeId,
   externalUserId,
   selectedView,
   setselectedView,
}: any) => {
   const { attendeeIdToTileId } = useRemoteVideoTileState();

   const isCreator = (externalUserId as string).startsWith('@');

   const matched = Object.keys(attendeeIdToTileId).find(
      (attendeeId) => attendeeId === chimeAttendeeId,
   );

   const { muted, videoEnabled } = useAttendeeStatus(chimeAttendeeId);

   const tileId = attendeeIdToTileId[matched as string];

   const getBoxStyle = () => {
      console.log(isCreator, selectedView);

      if ((isCreator && !selectedView) || selectedView === chimeAttendeeId) {
         return 'lg:col-span-4 row-span-6 order-1';
      } else return 'lg:col-span-1 row-span-1 order-2';
   };

   return (
      <div
         onClick={() => setselectedView(chimeAttendeeId)}
         className={`${getBoxStyle()} cursor-pointer`}
      >
         {videoEnabled ? (
            <>
               {tileId ? (
                  <div className='h-full relative'>
                     <RemoteVideo
                        style={{
                           borderRadius: '8px',
                           position: 'absolute',
                           height: '100%',
                           border: '1px solid grey',
                           gridArea: '',
                        }}
                        tileId={tileId}
                     />
                     <div className='flex w-full justify-between absolute bottom-2 px-2'>
                        <span className='bg-[#2D3748] rounded-lg text-xs text-white flex justify-center items-center px-2'>
                           {(externalUserId.split('|')[0] as string).replace(
                              '@',
                              '',
                           )}
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
