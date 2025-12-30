import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOnlineStatus } from '../Redux/slices/networkSlice';

const NetworkListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        dispatch(setOnlineStatus(false));
        return;
      }

      if (
        state.isConnected === true &&
        state.isInternetReachable === false
      ) {
        dispatch(setOnlineStatus(false));
        return;
      }

      if (
        state.isConnected === true &&
        state.isInternetReachable === true
      ) {
        dispatch(setOnlineStatus(true));
      }
    });

    return unsubscribe;
  }, []);

  return null;
};

export default NetworkListener;
