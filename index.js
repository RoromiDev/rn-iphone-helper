import { Platform, StatusBar } from 'react-native';

import getDeviceWithRNDeviceInfo from './src/device-info';
import getDeviceWithDimensions from './src/dimensions';
import getDeviceWithExpoDevice from './src/expo-device';
import getDeviceWithRNSafeAreContext from './src/safe-area-context';
import { isAndroid } from './src/utils';

const EMPTY_OBJECT = {};

let device = null;

function loadDevice() {
  if (isAndroid) return;

  device = getDeviceWithRNDeviceInfo();

  if (!device) {
    device = getDeviceWithExpoDevice();
  }

  if (!device) {
    device = getDeviceWithRNSafeAreContext();
  }

  if (!device) {
    device = getDeviceWithDimensions();
  }
}

loadDevice();

export function hasNotch() {
  return !!device.hasNotch;
}

export function hasDynamicIsland() {
  return !!device.hasDynamicIsland;
}

export function hasDisplayCutout() {
  return hasNotch() || hasDynamicIsland();
}

export function getCutoutProps() {
  return device.cutoutProps || EMPTY_OBJECT;
}

function _getIphoneTopInset(notchHeightOnly) {
  return notchHeightOnly ? device.notchHeight : device.inset;
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
