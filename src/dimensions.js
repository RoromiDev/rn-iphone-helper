import { deviceIdToProps, insetToDeviceId } from './devices';
import { checkDimensions } from './utils';

export default function getPropsWithDimensions() {
  let topInset;
  if (checkDimensions(390, 844) || checkDimensions(428, 926)) {
    topInset = 47;
  } else if (checkDimensions(360, 780)) {
    topInset = 50;
  } else if (checkDimensions(393, 852) || checkDimensions(430, 932)) {
    topInset = 59;
  }
  const device = deviceIdToProps[insetToDeviceId[topInset]];
  return { device, topInset };
}
