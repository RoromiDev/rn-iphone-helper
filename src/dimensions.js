import { deviceIdToProps, insetToDeviceId } from './devices';
import { checkDimensions, constructDevice } from './utils';

export default function getDeviceWithDimensions() {
  let topInset;
  if (checkDimensions(390, 844) || checkDimensions(428, 926)) {
    topInset = 47;
  } else if (checkDimensions(360, 780)) {
    topInset = 50;
  } else if (checkDimensions(393, 852) || checkDimensions(430, 932)) {
    topInset = 59;
  } else {
    topInset = 44;
  }
  let device = deviceIdToProps[insetToDeviceId[topInset]];

  if (!device) {
    device = constructDevice(topInset);
  }

  return device;
}
