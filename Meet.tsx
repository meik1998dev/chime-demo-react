import {
   DeviceLabels,
   LocalVideo,
   MeetingStatus,
   RemoteVideos,
   useLocalVideo,
   useMeetingManager,
   RosterAttendee,
   useContentShareControls,
   ContentShare,
   ControlBar,
   Laptop,
   ControlBarButton,
   Camera,
   Dialer,
   Microphone,
   Phone,
   Sound,
   useAudioOutputs,
   WithTooltip,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { useEffect, useState } from 'react';
import { useToggleLocalMute } from 'amazon-chime-sdk-component-library-react';
import { AudioOutputControl } from 'amazon-chime-sdk-component-library-react';

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

      setAttendee(data.data.attend);
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

   return (
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
            // showLabels
            layout='undocked-horizontal'
         >
            <ControlBarButton {...microphoneButtonProps} />
            <AudioOutputControl className='AudioOutputControl' />
            <ControlBarButton {...cameraButtonProps} />
            <ControlBarButton {...laptopButtonProps} />
            <ControlBarButton id='endCall' {...hangUpButtonProps} />
         </ControlBar>
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
      </div>
   );
};
