import { StyleSheet} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import { RootStackParamList } from './navigation';
import SpalshScreen from '../screens/SplashScreen';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
        initialRouteName={"SpalshScreen"}
        screenOptions={{
          headerShown:false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name={"SpalshScreen"} component={SpalshScreen} />
        <Stack.Screen name={"AuthNavigator"} component={AuthNavigator} />
        <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
      </Stack.Navigator>
  )
}

export default StackNavigation
