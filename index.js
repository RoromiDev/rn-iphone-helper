import { Dimensions, Platform, StatusBar } from 'react-native';

import devices from './devices';

let modelName = null;

function loadDeviceId() {
  try {
    modelName = require('react-native-device-info').getModel();
    return;
  } catch (_) {}

  const expoModules = global.expo?.modules ?? global.ExpoModules;

  if (expoModules) {
    modelName = expoModules.NativeModulesProxy.modulesConstants.ExpoDevice?.modelName;
  }

  if (!modelName) {
    console.warn(
      'rn-iphone-helper',
      `${
        expoModules ? 'expo-device' : 'react-native-device-info'
      } not installed defaulting all notched iPhone statusBarHeight to 47`
    );
  }
}

loadDeviceId();

function _hasNotchLegacy() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (checkDemension(780) ||
      checkDemension(812) ||
      checkDemension(844) ||
      checkDemension(896) ||
      checkDemension(926) ||
      checkDemension(852) ||
      checkDemension(932))
  );
}

export function hasNotch() {
  const device = devices[modelName];
  if (!device) {
    return _hasNotchLegacy();
  }
  return !!device.hasNotch;
}

export function hasDynamicIsland() {
  return !!devices[modelName]?.hasDynamicIsland;
}

export function hasDisplayCutout() {
  return hasNotch() || hasDynamicIsland();
}

const checkDemension = (size) => {
  // window is not correct sometimes when screen is correct
  const window = Dimensions.get('window');
  const windowRes = window.width === size || window.height === size;
  const screen = Dimensions.get('screen');
  const screenRes = screen.width === size || screen.height === size;
  return windowRes || screenRes;
};

const _getIphoneTopInset = (notchHeightOnly) => {
  if (hasNotch() || hasDynamicIsland()) {
    const device = devices[modelName];
    if (devices[modelName]) {
      return notchHeightOnly ? device.notch : device.inset;
    }
    return 47;
  }
  return 20;
};

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
