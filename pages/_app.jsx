import '@/styles/globals.css';
import { ThemeProvider } from 'styled-components';
import {
   MeetingProvider,
   lightTheme,
   GlobalStyles,
   VideoTileGrid,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingAttendees } from '../components/MeetingAttendees';
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }) {
   return (
      <ThemeProvider theme={lightTheme}>
         <GlobalStyles />
         <ChakraProvider>
            <MeetingProvider>
               <Component {...pageProps} />
            </MeetingProvider>
         </ChakraProvider>
      </ThemeProvider>
   );
}
