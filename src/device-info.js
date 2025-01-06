import { deviceIdToProps } from './devices';
import { getDeviceId } from 'react-native-device-info';

export default function getDeviceWithRNDeviceInfo() {
  let device;
  try {
    device = deviceIdToProps[getDeviceId()];
  } catch (_) {}
  return device;
}
