import { deviceIdToProps, insetToDeviceId } from './devices';

export default function getPropsWithRNSafeAreContext() {
  let device;
  let topInset;
  try {
    const {
      insets: { top, left, right },
    } = require('react-native-safe-area-context').initialWindowMetrics;
    topInset = top || left || right;
    device = deviceIdToProps[insetToDeviceId[topInset]];
  } catch (_) {}
  return { device, topInset };
}
