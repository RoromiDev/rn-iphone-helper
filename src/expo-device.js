import { deviceIdToProps } from './devices';

export default function getDeviceWithExpoDevice() {
  const expoModules = global.expo?.modules ?? global.ExpoModules;
  if (expoModules) {
    return deviceIdToProps[expoModules.NativeModulesProxy.modulesConstants.ExpoDevice?.modelId];
  }
  return null;
}
