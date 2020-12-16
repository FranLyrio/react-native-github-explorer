import 'react-native-gesture-handler';

import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes/index'

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <View style={{backgroundColor: '#E5E5E5', flex: 1}}>
        <Routes />
      </View>
    </NavigationContainer>
  );
}

export default App;