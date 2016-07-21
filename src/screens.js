import { Navigation } from 'react-native-navigation';
import MainScreen from './MainScreen';
import AddFlashCardScreen from './AddFlashCardScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('com.flashcards.AddFlashCardScreen', () => AddFlashCardScreen, store, Provider);
  Navigation.registerComponent('com.flashcards.MainScreen', () => MainScreen, store, Provider);
}
