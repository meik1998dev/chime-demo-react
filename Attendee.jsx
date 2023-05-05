import {
   RemoteVideo,
   useAttendeeStatus,
   useRemoteVideoTileState,
} from 'amazon-chime-sdk-component-library-react';
import React from 'react';

export const Attendee = ({ chimeAttendeeId }) => {
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
         <div
            style={{
               border: '1px solid grey',
               gridArea: '',
               background: 'blue',
            }}
         >
            {muted ? 'muted' : 'not muted'}
            <br />
            {chimeAttendeeId}
         </div>
      );
};
