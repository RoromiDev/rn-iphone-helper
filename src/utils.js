import { Dimensions } from 'react-native';

export function checkDimensions(portraitWidth, portraitHeight) {
  const window = Dimensions.get('window');
  const windowRes =
    (window.height === portraitHeight && window.width === portraitWidth) ||
    (window.width === portraitHeight && window.height === portraitWidth);

  const screen = Dimensions.get('screen');
  const screenRes =
    (screen.height === portraitHeight && screen.width === portraitWidth) ||
    (screen.width === portraitHeight && screen.height === portraitWidth);

  return windowRes || screenRes;
}

export function checkDimension(size) {
  // window is not correct sometimes when screen is correct
  const window = Dimensions.get('window');
  const windowRes = window.width === size || window.height === size;
  const screen = Dimensions.get('screen');
  const screenRes = screen.width === size || screen.height === size;
  return windowRes || screenRes;
}
