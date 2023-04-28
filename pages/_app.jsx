import '@/styles/globals.css';
import { ThemeProvider } from 'styled-components';
import {
   MeetingProvider,
   lightTheme,
   GlobalStyles,
   VideoTileGrid,
} from 'amazon-chime-sdk-component-library-react';

export default function App({ Component, pageProps }) {
   return (
      <ThemeProvider theme={lightTheme}>
         <GlobalStyles />
         <MeetingProvider>
            <VideoTileGrid
               className='videoGrid'
               noRemoteVideoView={<>No videos</>}
            />
            <Component {...pageProps} />
         </MeetingProvider>
      </ThemeProvider>
   );
}
