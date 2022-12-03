import { deviceIdToProps, insetToDeviceId } from './devices';
import { constructDevice } from './utils';

export default function getDeviceWithRNSafeAreContext() {
  let device;
  let topInset;
  try {
    const {
      insets: { top, left, right },
    } = require('react-native-safe-area-context').initialWindowMetrics;
    topInset = top || left || right;
    device = deviceIdToProps[insetToDeviceId[topInset]];
  } catch (_) {
    device = constructDevice(topInset);
  }

  return device;
}
