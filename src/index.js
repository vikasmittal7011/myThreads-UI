import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { RecoilRoot } from 'recoil';
import SocketContextProvider from './context/SocketContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const styles = {
  global: props => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props),
    },
  }),
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: '#616161',
    dark: '#1e1e1e',
  },
};

const theme = extendTheme({ config, styles, colors });

root.render(
  <ChakraProvider theme={theme}>
    <RecoilRoot>
      <BrowserRouter>
        <ColorModeScript />
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </BrowserRouter>
    </RecoilRoot>
  </ChakraProvider>
);
