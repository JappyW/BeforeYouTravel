import { InitialGlobeProps } from '../types';

export const ROTATION_DURATION = 1000;

const initialWidth = window.innerHeight - 220;

export const initialMapValues: InitialGlobeProps = {
  rotation: [0, 0],
  width: initialWidth,
  height: initialWidth,
  scale: initialWidth / 2,
  minScroll: 0.3,
  maxScroll: 20,
  dragSensitivity: 75,
};
