[![npm version](https://badge.fury.io/js/rn-iphone-helper.svg)](https://badge.fury.io/js/rn-iphone-helper)

## Warning breaking changes in V2:

~~`getStatusBarHeight`~~ -> `getTopInset`

~~`getBottomSpace`~~ -> `getBottomInset`

~~`isIphoneX`~~ -> `hasNotch`

~~`isDynamicIsland`~~ -> `hasDynamicIsland`

~~`ifIphoneX`~~ -> was completely removed

# rn-iphone-helper

A library to help you design your react-native app for iPhones.

**_NOTE:_** Library expects to have `expo-device`, `react-native-device-info` or `react-native-safe-area-context` installed. Otherwise will default to legacy mode

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

### hasDynamicIsland

**returns** - `true` if iPhone has the dynamic island.

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

### hasDisplayCutout

**returns** - `true` if iPhone has the dynamic island or a notch.

#### Example

```js
import { hasDisplayCutout } from 'rn-iphone-helper';

// ...

if (hasDisplayCutout()) {
  // do this...
} else {
  // do that...
}
```

### getTopInset

#### Parameters

**cutoutEnd** - (boolean) return notch height only or top inset to fit safe area.

**returns**

- Android: `StatusBar.currentHeight`
- iOS:
  See [devices.js](./devices.js)

#### Example

```js
// in style.js

import { StyleSheet } from 'react-native';
import { getTopInset } from 'rn-iphone-helper';

export default StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    height: 60,
    backgroundColor: 'transparent',
    paddingTop: getTopInset(),
  },
});
```

### getBottomInset

**returns** - the bottom inset to fit the safe area: `34` for iPhones with display cutout and `0` for other devices.

#### Example

```js
// in style.js

import { StyleSheet } from 'react-native';
import { getBottomInset } from 'rn-iphone-helper';

export default StyleSheet.create({
  totalview: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: getBottomInset(),
  },
});
```

### getCutoutProps

**returns** - display cutout frame and radius. Only works if `hasDynamicIsland() === true`.

**Please open issue if you think adding other device support is worth it**

```js
interface CutoutProps {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: number;
}
```

## Licence

**MIT**
