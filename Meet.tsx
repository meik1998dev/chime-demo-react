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
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { useEffect, useState } from 'react';

export const Meet = () => {
   const meetingManager = useMeetingManager();
   const [meetingId, setMeetingId] = useState<any>();
   const [attendee, setAttendee] = useState<any>();
   const { toggleVideo } = useLocalVideo();
   const [meetings, setmeetings] = useState<any>([]);
   const { toggleContentShare } = useContentShareControls();

   const joinMeeting = async () => {
      const meetingSessionConfiguration = new MeetingSessionConfiguration(
         meetingId,
         attendee,
      );

      // const options = {
      //    deviceLabels: DeviceLabels.AudioAndVideo,
      // };

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

   return (
      <div style={{ minHeight: '100vh' }}>
         {/* <RosterAttendee attendeeId={attendee?.attendeeId} /> */}
         <button onClick={createAtendee}>Join</button>
         <button onClick={toggleVideo}>toggle video</button>
         <button onClick={createMeetingSession}>create meeting</button>
         <ContentShare />
         <button onClick={() => toggleContentShare()}>
            Toggle content share
         </button>
         <div>
            Meetings list
            {meetings.map((meet: any) => (
               <div onClick={() => setMeetingId(meet)}>{meet.uuid}</div>
            ))}
         </div>
      </div>
   );
};
