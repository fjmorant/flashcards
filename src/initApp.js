import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

export default () => {
  registerScreens();

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'com.flashcards.MainScreen',
    },
    animationType: 'slide-down',
  });
};
