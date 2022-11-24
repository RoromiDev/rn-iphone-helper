import { Dimensions, Platform, StatusBar } from 'react-native';

let deviceId = null;

async function loadDeviceId() {
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

export function isIphoneX() {
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

export function isDynamicIsland() {
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS;
}

const checkDemension = (size) => {
  // window is not correct sometimes when screen is correct
  const window = Dimensions.get('window');
  const windowRes = window.width === size || window.height === size;
  const screen = Dimensions.get('screen');
  const screenRes = screen.width === size || screen.height === size;
  return windowRes || screenRes;
};

const _getIphoneStatusBarHeight = () => {
  if (isIphoneX()) {
    return 47;
  }
  return 20;
};

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight() {
  return Platform.select({
    ios: _getIphoneStatusBarHeight(),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
