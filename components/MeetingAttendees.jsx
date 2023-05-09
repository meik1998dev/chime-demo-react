import {
   ContentShare,
   LocalVideo,
   VideoGrid,
} from 'amazon-chime-sdk-component-library-react';
import { useRosterState } from 'amazon-chime-sdk-component-library-react';
import { useContentShareState } from 'amazon-chime-sdk-component-library-react';
import { useEffect } from 'react';
import { Attendee } from './Attendee';

export const MeetingAttendees = ({ meetId }) => {
   const { roster } = useRosterState();
   const contentShare = useContentShareState();

   return (
      <div
         className='bg-transparent container mx-auto'
         style={{ padding: '1rem', height: '70vh', boxSizing: 'border-box' }}
      >
         <VideoGrid style={{ background: 'transparent' }}>
            <LocalVideo />
            {contentShare.tileId && (
               <ContentShare
                  style={{
                     border: '1px solid grey',
                     gridArea: '',
                  }}
                  nameplate='Content share'
               />
            )}

            {Object.values(roster).map(
               ({ chimeAttendeeId, externalUserId }) => {
                  return (
                     <Attendee
                        externalUserId={externalUserId}
                        chimeAttendeeId={chimeAttendeeId}
                     />
                  );
               },
            )}
         </VideoGrid>
      </div>
   );
};
