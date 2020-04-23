import React, { useState } from 'react';
import Home from './src/screens/Home';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
// import * as SplashScreen from 'expo-splash-screen';

// const getFonts = () => Font.loadAsync({
//   'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
//   'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
// });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  //
  // if (fontsLoaded) {
    return (
      <Home />
    );
  // } else {
  //   return (
  //     <AppLoading
  //       startAsync={getFonts}
  //       onFinish={() => setFontsLoaded(true)}
  //     />
  //   )
  // }

}
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
//
// import LoadingScreen from "./src/screens/LoadingScreen";
// import Home from "./src/screens/Home";
//
// export default createAppContainer(
//     createSwitchNavigator({
//         LoadingScreen,
//         Home
//     })
// );
