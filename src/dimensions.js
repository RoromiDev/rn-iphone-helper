import { deviceIdToProps, insetToDeviceId } from './devices';
import { getTopInsetLegacy, constructDevice } from './utils';

export default function getDeviceWithDimensions() {
  const topInset = getTopInsetLegacy();
  let device = deviceIdToProps[insetToDeviceId[topInset]];

  if (!device) {
    device = constructDevice(topInset);
  }

  return device;
}
