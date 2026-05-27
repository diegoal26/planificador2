import 'react-native-gesture-handler'
import React from 'react';
import AppProvider from './components/AppProvider';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config"

function App(): React.JSX.Element {

  return (
    <>
      <GluestackUIProvider config={config}>
        <AppProvider/>
      </GluestackUIProvider>
    </>
  );
}

export default App;