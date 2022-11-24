import { Dimensions, Platform, StatusBar } from 'react-native';

import devices from './devices';

let deviceId = null;

function loadDeviceId() {
  try {
    deviceId = require('react-native-device-info').getDeviceId();
    return;
  } catch (_) {}

  const expoModules = global.expo?.modules ?? global.ExpoModules;

  if (expoModules) {
    deviceId = expoModules.NativeModulesProxy.modulesConstants.ExpoDevice?.modelId;
  }

  if (!deviceId) {
    console.warn(
      'rn-iphone-helper',
      `${
        expoModules ? 'expo-device' : 'react-native-device-info'
      } not installed defaulting all notched iPhone statusBarHeight to 47`
    );
  }
}

loadDeviceId();

function hasNotchLegacy() {
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
  if (!deviceId) {
    return hasNotchLegacy();
  }

  return !!devices[deviceId]?.hasNotch;
}

const checkDemension = (size) => {
  // window is not correct sometimes when screen is correct
  const window = Dimensions.get('window');
  const windowRes = window.width === size || window.height === size;
  const screen = Dimensions.get('screen');
  const screenRes = screen.width === size || screen.height === size;
  return windowRes || screenRes;
};

export function hasDynamicIsland() {
  return !!devices[deviceId]?.hasDynamicIsland;
}

const _getIphoneStatusBarHeight = (notchHeightOnly) => {
  if (hasNotch() || hasDynamicIsland()) {
    const device = devices[deviceId];
    if (devices[deviceId]) {
      return notchHeightOnly ? device.notch : device.inset;
    }
    return 47;
  }
  return 20;
};

export function getStatusBarHeight(notchHeightOnly) {
  return Platform.select({
    ios: _getIphoneStatusBarHeight(notchHeightOnly),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getBottomSpace() {
  return hasNotch() ? 34 : 0;
}
