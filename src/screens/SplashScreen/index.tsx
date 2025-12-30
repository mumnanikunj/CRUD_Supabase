import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import { supabase } from '../../lib/supabase';
import { getUserFromLocal, saveUserProfile, saveUserToLocal } from '../../utils/userStorage';



const SplashScreen = ({ navigation }: any) => {

  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const localUser = await getUserFromLocal();
      if (localUser) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabNavigation' }],
        });
        return;
      }


      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthNavigator' }],
        });
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await saveUserProfile({
          id: user.id,
          email: user.email ?? '',
          created_at: user.created_at,
          name: user.user_metadata?.name ?? '',
        });
        await saveUserToLocal(user)
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabNavigation' }],
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

