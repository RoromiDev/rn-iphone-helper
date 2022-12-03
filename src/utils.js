import { Dimensions, Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isIphone = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV;

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

function checkDimension(size) {
  // window is not correct sometimes when screen is correct
  const window = Dimensions.get('window');
  const windowRes = window.width === size || window.height === size;
  const screen = Dimensions.get('screen');
  const screenRes = screen.width === size || screen.height === size;
  return windowRes || screenRes;
}

function hasNotchLegacy() {
  return (
    isIphone &&
    (checkDimension(780) ||
      checkDimension(812) ||
      checkDimension(844) ||
      checkDimension(896) ||
      checkDimension(926))
  );
}

function hasDynamicIslandLegacy() {
  return isIphone && (checkDimension(852) || checkDimension(932));
}

export function constructDevice(inset) {
  return {
    inset,
    cutoutEnd: inset,
    hasNotch: hasNotchLegacy(),
    hasDynamicIsland: hasDynamicIslandLegacy(),
  };
}
