import React from 'react';
import { View } from 'react-native';
import Dashboard from './pages';

const App: React.FC = () => {
  return (
    <View style={{backgroundColor: '#E5E5E5', flex: 1}}>
      <Dashboard />
    </View>
  );
}

export default App;