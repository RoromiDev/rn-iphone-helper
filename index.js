import { Dimensions, Platform, StatusBar } from 'react-native';

import { deviceIdToProps, insetToDeviceId } from './devices';

const EMPTY_OBJECT = {};

let device = null;
function loadDeviceId() {
  if (Platform.OS === 'android') return;

  try {
    device = deviceIdToProps[require('react-native-device-info').getDeviceId()];
  } catch (_) {}

  let expoModules;
  if (!device) {
    expoModules = global.expo?.modules ?? global.ExpoModules;
    if (expoModules) {
      device = deviceIdToProps[expoModules.NativeModulesProxy.modulesConstants.ExpoDevice?.modelId];
    }
  }

  if (!device) {
    try {
      const {
        insets: { top, left, right },
      } = require('react-native-safe-area-context').initialWindowMetrics;
      device = deviceIdToProps[insetToDeviceId[top || left || right]];
    } catch (_) {}
  }

  if (!device) {
    console.warn(
      'rn-iphone-helper',
      `${
        expoModules ? 'expo-device' : 'react-native-device-info'
      } or react-native-safe-area-context not installed or device not found! Defaulting all iPhone with display cutout top inset to 47`
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
  if (!device) {
    return _hasNotchLegacy();
  }
  return !!device.hasNotch;
}

export function hasDynamicIsland() {
  return !!device?.hasDynamicIsland;
}

export function hasDisplayCutout() {
  return hasNotch() || hasDynamicIsland();
}

export function getCutoutProps() {
  return device?.cutoutProps || EMPTY_OBJECT;
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
    if (device) {
      return notchHeightOnly ? device.notchHeight : device.inset;
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
