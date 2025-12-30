import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/Redux/store'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ThemedApp from './src/utils/ThemedApp'
import NetworkListener from './src/utils/useNetwork'




const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
           <NetworkListener />
            <ThemedApp />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App