import { Dimensions, Platform, StatusBar } from 'react-native';

import { deviceIdToProps, insetToDeviceId } from './devices';

const isAndroid = Platform.OS === 'android';
const isIphone = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV;

const EMPTY_OBJECT = {};

let topInset = 47;
let device = null;

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
    return topInset;
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
