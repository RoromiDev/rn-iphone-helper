import { deviceIdToProps } from './devices';

export default function getDeviceWithExpoDevice() {
  const expoModules = global.expo?.modules;
  if (expoModules) {
    return deviceIdToProps[expoModules.ExpoDevice?.modelId];
  }
  return null;
}
