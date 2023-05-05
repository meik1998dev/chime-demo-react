import '@/styles/globals.css';
import { ThemeProvider } from 'styled-components';
import {
   MeetingProvider,
   lightTheme,
   GlobalStyles,
   VideoTileGrid,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingAttendees } from '../MeetingAttendees';

export default function App({ Component, pageProps }) {
   return (
      <ThemeProvider theme={lightTheme}>
         <GlobalStyles />
         <MeetingProvider>
            <MeetingAttendees />
            <Component {...pageProps} />
         </MeetingProvider>
      </ThemeProvider>
   );
}
