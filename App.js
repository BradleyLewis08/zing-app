import 'node-libs-react-native/globals'
import React from 'react';
import Providers from './src/navigation/index'
import Toast from 'react-native-toast-message'
export default function App() {
  return (
    <>
      <Providers />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
