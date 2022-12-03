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

export function getTopInsetLegacy() {
  let topInset;
  if (checkDimensions(390, 844) || checkDimensions(428, 926)) {
    topInset = 47;
  } else if (checkDimensions(360, 780)) {
    topInset = 50;
  } else if (checkDimensions(393, 852) || checkDimensions(430, 932)) {
    topInset = 59;
  } else if (checkDimensions(375, 812) || checkDimensions(414, 896)) {
    topInset = 44;
  } else {
    topInset = 20;
  }
  return topInset;
}

function hasNotchLegacy() {
  return isIphone && getTopInsetLegacy() !== 59 && getTopInsetLegacy() !== 20;
}

function hasDynamicIslandLegacy() {
  return isIphone && getTopInsetLegacy() === 59;
}

export function constructDevice(inset) {
  return {
    inset,
    cutoutEnd: inset,
    hasNotch: hasNotchLegacy(),
    hasDynamicIsland: hasDynamicIslandLegacy(),
  };
}
