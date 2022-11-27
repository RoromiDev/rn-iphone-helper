import { Dimensions, Platform, StatusBar } from 'react-native';

import { deviceIdToProps, insetToDeviceId } from './devices';

const isAndroid = Platform.OS === 'android';
const isIphone = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV;

const EMPTY_OBJECT = {};

let topInset = 47;
let device = null;

function checkDimensions(portraitWidth, portraitHeight) {
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

function loadDeviceId() {
  if (isAndroid) return;

  let deviceId;
  try {
    deviceId = require('react-native-device-info').getDeviceId();
    device = deviceIdToProps[deviceId];
  } catch (_) {}

  let expoModules;
  if (!device) {
    expoModules = global.expo?.modules ?? global.ExpoModules;
    if (expoModules) {
      deviceId = expoModules.NativeModulesProxy.modulesConstants.ExpoDevice?.modelId;
      device = deviceIdToProps[deviceId];
    }
  }

  if (!device) {
    try {
      const {
        insets: { top, left, right },
      } = require('react-native-safe-area-context').initialWindowMetrics;
      topInset = top || left || right;
      device = deviceIdToProps[insetToDeviceId[topInset]];
    } catch (_) {}
  }

  if (!device) {
    if (hasDisplayCutout()) {
      if (checkDimensions(390, 844) || checkDimensions(428, 926)) {
        topInset = 47;
      } else if (checkDimensions(360, 780)) {
        topInset = 50;
      } else if (checkDimensions(393, 852) || checkDimensions(430, 932)) {
        topInset = 59;
      } else {
        topInset = 44;
      }
      device = deviceIdToProps[insetToDeviceId[topInset]];
    }
  }

  let warningText = '';
  if (!device) {
    if (!deviceId) {
      warningText = `${expoModules ? 'expo-device' : 'react-native-device-info'} not installed! `;
    }

    warningText += `react-native-safe-area-context not installed or we were unable to match inset of ${topInset}!`;
  }
  if (warningText) console.warn('rn-iphone-helper', warningText);
}

loadDeviceId();

function _hasNotchLegacy() {
  return (
    isIphone &&
    (checkDimension(780) ||
      checkDimension(812) ||
      checkDimension(844) ||
      checkDimension(896) ||
      checkDimension(926))
  );
}

export function hasNotch() {
  if (!device) return _hasNotchLegacy();
  return !!device.hasNotch;
}

function _hasDynamicIslandLegacy() {
  return isIphone && (checkDimension(852) || checkDimension(932));
}

export function hasDynamicIsland() {
  if (!device) return _hasDynamicIslandLegacy();
  return !!device?.hasDynamicIsland;
}

export function hasDisplayCutout() {
  return hasNotch() || hasDynamicIsland();
}

export function getCutoutProps() {
  return device?.cutoutProps || EMPTY_OBJECT;
}

function checkDimension(size) {
  // window is not correct sometimes when screen is correct
  const window = Dimensions.get('window');
  const windowRes = window.width === size || window.height === size;
  const screen = Dimensions.get('screen');
  const screenRes = screen.width === size || screen.height === size;
  return windowRes || screenRes;
}

function _getIphoneTopInset(notchHeightOnly) {
  if (hasNotch() || hasDynamicIsland()) {
    if (device) {
      return notchHeightOnly ? device.notchHeight : device.inset;
    }
    return topInset;
  }
  return 20;
}

export function getTopInset(notchHeightOnly) {
  return Platform.select({
    ios: _getIphoneTopInset(notchHeightOnly),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getBottomInset() {
  return hasDisplayCutout() ? 34 : 0;
}
