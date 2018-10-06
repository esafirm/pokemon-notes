import React from 'react';
import { Text } from 'react-native';

const Toolbar = () => (
  <Text
    style={{
      fontSize: 22,
      fontWeight: '600',
      padding: 20,
      height: 70,
      borderBottomWidth: 2,
      backgroundColor: '#b2dfdb'
    }}
  >
    Pokemon Notes
  </Text>
);
export default Toolbar;
