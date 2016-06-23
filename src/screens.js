import { Navigation } from 'react-native-navigation';
import MainScreen from './MainScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('com.flashcards.MainScreen', () => MainScreen, store, Provider);
}
