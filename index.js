import { Platform, StatusBar } from 'react-native';

import getDeviceWithRNDeviceInfo from './src/device-info';
import getPropsWithDimensions from './src/dimensions';
import getDeviceWithExpoDevice from './src/expo-device';
import getPropsWithRNSafeAreContext from './src/safe-area-context';
import { hasNotchLegacy, hasDynamicIslandLegacy, isAndroid } from './src/utils';

const EMPTY_OBJECT = {};

let topInset = 47;
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

export function hasNotch() {
  if (!device) return hasNotchLegacy();
  return !!device.hasNotch;
}

export function hasDynamicIsland() {
  if (!device) return hasDynamicIslandLegacy();
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
