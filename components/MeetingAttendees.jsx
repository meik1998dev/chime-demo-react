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
   const contentShare = useContentShareState();
   const { roster } = useRosterState();

   return (
      <div
         className='bg-transparent '
         style={{ padding: '1rem', height: '85vh', boxSizing: 'border-box' }}
      >
         <div
            className='grid lg:grid-cols-6 grid-cols-1 lg:grid-rows-6 h-full'
            style={{ background: 'transparent', gap: '15px' }}
         >
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
         </div>
      </div>
   );
};
