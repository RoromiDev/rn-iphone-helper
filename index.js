import { Platform, StatusBar } from 'react-native';

import getDeviceWithRNDeviceInfo from './src/device-info';
import getPropsWithDimensions from './src/dimensions';
import getDeviceWithExpoDevice from './src/expo-device';
import getPropsWithRNSafeAreContext from './src/safe-area-context';
import { checkDimension } from './src/utils';

const isAndroid = Platform.OS === 'android';
const isIphone = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV;

const EMPTY_OBJECT = {};

let topInset = 44;
let device = null;

function loadDevice() {
  if (isAndroid) return;

  device = getDeviceWithRNDeviceInfo();

  if (!device) {
    device = getDeviceWithExpoDevice();
  }

  if (!device) {
    const deviceProps = getPropsWithRNSafeAreContext();
    device = deviceProps.device;
    topInset = deviceProps.topInset;
  }

  if (!device) {
    if (hasDisplayCutout()) {
      const deviceProps = getPropsWithDimensions();
      device = deviceProps.device;
      topInset = deviceProps.topInset;
    }
  }
}

loadDevice();

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
