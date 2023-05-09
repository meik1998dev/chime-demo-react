import { Avatar } from '@chakra-ui/react';
import {
   RemoteVideo,
   useAttendeeStatus,
   useRemoteVideoTileState,
} from 'amazon-chime-sdk-component-library-react';
import React from 'react';
import { BsFillMicMuteFill } from 'react-icons/bs';

export const Attendee = ({ chimeAttendeeId, externalUserId }) => {
   const { attendeeIdToTileId } = useRemoteVideoTileState();

   const matched = Object.keys(attendeeIdToTileId).find(
      (attendeeId) => attendeeId === chimeAttendeeId,
   );

   const { muted, videoEnabled } = useAttendeeStatus(chimeAttendeeId);

   const tileId = attendeeIdToTileId[matched];

   if (videoEnabled) {
      return (
         <RemoteVideo
            style={{
               borderRadius: '8px',
               border: '1px solid grey',
               gridArea: '',
            }}
            tileId={tileId}
         />
      );
   } else
      return (
         <div className='bg-[#4A5568] p-5 rounded-lg flex flex-col relative text-white  justify-center items-center'>
            <Avatar
               size={'lg'}
               name={externalUserId}
               background='#2D3748'
               color={'white'}
            />
            <div className='flex w-full justify-between absolute bottom-2 px-2'>
               <span className='bg-[#2D3748] rounded-lg text-xs flex justify-center items-center px-2'>
                  {externalUserId.split('|')[0]}
               </span>
               <span>{muted ? <BsFillMicMuteFill className='text-red-600' /> : ''}</span>
            </div>
         </div>
      );
};
