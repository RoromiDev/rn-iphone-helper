export function getTopInset(notchHeightOnly: boolean): number;
export function getBottomInset(): number;
export function hasDynamicIsland(): boolean;
export function hasNotch(): boolean;
export function hashasDisplayCutout(): boolean;
interface CutoutProps {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: number;
}
export function getCutoutProps(): CutoutProps;
