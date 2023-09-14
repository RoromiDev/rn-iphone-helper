import { Dimensions } from 'react-native';

const _44_30 = {
  inset: 44,
  cutoutEnd: 30,
  hasNotch: true,
};

const _48_33 = {
  inset: 48,
  cutoutEnd: 33,
  hasNotch: true,
};

const _50_37 = {
  inset: 50,
  cutoutEnd: 37,
  hasNotch: true,
};

const _47_34 = {
  inset: 47,
  cutoutEnd: 34,
  hasNotch: true,
};

const _47_33 = {
  inset: 47,
  cutoutEnd: 33,
  hasNotch: true,
};

const _59_47 = {
  inset: 59,
  cutoutEnd: 47,
  hasDynamicIsland: true,
  cutoutProps: {
    left: Dimensions.get('window').width / 2 - 62.5,
    top: 12,
    width: 125,
    height: 35,
    radius: 18,
  },
};

export const deviceIdToProps = {
  'iPhone10,3': _44_30, // iPhone X
  'iPhone10,6': _44_30, // iPhone X
  'iPhone11,2': _44_30, // iPhone Xs
  'iPhone11,4': _44_30, // iPhone Xs Max
  'iPhone11,6': _44_30, // iPhone Xs Max
  'iPhone11,8': _48_33, // iPhone Xr
  'iPhone12,1': _48_33, // iPhone 11
  'iPhone12,3': _44_30, // iPhone 11 Pro
  'iPhone12,5': _44_30, // iPhone 11 Pro Max
  'iPhone13,1': _50_37, // iPhone 12 mini
  'iPhone13,2': _47_34, // iPhone 12
  'iPhone13,3': _47_33, // iPhone 12 Pro
  'iPhone13,4': _47_33, // iPhone 12 Pro Max
  'iPhone14,4': _50_37, // iPhone 13 mini
  'iPhone14,5': _47_34, // iPhone 13
  'iPhone14,2': _47_33, // iPhone 13 Pro
  'iPhone14,3': _47_33, // iPhone 13 Pro Max
  'iPhone14,7': _47_33, // iPhone 14
  'iPhone14,8': _47_33, // iPhone 14 Plus
  'iPhone15,2': _59_47, // iPhone 14 Pro
  'iPhone15,3': _59_47, // iPhone 14 Pro Max
  'iPhone15,4': _59_47, // iPhone 15
  'iPhone15,5': _59_47, // iPhone 15 Plus
  'iPhone16,1': _59_47, // iPhone 15 Pro
  'iPhone16,2': _59_47, // iPhone 15 Pro Max
};

export const insetToDeviceId = {
  59: 'iPhone15,2',
  47: 'iPhone13,3',
  50: 'iPhone13,1',
  44: 'iPhone10,3',
  48: 'iPhone11,8',
};
