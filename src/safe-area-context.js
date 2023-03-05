import { deviceIdToProps, insetToDeviceId } from './devices';
import { constructDevice } from './utils';

export default function getDeviceWithRNSafeAreaContext() {
  let device;
  let topInset;
  try {
    const {
      insets: { top, left, right },
    } = require('react-native-safe-area-context').initialWindowMetrics;
    topInset = top || left || right;
    device = deviceIdToProps[insetToDeviceId[topInset]];
    if (!device) {
      device = constructDevice(topInset);
    }
  } catch (_) {}

  return device;
}
