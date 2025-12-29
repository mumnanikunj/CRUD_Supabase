import { StyleSheet} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import { RootStackParamList } from './navigation';
import SpalshScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
        initialRouteName={"BottomTabNavigation"}
        screenOptions={{
          headerShown:false,
          animation: 'fade',
          // presentation: 'card', 
        }}
      >
        <Stack.Screen name={"SpalshScreen"} component={SpalshScreen} />
        <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
      </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})