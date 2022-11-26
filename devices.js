import { Dimensions } from 'react-native';

const _44_30 = {
  inset: 44,
  notch: 30,
  hasNotch: true,
};

const _48_33 = {
  inset: 48,
  notch: 33,
  hasNotch: true,
};

const _50_37 = {
  inset: 50,
  notch: 37,
  hasNotch: true,
};

const _47_34 = {
  inset: 47,
  notch: 34,
  hasNotch: true,
};

const _47_33 = {
  inset: 47,
  notch: 33,
  hasNotch: true,
};

const _59_47 = {
  inset: 59,
  notch: 47,
  hasDynamicIsland: true,
  cutoutProps: {
    left: Dimensions.get('window').width / 2 - 60,
    top: 12,
    width: 120,
    height: 35,
    radius: 14,
  },
};

export default {
  'iPhone X': _44_30,
  'iPhone XS': _44_30,
  'iPhone XS Max': _44_30,
  'iPhone XR': _48_33,
  'iPhone 11': _48_33,
  'iPhone 11 Pro': _44_30,
  'iPhone 11 Pro Max': _44_30,
  'iPhone 12 mini': _50_37,
  'iPhone 12': _47_34,
  'iPhone 12 Pro': _47_33,
  'iPhone 12 Pro Max': _47_33,
  'iPhone 13 mini': _50_37,
  'iPhone 13': _47_34,
  'iPhone 13 Pro': _47_33,
  'iPhone 13 Pro Max': _47_33,
  'iPhone 14': _47_33,
  'iPhone 14 Plus': _47_33,
  'iPhone 14 Pro': _59_47,
  'iPhone 14 Pro Max': _59_47,
};
