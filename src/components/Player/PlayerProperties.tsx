import { type Texture } from 'pixi.js';

export default interface PlayerProperties {
  position: { x: number; y: number };
  rotation: number;
  texture: Texture;
  speed: number;
  angle: number;
  projectilesRef: Array<{ id: number; x: number; y: number; vx: number; vy: number }>;
}
