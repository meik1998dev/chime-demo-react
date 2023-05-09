import {
   useLocalVideo,
   useMeetingManager,
   useContentShareControls,
   ControlBar,
   Laptop,
   ControlBarButton,
   Camera,
   Microphone,
   Phone,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { useEffect, useRef, useState } from 'react';
import { useToggleLocalMute } from 'amazon-chime-sdk-component-library-react';
import { AudioOutputControl } from 'amazon-chime-sdk-component-library-react';
import { MeetingAttendees } from './MeetingAttendees';

export const Meet = () => {
   const meetingManager = useMeetingManager();
   const [meetingId, setMeetingId] = useState<any>();
   const [attendee, setAttendee] = useState<any>();
   const { toggleVideo } = useLocalVideo();
   const [meetings, setmeetings] = useState<any>([]);
   const { toggleContentShare } = useContentShareControls();
   const { muted, toggleMute } = useToggleLocalMute();

   const joinMeeting = async () => {
      const meetingSessionConfiguration = new MeetingSessionConfiguration(
         meetingId,
         attendee,
      );

      await meetingManager.join(meetingSessionConfiguration);

      await meetingManager.start();
   };

   const createMeetingSession = async () => {
      await fetch('https://chime.axensodev.com/api/meetings/create', {
         method: 'POST',
      });
   };

   const createAtendee = async () => {
      const res = await fetch(
         `https://chime.axensodev.com/api/meetings/${meetingId?.uuid}/attendee/create`,
         { method: 'POST' },
      );
      const data = await res.json();

      setAttendee({ ...data.data.attend });
   };

   useEffect(() => {
      if (!attendee?.AttendeeId) return;
      joinMeeting();
   }, [attendee?.AttendeeId]);

   useEffect(() => {
      const fetchMeetings = async () => {
         const res = await fetch(`https://chime.axensodev.com/api/meetings`);
         const data = await res.json();
         setmeetings(data.data.meetings);
      };
      fetchMeetings();
   }, []);

   useEffect(() => {
      if (!meetingId) return;

      createAtendee();
   }, [meetingId?.uuid]);

   const [cameraActive, setCameraActive] = useState(false);

   const microphoneButtonProps = {
      icon: muted ? <Microphone muted /> : <Microphone />,
      onClick: () => toggleMute(),
      label: 'Mute',
   };

   const cameraButtonProps = {
      icon: cameraActive ? <Camera /> : <Camera disabled />,

      onClick: () => {
         setCameraActive(!cameraActive);
         toggleVideo();
      },
      label: 'Camera',
   };

   const hangUpButtonProps = {
      icon: <Phone />,
      onClick: () => meetingManager.leave(),
      label: 'End',
   };

   const laptopButtonProps = {
      icon: <Laptop />,
      onClick: () => toggleContentShare(),
      label: 'Screen',
   };

   const elem = useRef(null);

   function openFullscreen() {
      if ((elem.current as any)?.requestFullscreen) {
         (elem.current as any)?.requestFullscreen();
      } else if ((elem.current as any)?.webkitRequestFullscreen) {
         /* Safari */
         (elem.current as any)?.webkitRequestFullscreen();
      } else if ((elem.current as any)?.msRequestFullscreen) {
         /* IE11 */
         (elem.current as any)?.msRequestFullscreen();
      }
   }

   return (
      <>
         <div ref={elem}>
            <MeetingAttendees meetId={meetingId?.uuid} />

            <div
               style={{
                  background: '#171923',
                  minHeight: '100vh',
                  display: 'flex ',
                  alignItems: 'center',
                  flexDirection: 'column',
               }}
            >
               {/* <RosterAttendee attendeeId={attendee?.attendeeId} /> */}
               {/* <button onClick={createAtendee}>Join</button>
         <button onClick={toggleVideo}>toggle video</button>
       */}
               <ControlBar
                  className='ControlBar'
                  showLabels={false}
                  layout='undocked-horizontal'
               >
                  <ControlBarButton {...microphoneButtonProps} />
                  <AudioOutputControl className='AudioOutputControl' />
                  <ControlBarButton {...cameraButtonProps} />
                  <ControlBarButton {...laptopButtonProps} />
                  <ControlBarButton id='endCall' {...hangUpButtonProps} />
                  <span
                     style={{ width: '50px', cursor: 'pointer' }}
                     onClick={openFullscreen}
                  >
                     <svg
                        viewBox='-1.5 -1.5 18.00 18.00'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                        <g
                           id='SVGRepo_tracerCarrier'
                           stroke-linecap='round'
                           stroke-linejoin='round'
                           stroke='#CCCCCC'
                           stroke-width='0.12'
                        ></g>
                        <g id='SVGRepo_iconCarrier'>
                           {' '}
                           <path
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M2 2.5C2 2.22386 2.22386 2 2.5 2H5.5C5.77614 2 6 2.22386 6 2.5C6 2.77614 5.77614 3 5.5 3H3V5.5C3 5.77614 2.77614 6 2.5 6C2.22386 6 2 5.77614 2 5.5V2.5ZM9 2.5C9 2.22386 9.22386 2 9.5 2H12.5C12.7761 2 13 2.22386 13 2.5V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3H9.5C9.22386 3 9 2.77614 9 2.5ZM2.5 9C2.77614 9 3 9.22386 3 9.5V12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H2.5C2.22386 13 2 12.7761 2 12.5V9.5C2 9.22386 2.22386 9 2.5 9ZM12.5 9C12.7761 9 13 9.22386 13 9.5V12.5C13 12.7761 12.7761 13 12.5 13H9.5C9.22386 13 9 12.7761 9 12.5C9 12.2239 9.22386 12 9.5 12H12V9.5C12 9.22386 12.2239 9 12.5 9Z'
                              fill='#E2E8F0'
                           ></path>{' '}
                        </g>
                     </svg>
                  </span>
               </ControlBar>
            </div>
         </div>

         <div
            style={{
               display: 'flex',
               flexDirection: 'column',
               marginTop: '50px',
            }}
         >
            <button onClick={createMeetingSession}>create meeting</button>

            {meetings.map((meet: any) => (
               <button
                  style={{
                     color: meetingId?.uuid === meet.uuid ? 'green' : 'black',
                  }}
                  onClick={() => setMeetingId(meet)}
               >
                  join to {meet.uuid}
               </button>
            ))}
         </div>
      </>
   );
};
