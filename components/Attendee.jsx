import { Avatar } from '@chakra-ui/react';
import {
   RemoteVideo,
   useAttendeeStatus,
   useRemoteVideoTileState,
} from 'amazon-chime-sdk-component-library-react';
import React from 'react';

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
               border: '1px solid grey',
               gridArea: '',
            }}
            tileId={tileId}
         />
      );
   } else
      return (
         <div className='bg-slate-700 text-white font-bold flex justify-center items-center'>
            {muted ? 'muted' : 'not muted'}
            <br />
            {externalUserId}
            <Avatar name={externalUserId} />
         </div>
      );
};
