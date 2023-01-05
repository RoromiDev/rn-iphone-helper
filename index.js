import { StatusBar } from 'react-native';

import getDeviceWithRNDeviceInfo from './src/device-info';
import getDeviceWithDimensions from './src/dimensions';
import getDeviceWithExpoDevice from './src/expo-device';
import getDeviceWithRNSafeAreaContext from './src/safe-area-context';
import { isAndroid, isIphone } from './src/utils';

const EMPTY_OBJECT = {};

let device = null;

function loadDevice() {
  if (!isIphone) return;

  device = getDeviceWithRNDeviceInfo();

  if (!device) {
    device = getDeviceWithExpoDevice();
  }

  if (!device) {
    device = getDeviceWithRNSafeAreaContext();
  }

  if (!device) {
    device = getDeviceWithDimensions();
  }
}

loadDevice();

export function hasNotch() {
  if (!isIphone) return false;
  return !!device.hasNotch;
}

export function hasDynamicIsland() {
  if (!isIphone) return false;
  return !!device.hasDynamicIsland;
}

export function hasDisplayCutout() {
  return hasNotch() || hasDynamicIsland();
}

export function getCutoutProps() {
  if (!isIphone) return EMPTY_OBJECT;
  return device.cutoutProps || EMPTY_OBJECT;
}

function _getIphoneTopInset(cutoutEnd) {
  return cutoutEnd ? device.cutoutEnd : device.inset;
}

export function getTopInset(cutoutEnd) {
  if (isIphone) return _getIphoneTopInset(cutoutEnd);
  else if (isAndroid) return StatusBar.currentHeight;
  return 0;
}

export function getBottomInset() {
  return hasDisplayCutout() ? 34 : 0;
}
