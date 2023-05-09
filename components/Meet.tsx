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
import { MeetingAttendees } from './MeetingAttendees';
import { Tooltip } from '@chakra-ui/react';
import { useLocalAudioOutput } from 'amazon-chime-sdk-component-library-react';

export const Meet = () => {
   const meetingManager = useMeetingManager();
   const [meetingId, setMeetingId] = useState<any>();
   const [attendee, setAttendee] = useState<any>();
   const { toggleVideo } = useLocalVideo();
   const [meetings, setmeetings] = useState<any>([]);
   const { toggleContentShare } = useContentShareControls();
   const { muted, toggleMute } = useToggleLocalMute();
   const { toggleAudio } = useLocalAudioOutput();
   const [isFullScreen, setisFullScreen] = useState(false);

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

   const elem = useRef(null);

   function closeFullscreen() {
      if ((document as any).exitFullscreen) {
         (document as any).exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
         /* Safari */
         (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
         /* IE11 */
         (document as any).msExitFullscreen();
      }
      setisFullScreen(false);
   }

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
      setisFullScreen(true);
   }

   return (
      <>
         <div
            ref={elem}
            className='bg-[#171923] h-screen flex flex-col justify-between'
         >
            <MeetingAttendees meetId={meetingId?.uuid} />

            <div className='flex flex-col items-center'>
               <ControlBar
                  className='ControlBar flex gap-3 w-full'
                  showLabels={false}
                  layout='undocked-horizontal'
               >
                  <Tooltip label='End call'>
                     <button
                        onClick={() => meetingManager.leave()}
                        className='w-12 h-12 hover:bg-opacity-70 transition-all duration-500 flex justify-center items-center rounded-lg text-white bg-[#c53030]'
                     >
                        <svg
                           width='14'
                           height='14'
                           viewBox='0 0 14 14'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              d='M9.94301 4.11934L11.2763 2.78601M11.2763 2.78601L12.6097 1.45268M11.2763 2.78601L9.94301 1.45268M11.2763 2.78601L12.6097 4.11934M2.6097 0.786011C1.87332 0.786011 1.27637 1.38296 1.27637 2.11934V2.78601C1.27637 8.30886 5.75352 12.786 11.2764 12.786H11.943C12.6794 12.786 13.2764 12.1891 13.2764 11.4527V9.26652C13.2764 8.97956 13.0927 8.7248 12.8205 8.63406L9.82489 7.63552C9.51015 7.53061 9.16616 7.67309 9.01779 7.96983L8.26537 9.47467C6.63555 8.73984 5.32253 7.42682 4.5877 5.79701L6.09255 5.04459C6.38929 4.89622 6.53177 4.55223 6.42686 4.23749L5.42832 1.24186C5.33757 0.969631 5.08281 0.786011 4.79586 0.786011H2.6097Z'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                           />
                        </svg>
                     </button>
                  </Tooltip>

                  <Tooltip label='toggle video'>
                     <button
                        onClick={() => {
                           setCameraActive(!cameraActive);
                           toggleVideo();
                        }}
                        className='w-12 h-12 hover:bg-opacity-70 transition-all duration-500 flex justify-center items-center rounded-lg text-[#171923] bg-[#e2e8f0]'
                     >
                        {cameraActive ? (
                           <svg
                              width='14'
                              height='10'
                              viewBox='0 0 14 10'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 d='M9.27637 3.45268L12.3116 1.93508C12.7548 1.71345 13.2764 2.03578 13.2764 2.53137V7.04065C13.2764 7.53624 12.7548 7.85857 12.3116 7.63694L9.27637 6.11934M2.6097 8.78601H7.94303C8.67941 8.78601 9.27637 8.18906 9.27637 7.45268V2.11934C9.27637 1.38296 8.67941 0.786011 7.94303 0.786011H2.6097C1.87332 0.786011 1.27637 1.38296 1.27637 2.11934V7.45268C1.27637 8.18906 1.87332 8.78601 2.6097 8.78601Z'
                                 stroke='#718096'
                                 stroke-width='1.2'
                                 stroke-linecap='round'
                                 stroke-linejoin='round'
                              />
                           </svg>
                        ) : (
                           <svg
                              width='14'
                              height='10'
                              viewBox='0 0 14 10'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 d='M9.27637 3.45268L12.3116 1.93508C12.7548 1.71345 13.2764 2.03578 13.2764 2.53137V7.04065C13.2764 7.53624 12.7548 7.85857 12.3116 7.63694L9.27637 6.11934M2.6097 8.78601H7.94303C8.67941 8.78601 9.27637 8.18906 9.27637 7.45268V2.11934C9.27637 1.38296 8.67941 0.786011 7.94303 0.786011H2.6097C1.87332 0.786011 1.27637 1.38296 1.27637 2.11934V7.45268C1.27637 8.18906 1.87332 8.78601 2.6097 8.78601Z'
                                 stroke='#718096'
                                 stroke-width='1.2'
                                 stroke-linecap='round'
                                 stroke-linejoin='round'
                              />
                           </svg>
                        )}
                     </button>
                  </Tooltip>

                  <Tooltip label='toggle mic'>
                     <button
                        onClick={() => {
                           toggleMute();
                        }}
                        className='w-12 h-12 hover:bg-opacity-70 transition-all duration-500 flex justify-center items-center rounded-lg text-[#171923] bg-[#e2e8f0]'
                     >
                        {muted ? (
                           <svg
                              width='17'
                              height='17'
                              viewBox='0 0 17 17'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <g clip-path='url(#clip0_1729_19523)'>
                                 <path
                                    d='M12.9427 8.11934C12.9427 10.6967 10.8534 12.786 8.27604 12.786M8.27604 12.786C5.69871 12.786 3.60938 10.6967 3.60938 8.11934M8.27604 12.786V15.4527M8.27604 15.4527H5.60938M8.27604 15.4527H10.9427M8.27604 10.1193C7.17147 10.1193 6.27604 9.22391 6.27604 8.11934V4.11934C6.27604 3.01477 7.17147 2.11934 8.27604 2.11934C9.38061 2.11934 10.276 3.01477 10.276 4.11934V8.11934C10.276 9.22391 9.38061 10.1193 8.27604 10.1193Z'
                                    stroke='#718096'
                                    stroke-width='1.2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                 />
                              </g>
                              <defs>
                                 <clipPath id='clip0_1729_19523'>
                                    <rect
                                       width='16'
                                       height='16'
                                       fill='white'
                                       transform='translate(0.276367 0.786011)'
                                    />
                                 </clipPath>
                              </defs>
                           </svg>
                        ) : (
                           <svg
                              width='17'
                              height='17'
                              viewBox='0 0 17 17'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <g clip-path='url(#clip0_1729_19523)'>
                                 <path
                                    d='M12.9427 8.11934C12.9427 10.6967 10.8534 12.786 8.27604 12.786M8.27604 12.786C5.69871 12.786 3.60938 10.6967 3.60938 8.11934M8.27604 12.786V15.4527M8.27604 15.4527H5.60938M8.27604 15.4527H10.9427M8.27604 10.1193C7.17147 10.1193 6.27604 9.22391 6.27604 8.11934V4.11934C6.27604 3.01477 7.17147 2.11934 8.27604 2.11934C9.38061 2.11934 10.276 3.01477 10.276 4.11934V8.11934C10.276 9.22391 9.38061 10.1193 8.27604 10.1193Z'
                                    stroke='#718096'
                                    stroke-width='1.2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                 />
                              </g>
                              <defs>
                                 <clipPath id='clip0_1729_19523'>
                                    <rect
                                       width='16'
                                       height='16'
                                       fill='white'
                                       transform='translate(0.276367 0.786011)'
                                    />
                                 </clipPath>
                              </defs>
                           </svg>
                        )}{' '}
                     </button>
                  </Tooltip>

                  <Tooltip label='toggle mic'>
                     <button
                        onClick={() => {
                           toggleContentShare();
                        }}
                        className='w-12 h-12 flex-1 hover:bg-opacity-70 transition-all duration-500 flex justify-center items-center rounded-lg text-[#171923] bg-[#e2e8f0]'
                     >
                        <svg
                           width='13'
                           height='13'
                           viewBox='0 0 13 13'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              d='M11.6094 4.11935L11.6094 3.45268C11.6094 2.34811 10.7139 1.45268 9.60937 1.45268L2.94271 1.45268C1.83814 1.45268 0.942708 2.34811 0.942708 3.45268L0.942708 4.11935M3.60937 6.78602L6.27604 4.11935M6.27604 4.11935L8.94271 6.78602M6.27604 4.11935L6.27604 12.1193'
                              stroke='#718096'
                              stroke-width='1.2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                           />
                        </svg>
                     </button>
                  </Tooltip>

                  {/* <AudioOutputControl className='AudioOutputControl ' /> */}
                  {/* <Tooltip label='toggle audio'>
                     <button
                        className='w-12 h-12 hover:bg-opacity-70 transition-all duration-500 rounded-lg flex justify-center items-center bg-[#4A5568]'
                        onClick={openFullscreen}
                     >
                        <svg
                           width='14'
                           height='14'
                           viewBox='0 0 14 14'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              d='M8.49612 0.786011H12.4961V4.78601'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                           />
                           <path
                              d='M4.99998 12.814L1 12.814L1 8.81403'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                           />
                           <path
                              d='M12.4961 8.77639L12.4961 12.7764L8.49609 12.7764'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                           />
                           <path
                              d='M1 5.01664L1 1.01666L5 1.01666'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                           />
                        </svg>
                     </button>
                  </Tooltip> */}
                  <Tooltip label='full screen'>
                     <button
                        className='w-12 h-12 hover:bg-opacity-70 transition-all duration-500 rounded-lg flex justify-center items-center bg-[#4A5568]'
                        onClick={
                           isFullScreen
                              ? () => closeFullscreen()
                              : () => openFullscreen()
                        }
                     >
                        <svg
                           width='14'
                           height='14'
                           viewBox='0 0 14 14'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              d='M8.49612 0.786011H12.4961V4.78601'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                           />
                           <path
                              d='M4.99998 12.814L1 12.814L1 8.81403'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                           />
                           <path
                              d='M12.4961 8.77639L12.4961 12.7764L8.49609 12.7764'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                           />
                           <path
                              d='M1 5.01664L1 1.01666L5 1.01666'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                           />
                        </svg>
                     </button>
                  </Tooltip>
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
