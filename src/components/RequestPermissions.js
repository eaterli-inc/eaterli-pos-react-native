import React, {useEffect, useState} from 'react';
import {BackHandler, Linking, View} from 'react-native';

import {requestLocationPermission} from '../helpers/location.helper';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Button from './Button';
import Text from './Text';

function RequestPermissions() {
  const [message, setMessage] = useState('');
  const {width, height} = useWindowDimensions();
  useEffect(() => {
    getPermission();
  }, []);
  const getPermission = async () => {
    let granted = await requestLocationPermission().catch(console.log);
    if (!granted) {
      setMessage('This App need Location permission.');
    }
  };

  if (!message) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        width: width,
        height: height,
        top: 0,
        bottom: 0,
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 30,
          paddingVertical: 30,
          borderRadius: 20,
          minWidth: 200,
          alignItems: 'center',
        }}>
        <Text color="#212121" medium mb={20} size={14}>
          {message}
        </Text>
        <Button
          onPress={() => {
            BackHandler.exitApp();
            Linking.openSettings();
          }}>
          Give permission
        </Button>
      </View>
    </View>
  );
}

export default RequestPermissions;
