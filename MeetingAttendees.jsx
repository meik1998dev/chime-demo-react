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

export const MeetingAttendees = () => {
   const { attendeeIdToTileId } = useRemoteVideoTileState();
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
               const matched = Object.keys(attendeeIdToTileId).find(
                  (attendeeId) => attendeeId === chimeAttendeeId,
               );

               const tileId = attendeeIdToTileId[matched];

               if (tileId) {
                  return (
                     <RemoteVideo
                        style={{
                           border: '1px solid grey',
                           gridArea: '',
                        }}
                        tileId={tileId}
                     />
                  );
               }

               return (
                  <VideoTile
                     style={{
                        border: '1px solid grey',
                        gridArea: '',
                     }}
                     nameplate={chimeAttendeeId}
                  />
               );
            })}
         </VideoGrid>
      </div>
   );
};
