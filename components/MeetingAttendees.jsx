import { ContentShare } from 'amazon-chime-sdk-component-library-react';
import { useRosterState } from 'amazon-chime-sdk-component-library-react';
import { useContentShareState } from 'amazon-chime-sdk-component-library-react';
import { useState } from 'react';
import { Attendee } from './Attendee';

export const MeetingAttendees = ({ meetId }) => {
   const contentShare = useContentShareState();
   const { roster } = useRosterState();
   const [selectedView, setselectedView] = useState();

   return (
      <div
         className='bg-transparent '
         style={{ padding: '1rem', height: '92vh', boxSizing: 'border-box' }}
      >
         <div
            className='grid lg:grid-cols-6 grid-cols-1 lg:grid-rows-6 h-full'
            style={{ background: 'transparent', gap: '15px' }}
         >
            {contentShare.tileId && (
               <div
                  className={`cursor-pointer ${
                     selectedView === 'contentShare' &&
                     'lg:col-span-4 row-span-6 order-1'
                  }`}
                  onClick={() => setselectedView('contentShare')}
               >
                  <ContentShare
                     style={{
                        border: '1px solid grey',
                        gridArea: '',
                     }}
                     nameplate='Content share'
                  />
               </div>
            )}

            {Object.values(roster).map(
               ({ chimeAttendeeId, externalUserId }) => {
                  return (
                     <Attendee
                        selectedView={selectedView}
                        setselectedView={setselectedView}
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
