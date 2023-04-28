import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import {
   MeetingProvider,
   lightTheme,
   GlobalStyles,
   VideoTileGrid,
} from 'amazon-chime-sdk-component-library-react';

export default function App({ Component, pageProps }: AppProps) {
   return (
      <ThemeProvider theme={lightTheme}>
         <GlobalStyles />
         <MeetingProvider>
            <VideoTileGrid noRemoteVideoView={<>No videos</>} />

            <Component {...pageProps} />
         </MeetingProvider>
      </ThemeProvider>
   );
}
