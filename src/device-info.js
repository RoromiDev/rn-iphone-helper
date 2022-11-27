import { deviceIdToProps } from './devices';

export default function getDeviceWithRNDeviceInfo() {
  let device;
  try {
    device = deviceIdToProps[require('react-native-device-info').getDeviceId()];
  } catch (_) {}
  return device;
}
