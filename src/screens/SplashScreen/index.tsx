import {  Text, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import { supabase } from '../../lib/supabase';



const SplashScreen = ({navigation }: any) => {
   
  useEffect(() => {
    const init = async () => {
      await new Promise(r => setTimeout(r, 1500));

      const session = supabase.auth.getUser();
      console.log("session",session)

      if (session?.user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabNavigation' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthNavigator' }],
        });
      }
    };

    init();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen

