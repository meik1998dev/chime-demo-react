import {
   ContentShare,
   LocalVideo,
   RemoteVideo,
   useAudioVideo,
   useLocalVideo,
   useRemoteVideoTileState,
   VideoGrid,
   VideoTile,
} from 'amazon-chime-sdk-component-library-react';
import { useRosterState } from 'amazon-chime-sdk-component-library-react';
import { useContentShareState } from 'amazon-chime-sdk-component-library-react';
import { Attendee } from './Attendee';

export const MeetingAttendees = () => {
   const { roster } = useRosterState();
   const contentShare = useContentShareState();

   return (
      <div style={{ padding: '1rem', height: '70vh', boxSizing: 'border-box' }}>
         <VideoGrid>
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

            {Object.values(roster).map(({ chimeAttendeeId }) => {
               return <Attendee chimeAttendeeId={chimeAttendeeId} />;
            })}
         </VideoGrid>
      </div>
   );
};
