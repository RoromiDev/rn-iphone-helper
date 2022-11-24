[![npm version](https://badge.fury.io/js/rn-iphone-helper.svg)](https://badge.fury.io/js/rn-iphone-helper)

## Warning breaking changes since in V2:

~~`isIphoneX`~~ -> `hasNotch`

~~`isDynamicIsland`~~ -> `hasDynamicIsland`

~~`ifIphoneX`~~ -> was completely removed


# rn-iphone-helper

A library to help you design your react-native app for iPhones.

**_NOTE:_** Library expects to have `expo-device` or `react-native-device-info` installed. Otherwise will default to legacy mode

## Installing

`yarn add rn-iphone-helper`

or

`npm i rn-iphone-helper --save`

## API

### hasNotch()

**returns** - `true` if iPhone has a notch.

#### Example

```js
import { hasNotch } from 'rn-iphone-helper';

// ...

if (hasNotch()) {
  // do this...
} else {
  // do that...
}
```

### getStatusBarHeight

#### Parameters

**notchHeightOnly** - (boolean) return notch height only or top inset

**returns**

- Android: `StatusBar.currentHeight`
- iOS:
  See [devices.js](./devices.js)

#### Example

```js
// in style.js

import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'rn-iphone-helper';

export default StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    height: 60,
    backgroundColor: 'transparent',
    paddingTop: getStatusBarHeight(),
  },
});
```

### getBottomSpace

**returns** - the height of the bottom to fit the safe area: `34` for iPhone X and `0` for other devices.

#### Example

```js
// in style.js

import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'rn-iphone-helper';

export default StyleSheet.create({
  totalview: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: getBottomSpace(),
  },
});
```

### hasDynamicIsland

**returns** the device whether contains the dynamic island. Specifically, 14 Pro and 14 Pro Max

#### Example

```js
import { hasDynamicIsland } from 'rn-iphone-helper';

// ...

if (hasDynamicIsland()) {
  // do this...
} else {
  // do that...
}
```

## Licence

**MIT**
